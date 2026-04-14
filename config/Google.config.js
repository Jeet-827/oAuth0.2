import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURL,
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
    })
)

export default passport