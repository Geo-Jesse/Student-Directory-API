var express = require('express');
var router = express.Router();
var Student = require('../models/Student')
const _ = require('lodash');

router.use(function (req, res, next) {
  req.body = _.pick(req.body, ['firstName', 'lastName', 'salary', 'bonusPoints'])
  next()
})

//GET
router.get('/', function(req, res, next) {
  Student.find({}, function(err, students) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(students)
    }
  })
});

//POST
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

router.get('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) {
      res.status(500).send()
    } else {
      if (student) {
        res.json(student)
      } else {
        res.status(404).send()
      }
    }
  })
})

module.exports = router;
