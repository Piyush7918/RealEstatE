const TestimonialsModel = require('../../models/Testimonials');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});



class TestimonialsController {

    static testimonials = async (req, res) => {

        try {
            const test = await TestimonialsModel.find()
            // console.log(data)
            res.render('admin/testimonials/testimonials', { t: test })
        } catch (error) {
            console.log(error)
        }
    }

    static inserttestimonials = async (req, res) => {

        try {
            // console.log(req.files.image)

            // code for sending files to the cloudinary
            const file = req.files.clientimage
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Testimonials_image'
            })
            // console.log(file)
            const result = new TestimonialsModel({
                clientname: req.body.clientname,
                clientfeedback: req.body.clientfeedback,
                clientimage: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })

            await result.save()
            res.redirect('admin/testimonials/testimonials')    // here we take url of route from web.js in ()

          
        } catch (error) {
            console.log(error)
        }
    }

    static testview = async (req, res) => {

        try {
            const data = await TestimonialsModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('admin/testimonials/testview', { tview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static testedit = async (req, res) => {

        try {
            const data = await TestimonialsModel.findById(req.params.id)
            res.render('admin/testimonials/testedit', { tedit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static testupdate = async (req, res) => {

        try {
            // first delete the image from the database
            const testimonials = await TestimonialsModel.findById(req.params.id)
            const imageid = testimonials.clientimage.public_id

            if (req.files && req.files.clientimage) {
                await cloudinary.uploader.destroy(imageid)

                // second insert the image into the database
                // code for sending files to the cloudinary
                const file = req.files.clientimage
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Testimonials_image'
                })

                const update = await TestimonialsModel.findByIdAndUpdate(req.params.id, {

                    clientname: req.body.clientname,
                    clientfeedback: req.body.clientfeedback,
                    clientimage: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })

                await update.save()
                res.redirect('/admin/testimonials/testimonials')

            } else {
                const update = await TestimonialsModel.findByIdAndUpdate(req.params.id, {

                    clientname: req.body.clientname,
                    clientfeedback: req.body.clientfeedback
                    
                })
                await update.save()
                res.redirect('/admin/testimonials/testimonials')
            }


        } catch (error) {
            console.log(error)
        }
    }

    static testdelete = async (req, res) => {

        try {
            // delete image from server code started
            const testimonials = await TestimonialsModel.findById(req.params.id)
            const imageid = testimonials.clientimage.public_id // to find public id of the image that will be deleted
            await cloudinary.uploader.destroy(imageid)
            // delete image from server code part ended
            await TestimonialsModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/testimonials/testimonials')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = TestimonialsController