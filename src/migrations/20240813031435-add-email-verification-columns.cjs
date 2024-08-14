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
        await queryInterface.addColumn('users', 'email_verification_token', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.addColumn('users', 'email_verification_token_expiration', {
            type: Sequelize.DATE,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('users', 'email_verification_token');
        await queryInterface.removeColumn('users', 'email_verification_token_expiration');
    },
};
