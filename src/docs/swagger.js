import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Health Hub API',
            version: '1.0.0',
            description: 'This is a REST API for the Health Hub application.',
        },
        servers: [
            {
                url: process.env.LOCAL_URL,
                description: 'Development Server',
            },
            {
                url: process.env.DEPLOYED_URL,
                description: 'Staging Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                    description: 'Bearer token authorization',
                },
            },
        },
    },
    apis: [path.join(__dirname, 'annotations/**/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

const setUpSwagger = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

export default setUpSwagger;
