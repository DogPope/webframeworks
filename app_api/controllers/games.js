const mongoose = require('mongoose');
const Game = mongoose.model('steam');

// Valid Ids.
const gamePlaceholder = async function (req, res) {
    res
        .status(200)
        .json({"status" : "success"});
};

const getGame = async function (req, res) {
    try{
        const games = await Game.find({});
        res.render('gamepage', {
            title: "Data page",
            heading: "Jeff",
            games: games
    });
    }catch(err){
        re.status(500).json({message: err.message})
    }
};

module.exports = {
    getGame,
    gamePlaceholder
};