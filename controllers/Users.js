const Users = require("../models/Users")
const bcrypt = require("bcrypt")
const saltRound = 10
const jwt = require("jsonwebtoken")

const init = async () => {
    try {
        Users.deleteMany({}).then(() => {
            const defaultUser = new Users({
                id: 1,
                userName: process.env.DEFAULT_USER,
                hashPass: "",
            })

            bcrypt.hash(process.env.DEFAULT_PASS, saltRound, (err, hash) => {
                if (err) {
                    console.log("🚀 ~ bcrypt.hash ~ err:", err?.message)
                } else {
                    defaultUser.hashPass = hash
                    defaultUser.save().then(() => {
                        console.log("User added")
                    })
                }
            })
        })

    } catch (error) {
        console.log("🚀 ~ init ~ error:", error?.message)
    }
}
init()

exports.login = async (req, res) => {
    try {
        const {
            userName,
            password
        } = req.body

        const user = await Users.findOne({ userName: userName })
        if (user) {
            bcrypt.compare(password, user.hashPass, (err, result) => {
                if (err) {
                    res.status(200).json({
                        result: false,
                        code: 500,
                        message: `login ${err?.message}`
                    })
                } else {
                    if (result) {
                        // res.status(200).send("Logined!")
                        jwt.sign({ id: user.id, username: user.userName }, process.env.TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
                            if (err) {
                                res.status(200).json({
                                    result: false,
                                    code: 500,
                                    message: `login ${err?.message}`
                                })
                            } else {
                                res.cookie("token", token, { signed: true, httpOnly: true })
                                res.status(200).json({
                                    result: true,
                                    code: 200,
                                    message: "Logined!"
                                })
                            }
                        })
                    } else {
                        res.status(200).json({
                            result: false,
                            code: 400,
                            message: "Check your username and password!"
                        })
                    }
                }
            })
        } else {
            res.status(200).json({
                result: false,
                code: 404,
                message: "User not found!"
            })
        }
    } catch (error) {
        res.status(200).json({
            result: false,
            code: 500,
            message: `login ${error?.message}`
        })
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({
            result: true,
            code: 200,
            message: `logout`
        })
    } catch (error) {
        res.status(200).json({
            result: false,
            code: 500,
            message: `logout ${error?.message}`
        })
    }
}

exports.checkLogin = async (req, res, next) => {
    try {
        const token = req.signedCookies["token"]

        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    // res.status(403).send(err?.message)
                    next()
                } else {
                    req.user = decoded
                    next()
                }
            })
        } else {
            // res.status(401).send("Please login!")
            next()
        }
    } catch (error) {
        // res.status(500).send(`checkLogin ${error?.message}`)
        next()
    }
}