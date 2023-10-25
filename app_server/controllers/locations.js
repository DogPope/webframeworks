/* GET 'home' page */

    // Page variables stored like this.
    const gamePage = function(req, res){
        res.render('gamepage', {
            pageHeader: {title: 'Games Page', heading: 'Competitive Everywhere'},
                games: [
                     {title: "Zelda", 
                        price: 12.55,
                        image: '/images/zelda.png',
                        genre: "Platformer",
                        description: "Green Guy rescues Princess, but faces racism along the way!",
                        rating: 6
                     },{
                        title: "DOOM",
                        price: 32.65,
                        image: 'images/doom.jpg',
                        genre: "Action",
                        description: "Doomguy Just Leaves and Frustrates the Demons!",
                        rating: 8
                     },{
                        title: "Goat Simulator",
                        price: 50.00,
                        image: 'images/goat.jpg',
                        genre: "Simulator",
                        description: "Enjoy the Life of a Goat While Eating Grass on the Savannah!",
                        rating: 9
                     },{
                        title: "Factorio",
                        price: 32.55,
                        image: 'images/factorio.jpg',
                        genre: "Base Building",
                        description: "Factory Building and Nuclear Weapons Simulator",
                        rating: 11
                     }]
        });
    };

    /* GET 'Login' page */
    const login = function(req, res){
        res.render('login', {
            title: 'Login',
            random_variable: 'Wheeeeee!'
        });
        };
    
    /* GET 'Registration' page */
    const registerPage = function(req, res){
        res.render('registration', { 
            title: 'Register here' 
        });
    };

    module.exports = {
    gamePage,
    login,
    registerPage
    };