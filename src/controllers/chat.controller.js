import { ChatService } from '../services/index.js';

export class ChatController {
    // Send a message
    static async sendMessage(req, res) {
        const { conversationId, senderId, content } = req.body;
        try {
            const message = await ChatService.sendMessage(conversationId, senderId, content);
            return res.status(201).json(message);
        } catch (error) {
            console.error('Error in reseting the password:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    // Get messages for a conversation
    static async getMessages(req, res) {
        const { conversationId } = req.params;
        try {
            const messages = await ChatService.getMessages(conversationId);
            return res.status(200).json(messages);
        } catch (error) {
            console.error('Error in reseting the password:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    // Get all conversations for a user
    static async getConversations(req, res) {
        const { userId } = req.params;
        try {
            const conversations = await ChatService.getConversations(userId);
            return res.status(200).json(conversations);
        } catch (error) {
            console.error('Error in reseting the password:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}
