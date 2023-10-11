const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log('serving...')
    res.render('index', {title: "My express App", message: "MY EXPRESS APP HOMEPAGE"})
})


module.exports = router