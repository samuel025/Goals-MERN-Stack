const express = require('express')
const router = express.Router()
const {} = require('../controller/goalController')
const { getGoals, setGoal, updateGoals, deleteGoal } = require('../controller/goalController')

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoals).delete(deleteGoal)

module.exports = router