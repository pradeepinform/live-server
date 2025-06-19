import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../../models/authModel.js'

const cookieExtracter = (req) => req.cookies?.token;

export default function(passport) {
    passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtracter,
        secretOrKey: process.env.JWT_SECRET
    }, async (payload, done) => {
        try {
            const user = await User.findById(payload.sub);
            console.log("jwt user = ", user)
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error, false);
        }
    }));
}
