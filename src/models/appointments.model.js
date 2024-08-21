import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Appointment extends Model {
        static associate(models) {
            Appointment.belongsTo(models.User, {
                foreignKey: 'patient_id',
                as: 'patient',
            });
            Appointment.belongsTo(models.PracticeProfile, {
                foreignKey: 'practice_id',
                as: 'practice',
            });
        }
    }

    Appointment.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            patient_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'User',
                    key: 'user_id',
                },
                allowNull: false,
            },
            practice_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'PracticeProfile',
                    key: 'id',
                },
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('pending', 'confirmed', 'canceled', 'rescheduled'),
                defaultValue: 'pending',
                allowNull: false,
            },
            appointmentDateTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            reasonForVisit: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            service: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            rescheduledDateTime: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            rescheduleReason: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cancellationReason: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'appointments',
            sequelize,
            timestamps: true,
        },
    );

    return Appointment;
};
