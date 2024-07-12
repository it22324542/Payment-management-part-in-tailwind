import express from 'express';
import { Payment } from '../models/paymentModal.js';

const router = express.Router();

// Route for Save a new payment
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.bankName ||
            !request.body.branch ||
            !request.body.date ||
            !request.body.priceInNumber ||
            !request.body.priceInWord
        ) {
            return response.status(400).send({
                message: 'Send all required fields: bankName, branch, date, priceInNumber, priceInWord',
            });
        }
        const newPayment = {
            bankName: request.body.bankName,
            branch: request.body.branch,
            date: request.body.date,
            priceInNumber: request.body.priceInNumber,
            priceInWord: request.body.priceInWord,
        };

        const payment = await Payment.create(newPayment);

        return response.status(201).send(payment);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get all payments from database
router.get('/', async (request, response) => {
    try {
        const payments = await Payment.find({});

        return response.status(200).json({
            count: payments.length,
            data: payments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get one payment from database by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const payment = await Payment.findById(id);

        return response.status(200).json(payment);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a payment
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.bankName ||
            !request.body.branch ||
            !request.body.date ||
            !request.body.priceInNumber ||
            !request.body.priceInWord
        ) {
            return response.status(400).send({
                message: 'Send all required fields: bankName, branch, date, priceInNumber, priceInWord',
            });
        }

        const { id } = request.params;

        const result = await Payment.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Payment not found' });
        }

        return response.status(200).send({ message: 'Payment updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Delete a payment
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Payment.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Payment not found' });
        }

        return response.status(200).send({ message: 'Payment deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;