const {Strategy: LocalStrategy} = require("passport-local");
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        customer.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
            usernameField : 'name',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, name, password, done) {
            customer.findOne({ 'local.name' : name },
                function(err, user) {
                    if (err) return done(err);

                    if (!user)
                        return done(null, false);

                    if (!user.validPassword(password))
                        return done(null, false);


                    else
                        return done(null, user); // all good return user
                })
        }));
};