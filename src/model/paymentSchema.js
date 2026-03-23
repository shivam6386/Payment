const mongoose=require("mongoose")

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    paymentId: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'success', 'failed'],
        default: 'created'
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);