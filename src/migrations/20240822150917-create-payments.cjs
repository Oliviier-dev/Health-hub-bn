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
        await queryInterface.createTable('payments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            stripeId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            patient_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id',
                },
            },
            practice_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'practiceprofiles',
                    key: 'id',
                },
            },
            appointment_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'appointments',
                    key: 'id',
                },
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            payment_method: {
                type: Sequelize.ENUM('Stripe'),
                defaultValue: 'Stripe',
            },
            payment_status: {
                type: Sequelize.ENUM('Pending', 'Completed', 'Failed', 'Refunded', 'Canceled'),
                defaultValue: 'Pending',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
        await queryInterface.dropTable('payments');
    },
};
