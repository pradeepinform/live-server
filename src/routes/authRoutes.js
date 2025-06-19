import express from 'express';
import passport from 'passport';
import { googleCallback, getUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    googleCallback
);

router.get('/user',
    passport.authenticate('jwt', { session: false }),
    getUser
);

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
