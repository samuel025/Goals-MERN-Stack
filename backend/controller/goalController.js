const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalMoldel')
const User = require('../models/userModel')


const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user : req.user.id})
    res.json(goals)
})

const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a textfield')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    //check for user
    const user = await User.findById(req.user.id)
    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorised')
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


    if (!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorised')
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