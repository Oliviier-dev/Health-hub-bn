import { where } from 'sequelize';
import db from '../models/index.js';
import bcrypt from 'bcrypt';

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

            const user = await db.User.create({
                email,
                password: hashedPassword,
                first_name,
                last_name,
            });

            const newUser = user.toJSON();
            delete newUser.password;
            return newUser;
        } catch (error) {
            console.error('Error in user registration:', error.message);
            throw error;
        }
    }
}
