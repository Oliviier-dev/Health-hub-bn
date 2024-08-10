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
}
