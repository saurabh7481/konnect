const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const config = require('config');
const auth = require('../../middleware/auth');
const normalize = require('normalize-url');
const { check, validationResult } = require('express-validator');

router.post('/register', 
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
    'password',
    'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
            }

            const avatar = normalize(
                gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
                }),
                { forceHttps: true }
            );

            user = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: '5 days' },
                (err, token) => {
                if (err) throw err;
                res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
})

router.post('/login', 
    check('email', 'Please include a valid email').isEmail(),
    check(
    'password',
    'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email;
        const password = req.body.password;

        try {
            let user = await User.findOne({ email });
      
            if (!user) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
      
            const isMatch = await bcrypt.compare(password, user.password);
      
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
      
            const payload = {
              user: {
                id: user.id
              }
            };
      
            jwt.sign(
              payload,
              config.get('jwtSecret'),
              { expiresIn: '5 days' },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
})

router.get('/dashboard', auth, (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})

module.exports = router;