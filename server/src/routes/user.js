const express = require('express')
const router = new express.Router()
const userCtrl = require('../controllers/user')
const { auth, adminAuth } = require('../middleware/auth')

// internal function
const displayUser = (user) => {
  const userObj = user.toObject()
  delete userObj.tokens
  delete userObj.password
  return userObj
}

//API Route for SignUp
router.post('/signup', async (req, res) => {
  try {
    const user = await userCtrl.saveUserLogin(req.body)
    res.status(201).send({
      message: 'User Saved Successfully',
      user: displayUser(user),
      token: user.tokens.slice(-1).pop().token
    })
  } catch (e) {
    console.log({ Error: e })
    res.status(422).send(e)
  }
})

//API Route for Signin
router.post('/signin', async (req, res) => {
  try {
    if (!(req.body.userName && req.body.password)) {
      res.status(401).send({
        message: 'Missing parameters'
      })
    } else {
      const user = await userCtrl.loginUser(
        req.body.userName,
        req.body.password
      )
      res.status(200).send({
        message: 'User sign in successfully',
        user: displayUser(user),
        token: user.tokens.slice(-1).pop().token
      })
    }
  } catch (e) {
    console.log({ Error: e })
    res.status(403).send({ error: e.message })
  }
})

//API Route for Signout
router.post('/signout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => {
      return t.token !== req.token
    })

    await userCtrl.saveUser(req.user)

    res.send({
      message: 'Signout Successful'
    })
  } catch (e) {
    console.log({ Error: e })
    res.status(401).send({ error: e.message })
  }
})

//API Route for getUsersByAuthType
router.get('/getUsersByAuthType', auth, adminAuth, async (req, res) => {
  try {
    const allUsers = await userCtrl.getUsersByAuthType(req.query.authType)
    const response = {
      count: allUsers.length,
      allUsers
    }
    res.status(200).send(response)
  } catch (e) {
    console.log({ Error: e })
    res.status(400).send({ error: e.message })
  }
})

//API Route for changeAuthorizeStatus
router.post('/changeAuthorizeStatus', auth, adminAuth, async (req, res) => {
  try {
    if (!(req.body.authorize && req.body.userId)) {
      res.status(401).send({
        message: 'Missing parameters'
      })
    } else {
      await userCtrl.changeAuthStatus(req.body.userId, req.body.authorize)
      res.status(200).send({
        message: 'authorize status is changed successfully'
      })
    }
  } catch (e) {
    console.log({ Error: e })
    res.status(401).send({ error: e.message })
  }
})

module.exports = router
