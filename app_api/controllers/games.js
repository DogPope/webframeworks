const mongoose = require('mongoose');
const Game = mongoose.model('steam');

// Valid Ids.
const gamePlaceholder = async function (req, res) {
    res
        .status(200)
        .json({"status" : "success"});
};

// This one does work, so use as template?
const getGame = async function (req, res) {
    try{
        const games = await Game.find({});
        res.render('gamepage', {
              title: "Game Page",
              heading: "Hello There!",
              games: games
    });
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports = {
    getGame,
    gamePlaceholder
};