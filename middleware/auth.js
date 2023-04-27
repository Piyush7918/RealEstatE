const jwt = require('jsonwebtoken')
const AdminloginModel = require('../models/Adminlogin');



const checkAdminloginAuth = async (req, res, next) => {
    // console.log('hello middleware')
    const { token } = req.cookies
    if (!token) {

        req.flash('error', 'Unauthorized Admin')
        res.redirect('/login')
    } else {

        const data = jwt.verify(token, 'piyush7918singh1999')
        //    console.log(data) 
        const admin = await AdminloginModel.findOne({ _id: data.id })
        // console.log(admin) 
        req.admin = admin
        next()
    }

}

module.exports = checkAdminloginAuth