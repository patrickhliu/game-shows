import sequelize from '../config/db.ts';
import { Sequelize, DataTypes, Model } from 'sequelize';

class Jeopardy extends Model {}

Jeopardy.init(
  {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    round:  {
        type: DataTypes.STRING,
        allowNull: true,
    },
    show_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_daily_double: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    is_music: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    is_video: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    value_copy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    value_dd: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    question: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    air_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    air_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    air_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    air_day: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Jeopardy', // We need to choose the model name
    tableName: 'jeopardy_questions',
    timestamps: false,
  },
);

// the defined model is the class itself
//console.log(Jeopardy === sequelize.models.Jeopardy); // true

export default Jeopardy;