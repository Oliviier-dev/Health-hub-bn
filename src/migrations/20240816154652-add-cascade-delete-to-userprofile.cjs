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
        await queryInterface.removeConstraint('patientprofiles', 'patientprofiles_user_id_fkey');
        await queryInterface.addConstraint('patientprofiles', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'UserProfile_user_id_fkey',
            references: {
                table: 'users',
                field: 'user_id',
            },
            onDelete: 'CASCADE',
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeConstraint('patientprofiles', 'patientprofiles_user_id_fkey');
        await queryInterface.addConstraint('patientprofiles', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'UserProfile_user_id_fkey',
            references: {
                table: 'users',
                field: 'user_id',
            },
            onDelete: 'RESTRICT',
        });
    },
};
