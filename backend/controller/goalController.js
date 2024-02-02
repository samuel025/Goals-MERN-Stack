const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async(req, res) => {
    res.send('Get goals')
})

const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a textfield')
    }
    res.status(200).json({message: 'Set goal'})
})

const updateGoals = asyncHandler(async(req, res) => {
    res.send(`Update goal ${req.params.id}`)
})


const deleteGoal = asyncHandler(async(req, res) => {
    res.send(`Delete goal ${req.params.id}`)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoal
}