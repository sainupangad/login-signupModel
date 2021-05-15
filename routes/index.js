var express = require('express');
var router = express.Router();
let userHelper = require('../helpers/user_helper')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', (req, res) => {
  userHelper.doSignup(req.body).then((data) => {
    let result = { data, loggeIn: true }

    req.session = result
    let fir = req.body
    


    res.render('res', fir)
  })
})

router.get('/login', (req, res) => {
  res.render('login', { layout: false })
})

router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    console.log(response.loginStatus)

    if (response.loginStatus) {


      //req.session.loggedIn = true
      //req.session.user = response.user

      


      let body = req.body
      
      
      console.log(body)
      // console.log(req.session.user)//
      res.render('res', body)
    } else {
      res.redirect('/login')
    }
  })
})

module.exports = router;
