module.exports = function (sequelize, DataTypes) {
    const Burger = sequelize.define("Burger", {
        burger_name: {
            DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Burger;

};