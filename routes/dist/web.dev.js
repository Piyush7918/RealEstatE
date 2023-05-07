"use strict";

var express = require('express');

var router = express.Router();

var FrontController = require('../controllers/FrontController');

var AdminController = require('../controllers/Admin/AdminController');

var SliderController = require('../controllers/Admin/SliderController');

var PropertyController = require('../controllers/Admin/PropertyController');

var AbouttopController = require('../controllers/Admin/AbouttopController');

var AboutmidController = require('../controllers/Admin/AboutmidController');

var AgentsController = require('../controllers/Admin/AgentsController');

var ContactController = require('../controllers/Admin/ContactController');

var TestimonialsController = require('../controllers/Admin/TestimonialsController');

var ServiceController = require('../controllers/Admin/ServiceController');

var ContactformController = require('../controllers/Admin/ContactformController');

var auth = require('../middleware/auth');

var PdetailsformController = require('../controllers/Admin/PdetailsformController'); // FrontController


router.get('/', FrontController.home);
router.get('/about', FrontController.about);
router.get('/properties', FrontController.properties);
router.get('/agents', FrontController.agents);
router.get('/contact', FrontController.contact);
router.get('/login', FrontController.login);
router.get('/register', FrontController.register);
router.get('/property_single/:id', FrontController.property_single);
router.post('/search', FrontController.search); // Admin Controller

router.get('/admin/dashboard', auth, AdminController.dashboard);
router.post('/adminregister', AdminController.adminregister);
router.post('/verify_login', AdminController.verifylogin);
router.get('/logout', auth, AdminController.logout); // ========Home Page ==========
// Slider Controller

router.get('/admin/home/slider', auth, SliderController.slider);
router.post('/insertslider', auth, SliderController.insertslider);
router.get('/sliderview/:id', auth, SliderController.sliderview);
router.get('/slideredit/:id', auth, SliderController.slideredit);
router.post('/sliderupdate/:id', auth, SliderController.sliderupdate);
router.get('/sliderdelete/:id', auth, SliderController.sliderdelete); // Service Controller

router.get('/admin/ourservices/services', auth, ServiceController.service);
router.post('/insertservice', auth, ServiceController.insertservice);
router.get('/serview/:id', auth, ServiceController.serview);
router.get('/seredit/:id', auth, ServiceController.seredit);
router.post('/serupdate/:id', auth, ServiceController.serupdate);
router.get('/serdelete/:id', auth, ServiceController.serdelete); // ===========Property Pages =================

router.get('/admin/property/property', auth, PropertyController.property);
router.post('/insertproperty', auth, PropertyController.insertproperty);
router.get('/propertyview/:id', auth, PropertyController.propertyview);
router.get('/propertyedit/:id', auth, PropertyController.propertyedit);
router.post('/propertyupdate/:id', auth, PropertyController.propertyupdate);
router.get('/propertydelete/:id', auth, PropertyController.propertydelete); // ================Property Form =============================

router.get('/admin/property/pdetailsform', auth, PdetailsformController.Pdetailsform);
router.post('/Pdetails_insert', PdetailsformController.Pdetails_insert);
router.get('/Pdetailsformdelete/:id', auth, PdetailsformController.Pdetailsformdelete); // ===========About Pages =================
// ---------About Banner---------------

router.get('/admin/about/abouttop', auth, AbouttopController.abouttop);
router.post('/insertabouttop', auth, AbouttopController.insertabouttop);
router.get('/atview/:id', auth, AbouttopController.atview);
router.get('/atedit/:id', auth, AbouttopController.atedit);
router.post('/atupdate/:id', auth, AbouttopController.atupdate);
router.get('/atdelete/:id', auth, AbouttopController.atdelete); // ---------About mid---------------

router.get('/admin/about/aboutmid', auth, AboutmidController.aboutmid);
router.post('/insertaboutmid', auth, AboutmidController.insertaboutmid);
router.get('/amview/:id', auth, AboutmidController.amview);
router.get('/amedit/:id', auth, AboutmidController.amedit);
router.post('/amupdate/:id', auth, AboutmidController.amupdate);
router.get('/amdelete/:id', auth, AboutmidController.amdelete); // ===========About Pages ends =================
// ===========Agents Page =================

router.get('/admin/agents/agents', auth, AgentsController.agents);
router.post('/insertagents', auth, AgentsController.insertagents);
router.get('/agentsview/:id', auth, AgentsController.agentsview);
router.get('/agentsedit/:id', auth, AgentsController.agentsedit);
router.post('/agentsupdate/:id', auth, AgentsController.agentsupdate);
router.get('/agentsdelete/:id', auth, AgentsController.agentsdelete); // ===========Agents Page  ends=================
// ===========Contact Page =================

router.get('/admin/contact/contact', auth, ContactController.contact);
router.post('/insertcontact', auth, ContactController.insertcontact);
router.get('/contactview/:id', auth, ContactController.contactview);
router.get('/contactedit/:id', auth, ContactController.contactedit);
router.post('/contactupdate/:id', auth, ContactController.contactupdate);
router.get('/contactdelete/:id', auth, ContactController.contactdelete); // ===========Contact form Page =================

router.get('/admin/contact/contactform', auth, ContactformController.contactform);
router.post('/contact_insert', ContactformController.contact_insert);
router.get('/contactformdelete/:id', auth, ContactformController.contactformdelete); // =========== Testimonials Page =================

router.get('/admin/testimonials/testimonials', auth, TestimonialsController.testimonials);
router.post('/inserttestimonials', auth, TestimonialsController.inserttestimonials);
router.get('/testview/:id', auth, TestimonialsController.testview);
router.get('/testedit/:id', auth, TestimonialsController.testedit);
router.post('/testupdate/:id', auth, TestimonialsController.testupdate);
router.get('/testdelete/:id', auth, TestimonialsController.testdelete);
module.exports = router;