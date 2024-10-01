import db from '../models/index.js';
import { Op } from 'sequelize';

export class ChatService {
    // Send a message
    static async sendMessage(conversationId, senderId, content) {
        try {
            const message = await db.Message.create({ conversationId, senderId, content });
            return message;
        } catch (error) {
            throw new Error('Failed to send message.');
        }
    }

    // Get messages for a conversation
    static async getMessages(conversationId) {
        try {
            const messages = await db.Message.findAll({
                where: { conversationId },
                order: [['createdAt', 'ASC']],
            });
            return messages;
        } catch (error) {
            throw new Error('Failed to retrieve messages.');
        }
    }

    // Get all conversations for a user
    static async getConversations(userId) {
        try {
            const conversations = await db.Conversation.findAll({
                where: {
                    [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
                },
            });
            return conversations;
        } catch (error) {
            throw new Error('Failed to retrieve conversations.');
        }
    }
}
