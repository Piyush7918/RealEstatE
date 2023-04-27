const ContactModel = require('../../models/Contact');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});



class ContactController {

    static contact = async (req, res) => {

        try {
            const contact = await ContactModel.find()
            // console.log(data)
            res.render('admin/contact/contact', { c: contact })
        } catch (error) {
            console.log(error)
        }
    }

    static insertcontact = async (req, res) => {

        try {
            // console.log(req.files.image)

            const result = new ContactModel({
                cemail: req.body.cemail,
                caddress: req.body.caddress,
                cphone: req.body.cphone
               
            })

            await result.save()
            res.redirect('admin/contact/contact')    // here we take url of route from web.js in ()

          
        } catch (error) {
            console.log(error)
        }
    }

    static contactedit = async (req, res) => {

        try {
            const data = await ContactModel.findById(req.params.id)
            res.render('admin/contact/contactedit', { coedit: data })

        } catch (error) {
            console.log(error)
        }
    }
    
    static contactview = async (req, res) => {

        try {
            const data = await ContactModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('admin/contact/contactview', { coview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static contactupdate = async (req, res) => {

        try {
                const update = await ContactModel.findByIdAndUpdate(req.params.id, {

                    cemail: req.body.cemail,
                    caddress: req.body.caddress,
                    cphone: req.body.cphone
                })

                await update.save()
                res.redirect('/admin/contact/contact')

        } catch (error) {
            console.log(error)
        }
    }

    static contactdelete = async (req, res) => {

        try {

            await ContactModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/contact/contact')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ContactController