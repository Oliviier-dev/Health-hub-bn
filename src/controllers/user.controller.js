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
}
