const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');



router.post('/app', apiController.collectData);


router.get('/user', apiController.calculateStatistiques);


module.exports = router;
