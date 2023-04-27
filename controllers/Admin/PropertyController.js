const PropertyModel = require('../../models/Property');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});


class PropertyController {

    static property = async (req, res) => {

        try {
            const prop = await PropertyModel.find()
            // console.log(data)
            res.render('admin/property/property', { p: prop })
        } catch (error) {
            console.log(error)
        }
    }

    static insertproperty = async (req, res) => {

        try {
            // console.log(req.files.image)

            // code for sending files to the cloudinary
            const imagesLink = []
            const file = req.files.pimage
            // console.log(file)
            for (let i = 0; i < file.length; i++) {
                const result = await cloudinary.uploader.upload(file[i].tempFilePath, {
                    folder: 'Propertyimage'
                })

                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }

            const fimage = req.files.fimage

            const myimage = await cloudinary.uploader.upload(fimage.tempFilePath, {
                folder: 'Propertyimage'
            })

            const result = new PropertyModel({
                plocation: req.body.plocation,
                pbeds: req.body.pbeds,
                pbaths: req.body.pbaths,
                pareas: req.body.pareas,
                pgarages: req.body.pgarages,
                pdescription: req.body.pdescription,
                amenities: req.body.amenities,
                pprice: req.body.pprice,
                pimage: imagesLink,
                fimage: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })

            await result.save()
            // console.log(result)
            res.redirect('admin/property/property')    // here we take url of route from web.js in ()


        } catch (error) {
            console.log(error)
        }
    }

    static propertyview = async (req, res) => {

        try {
            const data = await PropertyModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('admin/property/pview', { pview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static propertyedit = async (req, res) => {

        try {
            const data = await PropertyModel.findById(req.params.id)
            res.render('admin/property/pedit', { pedit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static propertyupdate = async (req, res) => {

        try {
            // first delete the image from the database
            const property = await PropertyModel.findById(req.params.id)
            const imageid = property.fimage.public_id

            if (req.files && req.files.fimage) {
                await cloudinary.uploader.destroy(imageid)

                // second insert the image into the database
                // code for sending files to the cloudinary
                const file = req.files.fimage
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Propertyimage'
                })

                const update = await PropertyModel.findByIdAndUpdate(req.params.id, {

                    plocation: req.body.plocation,
                    pbeds: req.body.pbeds,
                    pbaths: req.body.pbaths,
                    pareas: req.body.pareas,
                    pgarages: req.body.pgarages,
                    pdescription: req.body.pdescription,
                    amenities: req.body.amenities,
                    pprice: req.body.pprice,
                    fimage: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })

                await update.save()
                res.redirect('/admin/property/property')

            } else {
                const update = await PropertyModel.findByIdAndUpdate(req.params.id, {
                    plocation: req.body.plocation,
                    pbeds: req.body.pbeds,
                    pbaths: req.body.pbaths,
                    pareas: req.body.pareas,
                    pgarages: req.body.pgarages,
                    pdescription: req.body.pdescription,
                    amenities: req.body.amenities,
                    pprice: req.body.pprice

                })
                await update.save()
                res.redirect('/admin/property/property')
            }


        } catch (error) {
            console.log(error)
        }
    }

    static propertydelete = async (req, res) => {

        try {
            // delete image from server code started
            const property = await PropertyModel.findById(req.params.id)
            const imageid = property.fimage.public_id // to find public id of the image that will be deleted
            await cloudinary.uploader.destroy(imageid)
            // delete image from server code part ended
            await PropertyModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/property/property')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = PropertyController