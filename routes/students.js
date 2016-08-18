var express = require('express');
var router = express.Router();
var Student = require('../models/Student')
const _ = require('lodash');

router.use(function (req, res, next) {
  req.body = _.pick(req.body, ['firstName', 'lastName', 'salary', 'bonusPoints'])
  next()
})


router.get('/', function(req, res, next) {
  Student.find({}, function(err, students) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(students)
    }
  })
});

// '/' refers to "students"
router.post('/', function (req, res, next) {
  const student = new Student(req.body)
  student.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(student)
    }
  })
})


module.exports = router;
