const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Link = sequelize.define('Link', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        domain: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "/"
        },
        requireLogedinUser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }, 
        requireAuthentication: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }, 
    });
    //adds table to db if it doesnt exist
    Link.sync();
    return Link;
};