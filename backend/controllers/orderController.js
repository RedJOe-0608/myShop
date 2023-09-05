import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new order
//@route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async(req,res) => {
   const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

   if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error("No order items!")
    }else{
            const order = new Order({
                orderItems: orderItems?.map((item) => ({
                    ...item,
                    product: item._id,
                    _id: undefined,
                })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })
        const createdOrder = await order.save()
        console.log(createdOrder);
        res.status(201).json(createdOrder)    
    }

});


//@desc get logged in user orders
//@route GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async(req,res) => {
   const orders = await Order.find({user: req.user._id})
   res.status(200).json(orders)
});

//@desc get order by id
//@route GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async(req,res) => {
   const order = await Order.findById(req.params.id).populate('user', 'name email')

   if(order)
   {
    res.status(200).json(order)
   }else{
    res.status(404)
    throw new Error("Order not found!")
   }
});

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id)
  if(order)
  {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save()

    res.status(200).json(updatedOrder)
  } else{
    res.status(404)
    throw new Error("Order not found!")
  }
 });

 //@desc update order to delivered
//@route PUT /api/orders/:id/pay
//@access private/Admin
const updateOrderToDelivered = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)

    if(order)
    {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
    }else{
      res.status(404)
      throw new Error('Order not found')
    }
 });

  //@desc update order to delivered
//@route GET /api/orders
//@access private/Admin
const getAllOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({}).populate('user','id name')
    res.status(200).json(orders)
 });


export {addOrderItems,updateOrderToDelivered,updateOrderToPaid,getAllOrders,getMyOrders,getOrderById}

 
