import passport from 'passport';
import googleStrategy from './strategies/google-login.js';
import jwtStrategy from './strategies/jwt.js';

export function configurePassport() {
    googleStrategy(passport);
    jwtStrategy(passport);
}
