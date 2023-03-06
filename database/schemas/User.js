const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NONE"
        },
        canCreateDomains: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: process.env.NEWSIGNUP_ALLOW_ADD_DOMAIN == 'true'?true:false
        },
        domainLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: parseInt(process.env.DEFAULT_DOMAIN_LIMIT)
        },
        superUser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },



        DiscordLinkId:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NONE"
        },
        DiscordLinkUsername:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NONE"
        },
        DiscordLinkAvatar:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NONE"
        },
        GithubLinkId:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NONE"
        },
        GithubLinkUsername:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NONE"
        },
        GithubLinkAvatar:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NONE"
        },
    });
    //adds table to db if it doesnt exist
    User.sync();
    return User;
};