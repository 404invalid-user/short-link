const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const LinkClick = sequelize.define('LinkClick', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        link: {
            type: DataTypes.STRING,
        },
        newView: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        loggedIn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Date.now().toString()
        },
        ipv4: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0.0.0.0'
        },
        ipv6: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0.0.0.0'
        },
        os: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unknown'
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unknown'
        },
        browser: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unknown'
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'en'
        },
        browserVersion: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unknown'
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unknown'
        },
        useragent: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unknown'
        },
        refSite: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'none'
        },
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'none'
        },
    });
    //adds table to db if it doesnt exist
    LinkClick.sync();
    return LinkClick;
};