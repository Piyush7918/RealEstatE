const ContactformModel = require("../../models/Contactform")

class ContactformController {

    static contactform = async (req, res) => {

        try {
            const contactform = await ContactformModel.find()
            // console.log(data)
            res.render('admin/contact/contactform', { cf: contactform })
        } catch (error) {
            console.log(error)
        }
    }

    static contact_insert = async (req, res) => {
        try{

            const result = new ContactformModel({
                cfemail: req.body.cfemail,
                cfname: req.body.cfname,
                cfsubject: req.body.cfsubject,
                cfmessage: req.body.cfmessage
                
            })
            await result.save()
           
            res.redirect('/contact')

        }catch(error){
            console.log(error)
        }
    }

    static contactformdelete = async (req, res) => {

        try {

            await ContactformModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/contact/contactform')

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ContactformController