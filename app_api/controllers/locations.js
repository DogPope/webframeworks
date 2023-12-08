const mongoose = require('mongoose');
const customerModel = mongoose.model('customers');
const passport = require('passport');

const request = require('request');

const apiOptions = {
    server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://danieljamesont00158237.onrender.com';
}
/*const requestOptions = {
    url : 'http://localhost:3000/api',
    method : 'GET',
    json : {},
    qs : {
        offset : 20
    }
};*/
/*
*   passport.deserializeUser((userObj, done) => {      done (null, userObj )})
* */


const about = function(req, res) {
    res.render('about', {
        title: 'About Us!',
        paragraph: "A home for building and playing your curated game collection, " +
            "Daniel Industries is a digital distribution platform that puts gamers first and respects their need to own games.",
        paragraph2: "Welcome to our virtual realm, where passion for gaming converges with a commitment to delivering an unparalleled gaming experience. " +
            "At Daniel Industries, we are not just a marketplace; " +
            "we are enthusiasts, advocates, and architects of the gaming universe. As fervent gamers ourselves, " +
            "we understand the thrill of embarking on epic adventures, " +
            "conquering virtual worlds, and immersing ourselves in the boundless creativity of game developers. " +
            "Our mission is to curate a diverse selection of top-tier titles, " +
            "ranging from indie gems to blockbuster masterpieces, ensuring that every gamer finds their perfect match. " +
            "With a user-friendly platform reminiscent of a gamer's paradise, " +
            "Daniel Industries is your go-to destination for discovering, acquiring, and enjoying the latest and greatest video games.\n" +
            "\n" +
            "Beyond mere transactions, we aspire to foster a vibrant gaming community. Daniel Industries is more than just a storefront; " +
            "it's a gathering place for fellow gamers to connect, share experiences, and celebrate the ever-evolving landscape of interactive entertainment. " +
            "Our team is dedicated to providing exceptional customer service, tailored recommendations, and exclusive deals, all designed to enhance your gaming journey. " +
            "Whether you're a seasoned player or a newcomer to the digital realm, " +
            "join us at Daniel Industries as we embark on a quest to redefine the way you discover and enjoy the vast universe of video games."
        })
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

    // Passport Function
    authUser = (user, password, done) => {
        let authenticated_user = { id: 123, name: "Kyle"}
        return done (null, authenticated_user )
    }

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
        // Passport Function
        passport.serializeUser( (userObj, done) => {
            done(null, userObj)
            }
        )
        passport.deserializeUser((userObj, done) => {
            done (null, userObj )
            }
        )

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