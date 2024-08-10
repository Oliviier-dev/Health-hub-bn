import db from '../models/index.js';

export class UserService {
    static async getAllUsers() {
        try {
            const users = await db.User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error getting users: ' + error);
        }
    }
}
