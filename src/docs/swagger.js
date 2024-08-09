import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Health Hub API',
        version: '1.0.0',
        description: 'This is a REST API application for health hub.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
        {
            url: process.env.DEPLOYED_URL,
            description: 'Production server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/docs/annotations/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
