const AboutmidModel = require("../models/Aboutmid")
const AbouttopModel = require("../models/Abouttop")
const AgentsModel = require("../models/Agents")
const ContactModel = require("../models/Contact")
const PropertyModel = require("../models/Property")
const ServiceModel = require("../models/Service")
const SliderModel = require("../models/Slider")
const TestimonialsModel = require("../models/Testimonials")

class FrontController {


   static home = async (req, res) => {
      try {
         // console.log('hello')
         const data = await SliderModel.find()
         const prop = await PropertyModel.find()
         const agents = await AgentsModel.find().sort({ _id: -1 }).limit(6)
         const test = await TestimonialsModel.find()
         const service = await ServiceModel.find()
         res.render('front/home', { s: data, p: prop, ag: agents, t: test, se: service })

      } catch (error) {
         console.log(error)
      }
   }

   static about = async (req, res) => {
      try {
         // console.log('hello')
         const data = await AbouttopModel.find()
         const amid = await AboutmidModel.find()
         const agents = await AgentsModel.find().sort({ _id: -1 }).limit(3)
         res.render('front/about', { at: data, am: amid, ag: agents })
      } catch (error) {
         console.log(error)
      }

   }

   static properties = async (req, res) => {
      try {
         // console.log('hello')
         const prop = await PropertyModel.find()
         res.render('front/properties', { p: prop })
      } catch (error) {
         console.log(error)
      }

   }

   static property_single = async (req, res) => {
      try {
         res.render('front/property_single', { p: prop })
      } catch (error) {
         console.log(error)
      }
   }

   static agents = async (req, res) => {
      try {
         // console.log('hello')
         const agents = await AgentsModel.find()
         res.render('front/agents', { ag: agents })
      } catch (error) {
         console.log(error)
      }

   }

   static property_single = async (req, res) => {
      try {
         // console.log('hello')
         const property = await PropertyModel.findById(req.params.id)
         // const agents = await AgentsModel.findById(req.params.id)
         //  console.log(property)
         res.render('front/property_single', { p: property})
      } catch (error) {
         console.log(error)
      }
   }

   static contact = async (req, res) => {

      try {
         const contact = await ContactModel.find()
         // console.log(data)
         res.render('front/contact', { c: contact })
      } catch (error) {
         console.log(error)
      }
   }


   static search = async (req, res) => {

      try {

         const data = req.body.search
         let search_data;

         if (data) {
            search_data = await PropertyModel.find({ "plocation": { $regex: data } })
         }

         // console.log(search_data);
         const prop = await PropertyModel.find()
         res.render('front/search', { users: search_data, p: prop });

      } catch (error) {
         console.log(error)
      }
   }


   static register = async (req, res) => {
      // console.log('hello')
      res.render('front/register', { message: req.flash('error') })
   }

   static login = async (req, res) => {
      try {
          // console.log('hello')
         res.render('front/login', { message: req.flash('error') })
      } catch (error) {
         console.log(error)
      }
   }




}
module.exports = FrontController