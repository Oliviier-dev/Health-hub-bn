import { PracticeService } from '../services/index.js';

export class PracticeContoller {
    static async getAllPractices(req, res) {
        try {
            const practices = await PracticeService.getAllPractices();
            return res.status(200).json(practices);
        } catch (error) {
            console.error('Error retrieving practices:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async getPracticeById(req, res) {
        try {
            const practiceId = req.params.practiceId;
            const { practice, doctor } = await PracticeService.getPracticeById(practiceId);
            return res.status(200).json({ status: 'success', practice: practice, doctor: doctor });
        } catch (error) {
            console.error('Error retrieving practice:', error);

            if (error.message === 'Practice Not Found') {
                return res.status(404).send('Practice Not Found');
            }

            return res.status(500).send('Internal Server Error');
        }
    }

    static async createPractice(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'DOCTOR') {
                return res.status(403).send('Only doctors can create their practice');
            }

            const practiceData = req.body;
            const newPractice = await PracticeService.createPractice(practiceData, userId);

            return res.status(201).json({
                message: 'Practice Created',
                data: newPractice,
            });
        } catch (error) {
            if (error.message === 'You already have a practice') {
                return res.status(400).send({ error: 'You already have a practice' });
            }
            console.error('Error creating a practice:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async updatePractice(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'DOCTOR') {
                return res.status(403).send('Only doctors can update their practice');
            }

            const updatedFields = req.body;
            const updatedPractice = await PracticeService.updatePractice(userId, updatedFields);

            if (!updatedPractice) {
                return res.status(404).send({ message: 'Practice not found' });
            }

            return res
                .status(200)
                .send({ message: 'Practice data updated successfully', data: updatedPractice });
        } catch (error) {
            if (error.message === 'Practice not found') {
                return res.status(404).send({ error: 'Practice not found' });
            }
            console.error('Error updating the practice:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}
