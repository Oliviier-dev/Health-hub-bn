import { where } from 'sequelize';
import { Op } from 'sequelize';
import db from '../models/index.js';
import bcrypt from 'bcrypt';
import {
    sendMail,
    verificationEmailTemplate,
    resendVerificationEmailTemplate,
} from '../utils/index.js';
import crypto from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

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
            const { email, password, first_name, last_name } = userdata;
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
                email_verification_token,
                email_verification_token_expiration,
            });

            const verification_link = process.env.IS_LOCAL
                ? `${process.env.LOCAL_URL}/api/v1/user/verify/${email_verification_token}`
                : `${process.env.DEPLOYED_URL}/api/v1/user/verify/${email_verification_token}`;

            sendMail(
                email,
                'Resend Email Verification',
                verificationEmailTemplate(verification_link),
            );

            const newUser = user.toJSON();
            delete newUser.password;
            delete newUser.email_verification_token;

            return newUser;
        } catch (error) {
            throw error;
        }
    }

    static async emailVerification(token) {
        try {
            const user = await db.User.findOne({
                where: {
                    email_verification_token: token,
                    email_verification_token_expiration: {
                        [Op.gt]: Date.now(),
                    },
                },
            });

            if (!user) {
                throw new Error('Token is invalid or expired');
            }

            if (user.verified === true) {
                throw new Error('Account is already verified');
            }

            user.verified = true;
            await user.save();

            return true;
        } catch (error) {
            throw error;
        }
    }

    static async resendEmailVerification(email) {
        try {
            const user = await db.User.findOne({ where: { email } });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.verified) {
                throw new Error('Account is already verified');
            }

            const email_verification_token = crypto.lib.WordArray.random(32).toString(
                crypto.enc.Hex,
            );
            const email_verification_token_expiration = new Date(
                Date.now() + 24 * 60 * 60 * 1000,
            ).toISOString();

            const verification_link = process.env.IS_LOCAL
                ? `${process.env.LOCAL_URL}/api/v1/user/verify/${email_verification_token}`
                : `${process.env.DEPLOYED_URL}/api/v1/user/verify/${email_verification_token}`;
            sendMail(
                email,
                'Resend Email Verification',
                resendVerificationEmailTemplate(verification_link),
            );

            user.email_verification_token = email_verification_token;
            user.email_verification_token_expiration = email_verification_token_expiration;

            await user.save();

            return { success: true };
        } catch (error) {
            throw error;
        }
    }
}
