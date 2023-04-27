const AbouttopModel = require('../../models/Abouttop');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});



class AbouttopController {

    static abouttop = async (req, res) => {

        try {
            const data = await AbouttopModel.find()
            // console.log(data)
            res.render('admin/about/abouttop', { at: data })
        } catch (error) {
            console.log(error)
        }
    }

    static insertabouttop = async (req, res) => {

        try {
            // console.log(req.files.image)

            // code for sending files to the cloudinary
            const file = req.files.atimage
            // console.log(file)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Abouttopimage'
            })
            // console.log(file)
            const result = new AbouttopModel({
                companyname: req.body.companyname,
                subtitle: req.body.subtitle,
                atimage: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })
            // console.log(result)

            await result.save()
            res.redirect('/admin/about/abouttop')    // here we take url of route from web.js in ()

          
        } catch (error) {
            console.log(error)
        }
    }

    static atview = async (req, res) => {

        try {
            const data = await AbouttopModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('../views/admin/about/atview', { atview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static atedit = async (req, res) => {

        try {
            const data = await AbouttopModel.findById(req.params.id)
            res.render('../views/admin/about/atedit', { atedit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static atupdate = async (req, res) => {

        try {
            // first delete the image from the database
            const abouttop = await AbouttopModel.findById(req.params.id)
            const imageid = abouttop.atimage.public_id

            if (req.files && req.files.atimage) {
                await cloudinary.uploader.destroy(imageid)

                // second insert the image into the database
                // code for sending files to the cloudinary
                const file = req.files.atimage
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Abouttopimage'
                })

                const update = await AbouttopModel.findByIdAndUpdate(req.params.id, {
                    companyname: req.body.companyname,
                    subtitle: req.body.subtitle,
                    atimage: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })

                await update.save()
                res.redirect('/admin/about/abouttop')

            } else {
                const update = await AbouttopModel.findByIdAndUpdate(req.params.id, {

                    companyname: req.body.companyname,
                    subtitle: req.body.subtitle

                })
                await update.save()
                res.redirect('/admin/about/abouttop')
            }


        } catch (error) {
            console.log(error)
        }
    }

    static atdelete = async (req, res) => {

        try {
            // delete image from server code started
            const abouttop = await AbouttopModel.findById(req.params.id)
            const imageid = abouttop.atimage.public_id // to find public id of the image that will be deleted
            await cloudinary.uploader.destroy(imageid)
            // delete image from server code part ended
            await AbouttopModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/about/abouttop')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = AbouttopController