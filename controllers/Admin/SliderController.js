const SliderModel = require('../../models/Slider');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});



class SliderController {

    static slider = async (req, res) => {

        try {
            const data = await SliderModel.find()
            // console.log(data)
            res.render('admin/home/slider', { s: data })
        } catch (error) {
            console.log(error)
        }
    }

    static insertslider = async (req, res) => {

        try {
            // console.log(req.files.image)

            // code for sending files to the cloudinary
            const file = req.files.Simage
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Sliderimage'
            })
            // console.log(file)
            const result = new SliderModel({
                location: req.body.location,
                city: req.body.city,
                address: req.body.address,
                price: req.body.price,
                Simage: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })

            await result.save()
            res.redirect('admin/home/slider')    // here we take url of route from web.js in ()

          
        } catch (error) {
            console.log(error)
        }
    }

    static sliderview = async (req, res) => {

        try {
            const data = await SliderModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('admin/home/sliderview', { sview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static slideredit = async (req, res) => {

        try {
            const data = await SliderModel.findById(req.params.id)
            res.render('admin/home/slideredit', { sedit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static sliderupdate = async (req, res) => {

        try {
            // first delete the image from the database
            const slider = await SliderModel.findById(req.params.id)
            const imageid = slider.Simage.public_id

            if (req.files && req.files.Simage) {
                await cloudinary.uploader.destroy(imageid)

                // second insert the image into the database
                // code for sending files to the cloudinary
                const file = req.files.Simage
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'sliderimage'
                })

                const update = await SliderModel.findByIdAndUpdate(req.params.id, {

                    location: req.body.location,
                    city: req.body.city,
                    address: req.body.address,
                    price: req.body.price,
                    Simage: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })

                await update.save()
                res.redirect('/admin/home/slider')

            } else {
                const update = await SliderModel.findByIdAndUpdate(req.params.id, {

                    location: req.body.location,
                    city: req.body.city,
                    address: req.body.address,
                    price: req.body.price

                })
                await update.save()
                res.redirect('/admin/home/slider')
            }


        } catch (error) {
            console.log(error)
        }
    }

    static sliderdelete = async (req, res) => {

        try {
            // delete image from server code started
            const slider = await SliderModel.findById(req.params.id)
            const imageid = slider.Simage.public_id // to find public id of the image that will be deleted
            await cloudinary.uploader.destroy(imageid)
            // delete image from server code part ended
            await SliderModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/home/slider')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = SliderController