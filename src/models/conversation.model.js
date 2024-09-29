import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Conversation extends Model {
        static associate(models) {
            Conversation.hasMany(models.Message, {
                foreignKey: 'conversationId',
                onDelete: 'CASCADE',
            });
            Conversation.belongsTo(models.User, {
                foreignKey: 'user1Id',
                as: 'User1',
            });
            Conversation.belongsTo(models.User, {
                foreignKey: 'user2Id',
                as: 'User2',
            });
        }
    }

    Conversation.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            user1Id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            user2Id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            tableName: 'conversations',
            sequelize,
            timestamps: true,
        },
    );

    return Conversation;
};
