import { UserService } from '../services/index.js';

export class UserContoller {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error retrieving users:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async userRegister(req, res) {
        try {
            const userData = req.body;
            const { email, password, first_name, last_name } = userData;
            if (!email || !password || !first_name || !last_name) {
                return res.status(400).send('Please provide all details');
            }
            const newUser = await UserService.userRegister(userData);
            if (newUser) {
                return res.status(201).send({ message: 'User created', data: newUser });
            }
        } catch (error) {
            if (error.message === 'User already exists') {
                return res.status(400).send({ error: 'User already exists' });
            }
            console.error('Error registering the user:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async getUserProfile(req, res) {
        try {
            const userId = req.user.user_id;

            const userProfile = await UserService.getUserProfile(userId);

            if (!userProfile) {
                return res.status(404).send({ message: 'User Profile not found' });
            }

            return res
                .status(200)
                .send({ message: 'user profile retrieved successfully', data: userProfile });
        } catch (error) {
            console.error('Error retrieving users:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async updateUserProfile(req, res) {
        try {
            const userId = req.user.user_id;
            const updatedFields = req.body;
            const updateProfile = await UserService.updateUserProfile(userId, updatedFields);

            if (!updateProfile) {
                return res.status(404).send({ message: 'User Profile not found' });
            }

            return res
                .status(200)
                .send({ message: 'User profile updated successfully', data: updateProfile });
        } catch (error) {
            if (error.message === 'User profile not found') {
                return res.status(404).send({ error: 'User profile not found' });
            }
            console.error('Error updating user Profile:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}
