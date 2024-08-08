'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);

        await queryInterface.bulkInsert(
            'users',
            [
                {
                    user_id: uuidv4(),
                    email: 'admin@example.com',
                    password: hashedPassword,
                    active: true,
                    first_name: 'Admin',
                    last_name: 'User',
                    role: 'ADMIN',
                    image_url: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    user_id: uuidv4(),
                    email: 'doctor@example.com',
                    password: hashedPassword,
                    active: true,
                    first_name: 'Doctor',
                    last_name: 'Who',
                    role: 'DOCTOR',
                    image_url: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    user_id: uuidv4(),
                    email: 'patient@example.com',
                    password: hashedPassword,
                    active: true,
                    first_name: 'Patient',
                    last_name: 'Zero',
                    role: 'PATIENT',
                    image_url: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {});
    },
};
