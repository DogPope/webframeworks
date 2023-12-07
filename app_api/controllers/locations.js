const mongoose = require('mongoose');
const customerModel = mongoose.model('customers');

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
const pageVariables = function(req, res){
    res.render('register', {
        title: "Registration",
        heading: "Hello There!"
    })
}
const customerCreate = async function (req, res) {
    const { name, password, phone, cardnumber} = req.body;
    console.log('Form Data:', { name, password, phone, cardnumber });

    if(name === "" || cardnumber === "" || password === "" || phone === ""){
        const err1 = "All fields need to be filled in!";
        res.render('register', { title: 'Register', err1 });
    }
    else{
        const newUser = new customerModel({
            name,
            phone,
            password,
            cardnumber
        })
        try {
            await newUser.save();
            console.log('User registered successfully');
            res.render('register', {
                title: 'Register',
                loginStatus: 'Your registration was successful!'
            });
        } catch (err) {
            console.error('Error saving user:', err);
            res.status(500).json({error: `Failed to register user. ${err.message}`});
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
    customerCreate,
    loginPage,
    loginUser,
    customerReadOne,
    customerUpdate,
    customerDeleteOne
};