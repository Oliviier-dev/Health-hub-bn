import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Payment extends Model {}

    Payment.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            stripeId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            patient_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            practice_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            appointment_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            payment_method: {
                type: DataTypes.ENUM,
                values: ['Stripe'],
                defaultValue: 'Stripe',
            },
            payment_status: {
                type: DataTypes.ENUM,
                values: ['Pending', 'Completed', 'Failed', 'Refunded', 'Canceled'],
                defaultValue: 'Pending',
            },
        },
        {
            tableName: 'payments',
            sequelize,
            timestamps: true,
        },
    );

    Payment.associate = (models) => {
        Payment.belongsTo(models.User, { foreignKey: 'patient_id' });
        Payment.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
        Payment.belongsTo(models.PracticeProfile, { foreignKey: 'practice_id' });
    };

    return Payment;
};
