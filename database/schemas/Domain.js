const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Domain = sequelize.define('Domain', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        owner: {
            type: DataTypes.INTEGER,
        },
        discordServer: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'NONE'
        },
        discordServerPermission: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'NONE'
        },
        githubOrg: {
            type:DataTypes.STRING,
            allowNull: false,
            defaultValue: 'NONE'
        }
    });
    //adds table to db if it doesnt exist
    Domain.sync();
    return Domain;
};