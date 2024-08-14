import { AuthService } from '../services/index.js';
import { generateToken, verifyToken, decodeToken } from '../utils/index.js';

export class AuthContoller {
    static async emailVerification(req, res) {
        try {
            const { token } = req.params;
            if (!token) {
                return res.status(400).send({ error: 'Token is required' });
            }

            const isVerified = await AuthService.emailVerification(token);

            if (isVerified) {
                return res.status(200).send({ message: 'Email Verified Successfully' });
            }

            return res.status(400).send({ error: 'Invalid or expired token' });
        } catch (error) {
            console.error('Error verifying the user:', error);

            if (error.message === 'Account is already verified') {
                return res.status(409).send({ error: 'Account is already verified' });
            }

            if (error.message === 'Token is invalid or expired') {
                return res.status(400).send({ error: 'Token is invalid or expired' });
            }

            return res.status(500).send('Internal Server Error');
        }
    }

    static async resendEmailVerification(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).send('Please provide valid email');
            }

            const result = await AuthService.resendEmailVerification(email);

            if (result.success) {
                return res.status(200).send({ message: 'Verification email sent successfully' });
            } else {
                return res.status(500).send({ error: 'Failed to send verification email' });
            }
        } catch (error) {
            if (error.message === 'Account is already verified') {
                return res.status(409).send({ error: 'Account is already verified' });
            }

            if (error.message === 'User not found') {
                return res.status(404).send({ error: 'User not found' });
            }
            console.error('Error in resending email verification:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async userLogin(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send('Please provide your credentials');
            }

            const userLogin = await AuthService.userLogin(email, password);

            const token = generateToken({ user: userLogin });

            let options = {
                maxAge: 120 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            };

            res.cookie('SessionID', token, options);

            return res.status(200).json({
                status: 'success',
                message: `${userLogin.last_name} successfully loggged in`,
            });
        } catch (error) {
            console.error('Error Logging in user:', error);
            if (
                error.message === 'User not found' ||
                error.message === 'Invalid Password, Please try again'
            ) {
                return res.status(401).send({ error: error.message });
            } else if (error.message === 'User is not verified') {
                return res.status(403).send({ error: error.message });
            } else {
                return res.status(500).send('Internal Server Error');
            }
        }
    }

    static async userLogout(req, res) {
        try {
            res.clearCookie('SessionID');
            return res.status(200).send('Logout Successfully');
        } catch (error) {
            console.error('Logout error ', error);
            res.status(500).json({ error: 'Logout failed' });
        }
    }

    static async resetPasswordToken(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).send('Please provide valid email');
            }

            const result = await AuthService.resetPasswordToken(email);
            if (result.success) {
                return res.status(200).send({ message: 'Reset password email sent successfully' });
            } else {
                return res.status(500).send({ error: 'Failed to send reset password email' });
            }
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).send({ error: 'User not found' });
            }
            console.error('Error in sending reset password token:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;

            if (!password) {
                return res.status(400).send('Please provide all details');
            }

            const result = await AuthService.resetPassword(token, password);

            if (result.success) {
                return res.status(200).send({ message: 'Password reset successfully' });
            } else {
                return res.status(500).send({ error: 'Failed to reset password' });
            }
        } catch (error) {
            if (error.message === 'Invalid or expired token') {
                return res.status(400).send({ error: 'Invalid or expired token' });
            }
            console.error('Error in reseting the password:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}
