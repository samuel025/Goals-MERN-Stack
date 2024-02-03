const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoals, deleteGoal, getSpecificGoal } = require('../controller/goalController');
const { protect } = require('../middleware/authmiddleware');

router.route('/').get(protect, getGoals).post(protect, setGoal);

router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoal).get(getSpecificGoal);

module.exports = router;