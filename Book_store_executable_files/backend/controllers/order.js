const {Order,ProductCart}=require("../models/order")


exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order found in db"
            })
        }
        req.order=order;
        next();
    })
}

exports.createOrder=(req,res)=>{
req.body.order.user=req.profile;
const order=new Order(req.body.order)
order.save((err,order)=>{
    if(err){
        return res.status(400).json({
            error:"fails to save your order"
        })
    }
    res.json(order)
})
}

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No orders found in db"
            })
        }
        res.json(order)
    })
}

exports.getUserOrders=(req,res)=>{
    Order.find({user:req.body.userId})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No orders found in db"
            })
        }
        res.json(order)
    })
}

exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus=(req,res)=>{
    Order.findByIdAndUpdate(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Cannot update"
                })
            }
            res.json(order)
        }
    )
}