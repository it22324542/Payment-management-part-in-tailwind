import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
    {
     bankName: {
        type: String,
        required: true,
     },
     branch: {
        type: String,
        required: true,
     },
     date: {
        type: String,
        required: true,
     },
     priceInNumber: {
        type: Number,
        required: true,
     },
     priceInWord: {
        type: String,
        required: true,
     },   
    },
    {
      timestamps: true,  
    }
);


export const Payment = mongoose.model('Cat',paymentSchema);