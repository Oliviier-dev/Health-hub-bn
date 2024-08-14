import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import setUpSwagger from './docs/swagger.js';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

setUpSwagger(app, parseInt(`${port}`, 10));

app.use(router);

app.get('/', (req, res) => {
    res.send('Welcome to Health Hub');
});

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync();
        console.log('Database tables synchronized successfully.');

        app.listen(port, () => {
            console.log(`[server]: Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
