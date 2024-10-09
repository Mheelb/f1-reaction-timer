import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                        role: {
                            type: 'string',
                        },
                    },
                },
                Timer: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                        },
                        user_id: {
                            type: 'string',
                        },
                        time: {
                            type: 'number',
                        },
                        submittedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Auth',
                description: 'API d\'authentification',
            },
            {
                name: 'Users',
                description: 'API de gestion des utilisateurs',
            },
            {
                name: 'Timer',
                description: 'API de gestion des timers',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};