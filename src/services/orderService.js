const Order = require('../database/orders');

const getOrders = async (order) => {
    return await Order.getOrders(order);
}
const createOrder = async (newOrder) => {
    try {
        const orderToInsert = newOrder;

        const createdOrder = await Order.createOrder(orderToInsert);
        return createdOrder;
    } catch (e) {
        throw e
    }
};

const getOrder = async (order) => {
    return await Order.getOrder(order);
}

const addOrderItem = async (orderItem) => {
    try {
        const addedOrderItem = await Order.addOrderItem(orderItem);
        return addOrderItem;
    } catch (e) {
        throw e
    }
};

module.exports = {
    createOrder,
    getOrders,
    addOrderItem,
    getOrder
}