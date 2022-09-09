
const sequelize = require("../database/db");
const Models = require("../model/models");

const getOrders = async (orders) => {
    const foundOrders = await Models.Order.findAll({ where: orders,include: [{ model: Models.Product,},] });
    return foundOrders;
}

const getOrder = async (order) => {
    const foundOrder = await Models.Order.findOne({ where: order, 
        include: [{ model: Models.Product,},] })
        return foundOrder;
}

const createOrder = async (newOrder) => {
    return await Models.Order.create(newOrder)
        .then(order => {
            console.log("Order Created");
            return order;
        }).catch(error => {
            console.log(error);
            throw error;
        });
}

const addOrderItem = async (orderItem) => {
    return await Models.OrderItem.create(orderItem)
        .then(orderItem => {
            console.log("Order Item Added");
            return orderItem;
        }).catch(error => {
            console.log(error);
            throw error;
        });
}

module.exports = {
    getOrders,
    createOrder,
    addOrderItem,
    getOrder
}