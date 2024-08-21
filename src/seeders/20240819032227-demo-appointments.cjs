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
            'appointments',
            [
                {
                    id: uuidv4(),
                    patient_id: process.env.userId,
                    practice_id: process.env.practiceId,
                    status: 'pending',
                    appointmentDateTime: new Date(),
                    reasonForVisit: 'Routine check-up',
                    rescheduledDateTime: null,
                    rescheduleReason: null,
                    cancellationReason: null,
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
    },
};
