const mongoose = require('mongoose');
const customerModel = mongoose.model('customer');

const about = function(req, res) {
    const about = true;
    res.render('about', {   title: 'About us!', about})
};
const loginPage = function(req, res){
    res.render('login', {
        title: "Registration",
        heading: "Hello There!"
    })
}
const loginUser = async function (req, res) {
    const { name, password } = req.body;
    const loggedIn = true;
    const invalid = true;


    try {
        const user = await customerModel.findOne({ name, password });

        if (!user) {
            res.render('login', { title: 'login', invalid});
            return;
        }
        req.session.userId = null;
        req.session.userId = user._id;

        const accounts = await customerModel.findOne(req.session.userId);

        res.render('gamepage', { title: 'Data Page', loggedIn, name});

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed' });
    }
};
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
const pageVariables = function(req, res){
    res.render('register', {
        title: "Registration",
        heading: "Hello There!"
    })
}
/*const registerCustomer = async function(req, res){
    res.render('register', {
        title: "Registration",
        heading: "Hello There!"
    })
    //const custData = req.body;
    const jack = new customerModel({
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        cardnumber: req.body.cardnumber
    })
    try {
        await jack
            .save();
        console.log("Customer saved successfully");
        res.status(201).json(jack);
    } catch (error) {
        console.error("Error saving customer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};*/
const registerCustomer = async function (req, res) {
    const { name, cardnumber, password, phone} = req.body;

    if(name === "" || cardnumber === "" || password === "" || phone === ""){
        const err1 = "Some fields are empty";
        res.render('register', { title: 'Register', err1 });
    }
    else {
        const foundUser = await customerModel.findOne({ name: name });
        if (foundUser) {
            const err1 = "username already exists";
            res.render('register', {title: 'Register', err1});
        } else {
            const st = true;
            const newUser = new customerModel({
                name,
                phone,
                password,
                cardnumber
            });
            newUser
                .save()
                .then(() => {
                    console.log('User registered successfully');
                    res.render('register', {title: 'Register'});
                })
                .catch((err) => {
                    console.error('Error saving user:', err);
                    res.status(500).json({error: 'Failed to register user'});
                });
        }
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
    about,
    pageVariables,
    registerCustomer,
    customerCreate,
    loginPage,
    loginUser,
    customerReadOne,
    customerUpdate,
    customerDeleteOne
};