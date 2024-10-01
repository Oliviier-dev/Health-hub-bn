import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import setUpSwagger from './docs/swagger.js';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

setUpSwagger(app, parseInt(`${port}`, 10));

app.use(express.static('public'));

app.use(router);

app.get('/', (req, res) => {
    res.send('Welcome to Health Hub');
});

io.on('connection', (socket) => {
    // Join a room based on the conversation ID
    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
    });

    // Handle typing events
    socket.on('typing', (data) => {
        socket.to(data.conversationId).emit('typing', data);
    });

    socket.on('stopTyping', (data) => {
        socket.to(data.conversationId).emit('stopTyping', data);
    });

    // Handle sending messages
    socket.on('sendMessage', (messageData) => {
        const { conversationId } = messageData;
        io.to(conversationId).emit('messageReceived', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync();
        console.log('Database tables synchronized successfully.');

        // Start the server with Socket.IO
        server.listen(port, () => {
            console.log(`[server]: Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
