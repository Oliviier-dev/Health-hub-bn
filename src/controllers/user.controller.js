import { UserService } from '../services/index.js';

export class UserContoller {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async userRegister(req, res) {
        try {
            const userData = req.body;
            const { email, password, first_name, last_name } = userData;
            if (!email || !password || !first_name || !last_name) {
                res.status(400).send('Please provide all details');
            }
            const newUser = await UserService.userRegister(userData);
            if (newUser) {
                res.status(201).send({ message: 'User created', data: newUser });
            }
        } catch (error) {
            if (error.message === 'User already exists') {
                return res.status(400).send({ error: 'User already exists' });
            }
            console.error('Error registering the user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async emailVerification(req, res) {
        try {
            const { token } = req.params;
            if (!token) {
                return res.status(400).send({ error: 'Token is required' });
            }

            const isVerified = await UserService.emailVerification(token);

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

            res.status(500).send('Internal Server Error');
        }
    }

    static async resendEmailVerification(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                res.status(400).send('Please provide valid email');
            }

            const result = await UserService.resendEmailVerification(email);

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
            console.error('Error in resending email verification:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
}
