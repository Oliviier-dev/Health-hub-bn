import { where } from 'sequelize';
import db from '../models/index.js';
import bcrypt from 'bcrypt';
import { sendMail, verificationEmailTemplate } from '../utils/index.js';
import crypto from 'crypto-js';

export class UserService {
    static async getAllUsers() {
        try {
            const users = await db.User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error getting users: ' + error);
        }
    }

    static async userRegister(userdata) {
        try {
            const { email, password, first_name, last_name, role = 'PATIENT' } = userdata;
            const userExists = await db.User.findOne({ where: { email: email } });

            if (userExists) {
                throw new Error('User already exists');
            }

            const saltRounds = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const email_verification_token = crypto.lib.WordArray.random(32).toString(
                crypto.enc.Hex,
            );
            const email_verification_token_expiration = new Date(
                Date.now() + 24 * 60 * 60 * 1000,
            ).toISOString();

            const user = await db.User.create({
                email,
                password: hashedPassword,
                first_name,
                last_name,
                role,
                email_verification_token,
                email_verification_token_expiration,
            });

            if (user) {
                await db.UserProfile.create({
                    user_id: user.user_id,
                    first_name,
                    last_name,
                    role: user.role,
                });
            }

            const verification_link =
                process.env.IS_LOCAL === 'true'
                    ? `${process.env.LOCAL_URL}/api/v1/auth/verify/${email_verification_token}`
                    : `${process.env.DEPLOYED_URL}/api/v1/auth/verify/${email_verification_token}`;

            sendMail(email, 'Email Verification', verificationEmailTemplate(verification_link));

            const newUser = user.toJSON();
            delete newUser.password;
            delete newUser.email_verification_token;

            return newUser;
        } catch (error) {
            throw error;
        }
    }

    static async getUserProfile(userId) {
        try {
            let userProfile = await db.UserProfile.findOne({ where: { user_id: userId } });
            if (!userProfile) {
                const user = await db.User.findOne({ where: { user_id: userId } });
                if (user) {
                    userProfile = await db.UserProfile.create({
                        user_id: user.dataValues.user_id,
                        first_name: user.dataValues.first_name,
                        last_name: user.dataValues.last_name,
                        role: user.dataValues.role,
                    });
                } else {
                    return null;
                }
            }

            return userProfile;
        } catch (error) {
            throw new Error('Error Fetching user profile' + error);
        }
    }

    static async updateUserProfile(user_id, updatedFields) {
        const transaction = await db.sequelize.transaction();
        try {
            let userProfile = await db.UserProfile.findOne({ where: { user_id }, transaction });
            let user = await db.User.findOne({ where: { user_id }, transaction });
            if (!userProfile) {
                if (user) {
                    userProfile = await db.UserProfile.create(
                        {
                            user_id: user.dataValues.user_id,
                            first_name: user.dataValues.first_name,
                            last_name: user.dataValues.last_name,
                            role: user.dataValues.role,
                        },
                        { transaction },
                    );
                } else {
                    throw new Error('User profile not found');
                }
            }

            if (userProfile && user) {
                await userProfile.update(updatedFields, { transaction });
                await user.update(updatedFields, { transaction });
            }

            await transaction.commit();
            return userProfile;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
