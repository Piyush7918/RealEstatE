const AboutmidModel = require('../../models/Aboutmid');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});



class AboutmidController {

    static aboutmid = async (req, res) => {

        try {
            const amid = await AboutmidModel.find()
            // console.log(data)
            res.render('admin/about/aboutmid', { am: amid })
        } catch (error) {
            console.log(error)
        }
    }

    static insertaboutmid = async (req, res) => {

        try {
            // console.log(req.files.amimage)

            // code for sending files to the cloudinary
            const file = req.files.amimage
            // console.log(file)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Aboutmidimage'
            })
            // console.log(file)
            const result = new AboutmidModel({
                verticaltitle: req.body.verticaltitle,
                amtitle: req.body.amtitle,
                amdescription: req.body.amdescription,
                amimage: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })

            await result.save()
            res.redirect('/admin/about/aboutmid')    // here we take url of route from web.js in ()

          
        } catch (error) {
            console.log(error)
        }
    }

    static amview = async (req, res) => {

        try {
            const data = await AboutmidModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('../views/admin/about/amview', { amview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static amedit = async (req, res) => {

        try {
            const data = await AboutmidModel.findById(req.params.id)
            res.render('../views/admin/about/amedit', { amedit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static amupdate = async (req, res) => {

        try {
            // first delete the image from the database
            const aboutmid = await AboutmidModel.findById(req.params.id)
            const imageid = aboutmid.amimage.public_id

            if (req.files && req.files.amimage) {
                await cloudinary.uploader.destroy(imageid)

                // second insert the image into the database
                // code for sending files to the cloudinary
                const file = req.files.amimage
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Aboutmidimage'
                })

                const update = await AboutmidModel.findByIdAndUpdate(req.params.id, {
                    verticaltitle: req.body.verticaltitle,
                    amtitle: req.body.amtitle,
                    amdescription: req.body.amdescription,
                    amimage: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })

                await update.save()
                res.redirect('/admin/about/aboutmid')

            } else {
                const update = await AboutmidModel.findByIdAndUpdate(req.params.id, {

                    verticaltitle: req.body.verticaltitle,
                    amtitle: req.body.amtitle,
                    amdescription: req.body.amdescription

                })
                await update.save()
                res.redirect('/admin/about/aboutmid')
            }


        } catch (error) {
            console.log(error)
        }
    }

    static amdelete = async (req, res) => {

        try {
            // delete image from server code started
            const aboutmid = await AboutmidModel.findById(req.params.id)
            const imageid = aboutmid.amimage.public_id // to find public id of the image that will be deleted
            await cloudinary.uploader.destroy(imageid)
            // delete image from server code part ended
            await AboutmidModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/about/aboutmid')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = AboutmidController