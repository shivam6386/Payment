const rozarpay= require("../config/razorpay.js");
const paymentModel=require("../model/paymentSchema.js")
const createPayment=async(req,res)=>{
    try{
         const { amount } = req.body;
        const options={
            amount:amount*100,
            currency:"INR",
            receipt:process.env.RECEIPT
}
const order=await rozarpay.orders.create(options);
if(!order){
    return res.status(400).json({
        message:"Order failed"
    })
}
console.log("orders",order);
const orderDb=await paymentModel.create({
orderId:order.id,
amount:order.amount,
status: "created"
})
return res.status(200).json({
    success:true,
    message:"Orders created",
    order
})
}
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internall server fail",
            error:error.message

})
}
}


const capturePayment=async(req,res)=>{
     console.log("CAPTURE DATA");
    try{
    const data=req.body;
    console.log("CAPTURE Dpayment",data);

    return res.status(200).json({
        success:true,
        message:"Payment Capture Successfully"
    })
    }
    
catch(error){
    return res.status(500).json({
        success:false,
        message:"Capture failed",
        error:error.message
    })
}
}
module.exports={createPayment,
capturePayment
}