const Models = require("../model/models");

const defineRelations = () =>{

    //1-M for Category to Product
    Models.Product.belongsTo(Models.Category, {constraints: true});
    Models.Category.hasMany(Models.Product);

    //1-1 for User and Address
    Models.Address.belongsTo(Models.User, {constraints: true});
    Models.User.hasMany(Models.Address);

    //1-1 for User and AccessToken
    Models.User.hasOne(Models.AccessToekn);

    //1-M for User and Order
    Models.Order.belongsTo(Models.User, {constraints:true});
    Models.User.hasMany(Models.Order);

    //M-M for Order and Product
    Models.Order.belongsToMany(Models.Product, {through: Models.OrderItem});
    Models.Product.belongsToMany(Models.Order, {through: Models.OrderItem});

    Models.Order.hasMany(Models.OrderItem);
    Models.OrderItem.belongsTo(Models.Order);

    Models.Product.hasMany(Models.OrderItem);
    Models.OrderItem.belongsTo(Models.Product);
    
    //1-1 for Order and Address
    Models.Order.belongsTo(Models.Address);

    //1-m fro User and OTP
    Models.User.hasMany(Models.OTP);

    //M-M for Order and Product
    Models.Wishlist.belongsTo(Models.User);
    Models.Wishlist.belongsToMany(Models.Product, {through: Models.WishListItem})
    Models.Product.belongsToMany(Models.Wishlist, {through: Models.WishListItem})
}

module.exports = defineRelations;