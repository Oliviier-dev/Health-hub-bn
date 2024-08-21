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
        await queryInterface.addColumn('appointments', 'service', {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn('appointments', 'price', {
            type: Sequelize.FLOAT,
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
        await queryInterface.removeColumn('appointments', 'service');
        await queryInterface.removeColumn('appointments', 'price');
    },
};
