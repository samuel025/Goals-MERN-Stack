const express = require('express')
const router = express.Router()
const {} = require('../controller/goalController')
const { getGoals, setGoal, updateGoals, deleteGoal, getSpecificGoal } = require('../controller/goalController')

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoals).delete(deleteGoal).get(getSpecificGoal)

module.exports = router