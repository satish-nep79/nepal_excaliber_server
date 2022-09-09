const Models = require("../model/models");
const Sequelize = require('sequelize');
const orderService = require('../services/orderService');

const createOrder = async (req, res) => {

    try{
        const { body } = req;
        const user = req.user;

        if(!body.totalCost){
            return res.send({status: false, message:"Total Cost is required"});
        } else if(!body.paymentStatus){
            return res.send({status: false, message:"Payment Staus is required"});
        } else if(!body.products){
            return res.send({status: false, message:"Products Cost is required"});
        } else if(!body.addressId){
            return res.send({status: false, message:"Address Id is required"});
        }

        const order = {
            totalCost: body.totalCost,
            orderDate: new Date(),
            paymentStatus: body.paymentStatus,
            addressId: body.addressId,
            userId: user.id,
            deliveryStatus: "Pending"
        }

        if(body.paymentToken){
            order['paymentToken'] = body.paymentToken
        }

        const placedOrder = await orderService.createOrder(order)

        const products = body.products;

        const addedProducts = [];

        await products.forEach(element => {
            element["orderId"] = placedOrder.id
            console.log("adding")
            orderService.addOrderItem(element); 
        });

        res.send({status: true, data: {
            message: "Order Placed",
            order: placedOrder
        }});

    }catch(e){
        console.log(e);
        res.send({status: false, message:"Unexpected Error"})
    }



}

const getOrders = async (req, res) => {
    console.log("Get orders")
    const user = req.user;
    console.log(user.id);
    try{
        
        const fetchOrder = await orderService.getOrders({userId: user.id})
        res.send({status: true, data:fetchOrder})
    }catch(error){
        res.send({status: false, message:"Unexpected Error"})
    }
}

const getOrder = async (req, res) => {
    try{
        const id = req.query.id
        const fetchOrder = await orderService.getOrder({id: id})
        res.send({status: true, data:fetchOrder})
    }catch(error){
        res.send({status: false, message:"Unexpected Error"})
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrder
}