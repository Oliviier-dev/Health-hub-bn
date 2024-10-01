import express from 'express';
import { ChatController } from '../controllers/index.js';
import { isAuthenticated } from '../utils/index.js';

const chatRoute = express.Router();

chatRoute.post('/messages', isAuthenticated, ChatController.sendMessage);
chatRoute.get(
    '/conversations/:conversationId/messages',
    isAuthenticated,
    ChatController.getMessages,
);
chatRoute.get('/users/:userId/conversations', isAuthenticated, ChatController.getConversations);

export default chatRoute;
