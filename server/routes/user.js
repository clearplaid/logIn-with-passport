const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');
    console.log(req.body)
    const currentUser = req.body
    // ADD VALIDATION
    User.findOne({ currentUser: currentUser.user.username },(err, user) => {
        console.log(currentUser)
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                firstName: currentUser.user.firstName,
                lastName: currentUser.user.lastName,
                userImage: currentUser.user.userImage,
                email: currentUser.user.email,
                username: currentUser.user.username,
                password: currentUser.user.password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login', passport.authenticate('local'),
    function (req, res) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router