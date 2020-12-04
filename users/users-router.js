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
router.get('/users/:id/posts', (req, res) => {
  users
    .findUserPosts(req.params.id)
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'could not get user posts',
      })
    })
})
// create endpoint that returns a single post for a user
router.get('/users/:id/posts/:post_id', (req, res) => {
  users
    .findUserPostById(req.params.id, req.params.post_id)
    .then((post) => {
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({
          message: 'post was not found',
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'cound not get user post',
      })
    })
})
// create endpoint for adding a new post for a user
router.post('/users/:id/posts', (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: 'need a text value',
    })
  }
  users
    .addUserPost(req.params.id, req.body)
    .then((newPost) => {
      res.status(201).json(newPost)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'could not create post',
      })
    })
})

module.exports = router
