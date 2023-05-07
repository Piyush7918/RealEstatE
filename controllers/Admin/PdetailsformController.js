const PdetailsformModel = require("../../models/Pdetailsform")

class PdetailsformController {

    static Pdetailsform = async (req, res) => {

        try{
         const Pdetailsform  = await PdetailsformModel.find()
        //  console.log('hello')
         res.render('admin/property/pdetailsform', { pd: Pdetailsform })
        }catch(error){
            console.log(error)
        }

    }

    static Pdetails_insert = async (req, res) => {
        try{

            const result = new PdetailsformModel({
                pdemail: req.body.pdemail,
                pdname: req.body.pdname,
                pdhouseid: req.body.pdhouseid,
                pdcomment: req.body.pdcomment
                
            })
            await result.save()
           
            res.redirect('/properties')

        }catch(error){
            console.log(error)
        }
    }

    static Pdetailsformdelete = async (req, res) => {

        try {

            await PdetailsformModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/property/pdetailsform')

        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = PdetailsformController