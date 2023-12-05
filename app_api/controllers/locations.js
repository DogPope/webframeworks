const mongoose = require('mongoose');
const customerModel = mongoose.model('customer');

// Valid Ids.
const customerCreate = async function (req, res) {
    const daniel = new customerModel({
        name: "Daniel",
        password: "Jeff",
        phone: "0868901314",
        cardnumber: "1234123412341234"
    });
    try {
        await daniel
            .save();
            console.log("Customer saved successfully");
            res.status(201).json(daniel);
    } catch (error) {
        console.error("Error saving customer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const customerReadOne = function (req, res) {
    // Read statement. Extreme error checking edition.
    customerModel
        .find({})
        .then((customer) => {
            if (!customer || customer.length === 0) {
                console.log('No Customers found');
                return res.status(404).json({ error: 'No Customers found' });
            }

            console.log('Customers found:', customer);
            res.status(200).json(customer);
        })
        .catch((err) => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
const customerUpdate = async function (req, res) {
    const customerId = '';

    const updatedData = req.body;

    try {
        const updatedCustomer = await customerModel.findOneAndUpdate(
            { _id: customerId },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        console.log('Customer updated successfully:', updatedCustomer);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const customerDeleteOne = function (req, res) {
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    customerCreate,
    customerReadOne,
    customerUpdate,
    customerDeleteOne
};