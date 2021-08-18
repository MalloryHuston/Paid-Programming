var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Pair Programming',
    currentPage: 'Home',
    homeActive: true,
    sliderImages: [{
      src: "/images/pair-programming-guy-and-gal.jpg",
      alt: "Pair programming, guy and gal",
      active: true
    }, {
      src: "/images/pair-programming-guy-and-guy.png",
      alt: "Pair programming, guy and guy"
    }, {
      src: "/images/pair-programming-guy-and-cat.jpg",
      alt: "Pair programming, guy and cat"
    }]
  });
});

router.get('/rules', (req, res) => {
  res.render('rules', {
    currentPage: 'Rules',
    rulesActive: true
  });
});

router.get('/john-conway', (req, res) => {
  res.render('john-conway', {
    currentPage: 'John Conway',
    johnConwayActive: true
  });
});

router.get('/snippet', (req, res) => {
  res.render('snippet', {
    currentPage: 'Snippet',
    snippetActive: true
  });
});

router.get('/resources', (req, res) => {
  res.render('resources', {
    currentPage: 'Resources',
    resourcesActive: true
  });
});

router.get('/download/:directory/:fileName', (req, res) => {
  let {directory, fileName} = req.params;
  let download = path.join(__dirname, '..', 'public', directory, fileName);
  res.download(download, fileName);
});

module.exports = router;