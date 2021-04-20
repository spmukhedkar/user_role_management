const express = require('express')
const router = new express.Router()
const roleCtrl = require('../controllers/roles')
const { auth, adminAuth } = require('../middleware/auth')

//API Route for getAllRoles
router.get('/getAllRoles', auth, adminAuth, async (req, res) => {
  try {
    const roles = await roleCtrl.getAllRoles()
    const response = {
      count: roles.length,
      roles
    }
    res.status(200).send(response)
  } catch (e) {
    console.log({ Error: e })
    res.status(400).send(e)
  }
})

//API Route for createRole
router.post('/createRole', auth, adminAuth, async (req, res) => {
  try {
    const role = await roleCtrl.saveRole(req.body)
    res.status(201).send({
      message: 'Role Saved Successfully',
      user: role
    })
  } catch (e) {
    console.log({ Error: e })
    res.status(422).send(e)
  }
})

module.exports = router
