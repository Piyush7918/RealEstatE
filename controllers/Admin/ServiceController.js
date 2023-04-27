const ServiceModel = require('../../models/Service');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});



class ServiceController {

    static service = async (req, res) => {

        try {
            const service = await ServiceModel.find()
            // console.log(data)
            res.render('admin/ourservices/services', { se: service })
        } catch (error) {
            console.log(error)
        }
    }

    static insertservice = async (req, res) => {

        try {
            // console.log(req.files.image)

            const result = new ServiceModel({
                sertitle : req.body.sertitle,
                serdescription: req.body.serdescription
               
            })

            await result.save()
            res.redirect('/admin/ourservices/services')    // here we take url of route from web.js in ()

          
        } catch (error) {
            console.log(error)
        }
    }

    static seredit = async (req, res) => {

        try {
            const data = await ServiceModel.findById(req.params.id)
            res.render('admin/ourservices/seredit', { seredit: data })

        } catch (error) {
            console.log(error)
        }
    }
    
    static serview = async (req, res) => {

        try {
            const data = await ServiceModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('admin/ourservices/serview', { serview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static serupdate = async (req, res) => {

        try {
                const update = await ServiceModel.findByIdAndUpdate(req.params.id, {
                    sertitle : req.body.sertitle,
                    serdescription: req.body.serdescription
                })

                await update.save()
                res.redirect('/admin/ourservices/services')

        } catch (error) {
            console.log(error)
        }
    }

    static serdelete = async (req, res) => {

        try {

            await ServiceModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/ourservices/services')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ServiceController