import User from '../../models/authModel.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const user = await User.findOneAndUpdate(
                { googleId: profile?.id },
                {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value
                },
                { upsert: true, new: true }
            );
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }));
}
