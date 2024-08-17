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
            'practiceprofiles',
            [
                {
                    id: uuidv4(),
                    doctor_id: process.env.doctorId,
                    practice_name: 'Health and Wellness Clinic',
                    phone_number: '123-456-7890',
                    website: 'https://healthandwellness.com',
                    bio: 'Demesne mention promise you justice arrived way. Or increasing to in especially inquietude companions acceptance admiration. Outweigh it families distance wandered ye an. Mr unsatiable at literature connection favourable. We neglected mr perfectly continual dependent.',
                    address: '123 Wellness St, Health City, HC 12345',
                    services: JSON.stringify({
                        Consultation: 'General',
                        Diagnostics: 'Available',
                    }),
                    pricing: JSON.stringify({
                        Consultation: '$100',
                        Diagnostics: '$50',
                    }),
                    social_media_profiles: JSON.stringify({
                        Facebook: 'https://facebook.com/healthandwellness',
                        Twitter: 'https://twitter.com/healthandwellness',
                    }),
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
        await queryInterface.bulkDelete('practiceprofiles', null, {});
    },
};
