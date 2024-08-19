import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class PracticeProfile extends Model {}

    PracticeProfile.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            doctor_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'User',
                    key: 'user_id',
                },
                allowNull: false,
            },
            practice_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            services: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            pricing: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            social_media_profiles: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            tableName: 'practiceprofiles',
            sequelize,
            timestamps: true,
        },
    );

    PracticeProfile.associate = (models) => {
        PracticeProfile.belongsTo(models.User, {
            foreignKey: 'doctor_id',
            as: 'doctor',
            onDelete: 'CASCADE',
        });
        PracticeProfile.hasMany(models.Appointment, {
            foreignKey: 'practice_id',
            as: 'appointments',
        });
        models.Appointment.belongsTo(PracticeProfile, {
            foreignKey: 'practice_id',
            as: 'practice',
        });
    };

    return PracticeProfile;
};
