const AgentsModel = require('../../models/Agents');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    // secure: true
});



class AgentsController {

    static agents = async (req, res) => {

        try {
            const agents = await AgentsModel.find()
            // console.log(data)
            res.render('admin/agents/agents', { ag: agents })
        } catch (error) {
            console.log(error)
        }
    }

    static insertagents = async (req, res) => {

        try {
            // console.log(req.files.image)

            // code for sending files to the cloudinary
            const file = req.files.agentimage
            // console.log(file)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Agents_image'
            })
            // console.log(file)
            const result = new AgentsModel({
                agentname: req.body.agentname,
                aboutagent: req.body.aboutagent,
                agentphone: req.body.agentphone,
                agentemail: req.body.agentemail,
                agentimage: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })
            // console.log(result)

            await result.save()
            res.redirect('/admin/agents/agents')    // here we take url of route from web.js in ()


        } catch (error) {
            console.log(error)
        }
    }

    static agentsview = async (req, res) => {

        try {
            const data = await AgentsModel.findById(req.params.id)  // findById is query of Mongo used to fetch data from mongo
            //params is used to get id from mongo
            // console.log(data)  
            res.render('../views/admin/agents/agentsview', { agview: data })

        } catch (error) {
            console.log(error)
        }
    }

    static agentsedit = async (req, res) => {

        try {
            const data = await AgentsModel.findById(req.params.id)
            res.render('../views/admin/agents/agentsedit', { agedit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static agentsupdate = async (req, res) => {

        try {
            // first delete the image from the database
            const agents = await AgentsModel.findById(req.params.id)
            const imageid = agents.agentimage.public_id

            if (req.files && req.files.agentimage) {
                await cloudinary.uploader.destroy(imageid)

                // second insert the image into the database
                // code for sending files to the cloudinary
                const file = req.files.agentimage
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Agents_image'
                })

                const update = await AgentsModel.findByIdAndUpdate(req.params.id, {
                    agentname: req.body.agentname,
                    aboutagent: req.body.aboutagent,
                    agentphone: req.body.agentphone,
                    agentemail: req.body.agentemail,
                    agentimage: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })

                await update.save()
                res.redirect('/admin/agents/agents')

            } else {
                const update = await AgentsModel.findByIdAndUpdate(req.params.id, {

                    agentname: req.body.agentname,
                    aboutagent: req.body.aboutagent,
                    agentphone: req.body.agentphone,
                    agentemail: req.body.agentemail

                })
                await update.save()
                res.redirect('/admin/agents/agents')
            }


        } catch (error) {
            console.log(error)
        }
    }

    static agentsdelete = async (req, res) => {

        try {
            // delete image from server code started
            const agents = await AgentsModel.findById(req.params.id)
            const imageid = agents.agentimage.public_id // to find public id of the image that will be deleted
            await cloudinary.uploader.destroy(imageid)
            // delete image from server code part ended
            await AgentsModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/agents/agents')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = AgentsController