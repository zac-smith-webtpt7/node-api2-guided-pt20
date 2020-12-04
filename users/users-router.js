const router = require('express').Router()
const users = require('./users-model')

router.get('/users', (req, res) => {
  users
    .find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error retrieving the users',
      })
    })
})

router.get('/users/:id', (req, res) => {
  users
    .findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: 'User not found',
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error retrieving the user',
      })
    })
})

router.post('/users', (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: 'Missing user name or email',
    })
  }

  users
    .add(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error adding the user',
      })
    })
})

router.put('/users/:id', (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: 'Missing user name or email',
    })
  }

  users
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: 'The user could not be found',
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error updating the user',
      })
    })
})

router.delete('/users/:id', (req, res) => {
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'The user has been nuked',
        })
      } else {
        res.status(404).json({
          message: 'The user could not be found',
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error removing the user',
      })
    })
})

// create endpoint that returns all the posts for a user
// create endpoint that returns a single post for a user
// create endpoint for adding a new post for a user

module.exports = router
