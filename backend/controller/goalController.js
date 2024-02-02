const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalMoldel')

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find()
    res.json(goals)
})

const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a textfield')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.json(updatedGoal)
})


const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.deleteOne({_id : req.params.id})

    res.json({ id:req.params.id })
})

const getSpecificGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not Found')
    }
    res.json(goal)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoal,
    getSpecificGoal
}