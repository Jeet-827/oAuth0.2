import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../model/UserSchema.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            callbackURL: process.env.CALLBACKURL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findOne({ googleId: profile.id });


                if (user) {
                    return done(null, user);
                }

                const email = profile.emails?.[0]?.value;

                if (email) {
                    user = await userModel.findOne({ email });

                    if (user) {

                        user.googleId = profile.id;
                        await user.save();

                        return done(null, user);
                    }
                }



                const existingUsername = await userModel.findOne({ username: profile.displayName });
                if (existingUsername) {

                    existingUsername.googleId = profile.id;
                    await existingUsername.save();
                    return done(null, existingUsername);
                }

                user = await userModel.create({
                    username: profile.displayName,
                    email,
                    googleId: profile.id,
                });

                return done(null, user);

            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;
