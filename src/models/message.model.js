import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.Conversation, {
                foreignKey: 'conversationId',
                onDelete: 'CASCADE',
            });
            Message.belongsTo(models.User, {
                foreignKey: 'senderId',
                onDelete: 'CASCADE',
            });
        }
    }

    Message.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            conversationId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Conversation',
                    key: 'id',
                },
            },
            senderId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'user_id',
                },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'messages',
            sequelize,
            timestamps: true,
        },
    );

    return Message;
};
