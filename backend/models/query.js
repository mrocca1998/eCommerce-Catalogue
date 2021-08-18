/* jshint indent: 2 */

'use strict';
module.exports = (sequelize, DataTypes) => {
    var Query = sequelize.define('Query', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Query;
};