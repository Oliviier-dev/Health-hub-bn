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
}
