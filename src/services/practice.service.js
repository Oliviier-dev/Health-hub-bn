import { where } from 'sequelize';
import db from '../models/index.js';

export class PracticeService {
    static async getAllPractices() {
        try {
            const practices = await db.PracticeProfile.findAll();
            return practices;
        } catch (error) {
            throw new Error('Error getting practices: ' + error);
        }
    }

    static async getPracticeById(practiceId) {
        try {
            const practice = await db.PracticeProfile.findOne({
                where: { id: practiceId },
            });

            if (!practice) {
                throw new Error('Practice Not Found');
            }

            const doctor = await db.User.findOne({
                where: { user_id: practice.doctor_id },
            });

            return { practice, doctor };
        } catch (error) {
            throw error;
        }
    }

    static async createPractice(practiceData, doctor_id) {
        try {
            const practiceExists = await db.PracticeProfile.findOne({ where: { doctor_id } });
            if (practiceExists) {
                throw new Error('You already have a practice');
            }
            const practice = await db.PracticeProfile.create({
                ...practiceData,
                doctor_id: doctor_id,
            });

            return practice;
        } catch (error) {
            throw error;
        }
    }

    static async updatePractice(doctor_id, updatedFields) {
        try {
            const practiceExists = await db.PracticeProfile.findOne({ where: { doctor_id } });
            if (!practiceExists) {
                throw new Error('Practice not found');
            }

            const updatePractice = await practiceExists.update(updatedFields);
            return updatePractice;
        } catch (error) {
            throw error;
        }
    }
}
