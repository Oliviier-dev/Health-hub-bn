'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('appointments', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            patient_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'user_id',
                },
                allowNull: false,
                onDelete: 'CASCADE',
            },
            practice_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'practiceprofiles',
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE',
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'canceled', 'rescheduled'),
                defaultValue: 'pending',
                allowNull: false,
            },
            appointmentDateTime: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            reasonForVisit: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rescheduledDateTime: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            rescheduleReason: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cancellationReason: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('appointments');
    },
};
