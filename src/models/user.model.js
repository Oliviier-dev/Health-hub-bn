import { DataTypes, Model, UUIDV4 } from "sequelize";
import { development } from "../config/config";

const sequelize = development;

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
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
      type: DataTypes.ENUM("ADMIN", "DOCTOR", "PATIENT"),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
  },
);

export default User;