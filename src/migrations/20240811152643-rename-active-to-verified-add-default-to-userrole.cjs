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
        await queryInterface.renameColumn('users', 'active', 'verified');

        await queryInterface.changeColumn('users', 'verified', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });

        await queryInterface.changeColumn('users', 'role', {
            type: Sequelize.ENUM('ADMIN', 'DOCTOR', 'PATIENT'),
            defaultValue: 'PATIENT',
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.renameColumn('users', 'verified', 'active');
        await queryInterface.changeColumn('users', 'active', {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        });
        await queryInterface.changeColumn('users', 'role', {
            type: Sequelize.ENUM('ADMIN', 'DOCTOR', 'PATIENT'),
            allowNull: false,
        });
    },
};
