import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class User extends Model {}

    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('ADMIN', 'DOCTOR', 'PATIENT'),
                defaultValue: 'PATIENT',
                allowNull: false,
            },
            image_url: {
                type: DataTypes.STRING(2048),
                allowNull: true,
            },
            email_verification_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email_verification_token_expiration: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            reset_password_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            reset_password_token_expiration: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: 'users',
            sequelize,
            timestamps: true,
        },
    );

    User.associate = (models) => {
        User.hasOne(models.UserProfile, {
            foreignKey: 'user_id',
            as: 'profile',
            onDelete: 'CASCADE',
        });
        User.hasOne(models.PracticeProfile, {
            foreignKey: 'doctor_id',
            as: 'practiceprofile',
            onDelete: 'CASCADE',
        });
        User.hasMany(models.Appointment, {
            foreignKey: 'patient_id',
            as: 'appointments',
            onDelete: 'CASCADE',
        });
        models.Appointment.belongsTo(User, {
            foreignKey: 'patient_id',
            as: 'patient',
        });
    };

    return User;
};
