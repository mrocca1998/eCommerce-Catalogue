/* jshint indent: 2 */

'use strict';
module.exports = (sequelize, DataTypes) => {
    var Albanian = sequelize.define('Albanian', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Albanian;
};