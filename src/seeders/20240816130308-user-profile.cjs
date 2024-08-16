'use strict';
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
        await queryInterface.bulkInsert(
            'patientprofiles',
            [
                {
                    id: uuidv4(),
                    user_id: process.env.userId,
                    first_name: 'Patient',
                    last_name: 'Zero',
                    phone_number: '123-456-7890',
                    gender: 'Male',
                    date_of_birth: new Date('1990-01-01'),
                    address: '123 Example St, Example City, EX 12345',
                    social_media_profiles: JSON.stringify({
                        twitter: '@exampleuser',
                        facebook: 'facebook.com/exampleuser',
                    }),
                    medical_history: JSON.stringify(['Asthma', 'High blood pressure']),
                    allergies: JSON.stringify(['Peanuts', 'Shellfish']),
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
        await queryInterface.bulkDelete('patientprofiles', null, {});
    },
};
