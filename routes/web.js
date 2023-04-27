const express = require('express')
const router = express.Router()

const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/Admin/AdminController')
const SliderController = require('../controllers/Admin/SliderController')
const PropertyController = require('../controllers/Admin/PropertyController')
const AbouttopController = require('../controllers/Admin/AbouttopController')
const AboutmidController = require('../controllers/Admin/AboutmidController')
const AgentsController = require('../controllers/Admin/AgentsController')
const ContactController = require('../controllers/Admin/ContactController')
const TestimonialsController = require('../controllers/Admin/TestimonialsController')
const ServiceController = require('../controllers/Admin/ServiceController')
const ContactformController = require('../controllers/Admin/ContactformController')

const auth = require('../middleware/auth')
const PdetailsformController = require('../controllers/Admin/PdetailsformController')

// FrontController
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/properties',FrontController.properties)
router.get('/agents',FrontController.agents)
router.get('/contact',FrontController.contact)
router.get('/login',FrontController.login)
router.get('/register',FrontController.register)
router.get('/property_single/:id',FrontController.property_single)

router.post('/search',FrontController.search)


// Admin Controller
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.post('/adminregister',AdminController.adminregister)
router.post('/verify_login',AdminController.verifylogin)
router.get('/logout',AdminController.logout)


// ========Home Page ==========
// Slider Controller
router.get('/admin/home/slider',auth,SliderController.slider)
router.post('/insertslider',SliderController.insertslider)
router.get('/sliderview/:id', SliderController.sliderview)
router.get('/slideredit/:id', SliderController.slideredit)
router.post('/sliderupdate/:id',SliderController.sliderupdate)
router.get('/sliderdelete/:id', SliderController.sliderdelete)

// Service Controller
router.get('/admin/ourservices/services',auth,ServiceController.service)
router.post('/insertservice',ServiceController.insertservice)
router.get('/serview/:id', ServiceController.serview)
router.get('/seredit/:id', ServiceController.seredit)
router.post('/serupdate/:id',ServiceController.serupdate)
router.get('/serdelete/:id', ServiceController.serdelete)






// ===========Property Pages =================
router.get('/admin/property/property',auth,PropertyController.property)
router.post('/insertproperty',PropertyController.insertproperty)
router.get('/propertyview/:id', PropertyController.propertyview)
router.get('/propertyedit/:id', PropertyController.propertyedit)
router.post('/propertyupdate/:id',PropertyController.propertyupdate)
router.get('/propertydelete/:id', PropertyController.propertydelete)

// ================Property Form =============================

router.get('/admin/property/pdetailsform',auth,PdetailsformController.Pdetailsform)
router.post('/Pdetails_insert',PdetailsformController.Pdetails_insert)
router.get('/Pdetailsformdelete/:id',PdetailsformController.Pdetailsformdelete)

// ===========About Pages =================

// ---------About Banner---------------
router.get('/admin/about/abouttop',auth,AbouttopController.abouttop)
router.post('/insertabouttop',AbouttopController.insertabouttop)
router.get('/atview/:id', AbouttopController.atview)
router.get('/atedit/:id', AbouttopController.atedit)
router.post('/atupdate/:id',AbouttopController.atupdate)
router.get('/atdelete/:id', AbouttopController.atdelete)


// ---------About mid---------------
router.get('/admin/about/aboutmid',auth,AboutmidController.aboutmid)
router.post('/insertaboutmid',AboutmidController.insertaboutmid)
router.get('/amview/:id', AboutmidController.amview)
router.get('/amedit/:id', AboutmidController.amedit)
router.post('/amupdate/:id',AboutmidController.amupdate)
router.get('/amdelete/:id', AboutmidController.amdelete)

// ===========About Pages ends =================


// ===========Agents Page =================

router.get('/admin/agents/agents',auth,AgentsController.agents)
router.post('/insertagents',AgentsController.insertagents)
router.get('/agentsview/:id', AgentsController.agentsview)
router.get('/agentsedit/:id', AgentsController.agentsedit)
router.post('/agentsupdate/:id',AgentsController.agentsupdate)
router.get('/agentsdelete/:id', AgentsController.agentsdelete)

// ===========Agents Page  ends=================



// ===========Contact Page =================

router.get('/admin/contact/contact',auth,ContactController.contact)
router.post('/insertcontact',ContactController.insertcontact)
router.get('/contactview/:id', ContactController.contactview)
router.get('/contactedit/:id', ContactController.contactedit)
router.post('/contactupdate/:id',ContactController.contactupdate)
router.get('/contactdelete/:id', ContactController.contactdelete)


// ===========Contact form Page =================

router.get('/admin/contact/contactform',auth,ContactformController.contactform)
router.post('/contact_insert',ContactformController.contact_insert)
router.get('/contactformdelete/:id',ContactformController.contactformdelete)

// =========== Testimonials Page =================

router.get('/admin/testimonials/testimonials',auth,TestimonialsController.testimonials)
router.post('/inserttestimonials',TestimonialsController.inserttestimonials)
router.get('/testview/:id', TestimonialsController.testview)
router.get('/testedit/:id', TestimonialsController.testedit)
router.post('/testupdate/:id',TestimonialsController.testupdate)
router.get('/testdelete/:id', TestimonialsController.testdelete)




module.exports = router