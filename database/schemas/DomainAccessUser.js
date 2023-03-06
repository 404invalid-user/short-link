const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const DomainAccessUser = sequelize.define('DomainAccessUser', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        domain: {
            type: DataTypes.STRING,
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },      
        createLinks: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        viewAllLinks: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    });
    //adds table to db if it doesnt exist
    DomainAccessUser.sync();
    return DomainAccessUser;
};