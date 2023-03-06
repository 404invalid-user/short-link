const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const LinkAccessList = sequelize.define('LinkAccessList', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        link: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "admin"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "admin"
        },
    });
    //adds table to db if it doesnt exist
    LinkAccessList.sync();
    return LinkAccessList;
};