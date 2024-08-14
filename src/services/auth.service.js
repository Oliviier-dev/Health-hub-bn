import { where } from 'sequelize';
import { Op } from 'sequelize';
import db from '../models/index.js';
import { sendMail, resendVerificationEmailTemplate } from '../utils/index.js';
import crypto from 'crypto-js';
import bcrypt from 'bcrypt';

export class AuthService {
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
                ? `${process.env.LOCAL_URL}/api/v1/auth/verify/${email_verification_token}`
                : `${process.env.DEPLOYED_URL}/api/v1/auth/verify/${email_verification_token}`;
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

    static async userLogin(email, password) {
        try {
            const user = await db.User.findOne({ where: { email } });

            if (!user) {
                throw new Error('User not found');
            }

            if (!user.verified) {
                throw new Error('User is not verified');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid Password, Please try again');
            }

            const userLogin = user.toJSON();
            delete userLogin.password;

            return userLogin;
        } catch (error) {
            throw error;
        }
    }
}
