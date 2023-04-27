const AdminloginModel = require("../../models/Adminlogin");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') // for generating tokens

class AdminController {
    static dashboard = async (req, res) => {
        try {
            const { name,email } = req.admin
            res.render('admin/dashboard', { n:name, e: email });
        } catch (error) {
            console.log(error)
        }
    }

    static adminregister = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, password, confirmpassword } = req.body
            const admin = await AdminloginModel.findOne({ email: email })

            if (admin) {
                req.flash('error', 'Email already exists')
                res.redirect('/register')
            } else {

                if (name && email && password && confirmpassword) {

                    if (password == confirmpassword) {

                        try {
                            const hashpassword = await bcrypt.hash(password, 10)
                            const register = await new AdminloginModel({

                                name: name,
                                email: email,
                                password: hashpassword
                            })

                            await register.save()
                            req.flash('success', 'registration successfully completed')
                            res.redirect('/login')

                        } catch (error) {
                            console.log(error)
                        }

                    } else {
                        req.flash('error', 'Password and Confirm Password not Matched')
                        res.redirect('/register')
                    }

                } else {
                    req.flash('error', 'All Fields are required')
                    res.redirect('/register')
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    static verifylogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const admin = await AdminloginModel.findOne({ email: email })

                if (admin != null) {
                    const ismatched = await bcrypt.compare(password, admin.password)

                    if (ismatched) {

                        // Generate jwt token 
                        const token = jwt.sign({ id: admin._id }, 'piyush7918singh1999')
                        // console.log(token)
                        res.cookie('token', token)
                        res.redirect('/admin/dashboard')
                    } else {
                        req.flash('error', 'Email or password is incorrect')
                        res.redirect('/login')
                    }

                } else {
                    req.flash('error', 'You are not registered user')
                    res.redirect('/login')
                }

            } else {
                req.flash('error', 'All Fields are required')
                res.redirect('/login')
            }

        } catch (error) {
            console.log(error)
        }
    }

    static logout = async (req, res) => {

        try {
            res.clearCookie('token')
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }

    }

}
module.exports = AdminController