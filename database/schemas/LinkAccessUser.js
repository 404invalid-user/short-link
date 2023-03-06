const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const LinkAccessUser = sequelize.define('LinkAccessUser', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        link: {
            type: DataTypes.STRING,
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },      
        edit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        viewStats: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    //adds table to db if it doesnt exist
    LinkAccessUser.sync();
    return LinkAccessUser;
};