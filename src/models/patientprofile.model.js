import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class UserProfile extends Model {}

    UserProfile.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'User',
                    key: 'user_id',
                },
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date_of_birth: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            social_media_profiles: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            medical_history: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            allergies: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            tableName: 'patientprofiles',
            sequelize,
            timestamps: true,
        },
    );

    UserProfile.associate = (models) => {
        UserProfile.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE',
        });
    };

    return UserProfile;
};
