import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    name: {type: String,required: true},
    qty: {type: Number,required: true},
    image: {type: String,required: true},
    price: {type: Number ,required: true},
    //a reference to a specific  product in the products collection
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"     
    }
})

const shippingAddressSchema = new mongoose.Schema({
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true}
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [orderItemSchema], // the user could order multiple items, so we need to make it an array instead
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true,
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false,
        required: true,
    },
    deliveredAt: Date,


}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

export default Order;