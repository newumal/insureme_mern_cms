const asyncHandler = require('express-async-handler')
const GoalModel = require("../model/GoalModel")
const User = require("../model/UserModel")
/*
 @desc set goal
 @route GET api/goals
 @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
    const getData = await GoalModel.find({ user: req.user.id })
    res.status(200).json(getData)
})

/*
 @desc create
 @route POST api/goals
 @access Private
 */
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.name && !req.body.desc){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await GoalModel.create({
        name: req.body.name,
        desc: req.body.desc,
        user: req.user.id
    })
    res.status(200).json({msg: `create a goal ${goal}` })
})

/*
 @desc update
 @route PUT api/goals/:id
 @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
    const currentGoal = await GoalModel.findById(req.params.id)
    if (!currentGoal){
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    //check user exits
    if (!user){
        res.status(401)
        throw new Error('User not exits')
    }

    // make sure the only logged user matches the goal user
    if (currentGoal.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized !')
    }

    const updatedGoal = await GoalModel.findByIdAndUpdate(req.params.id, req.body, { new : true})
    res.status(200).json(updatedGoal)
})

/*
 @desc delete goal
 @route DELETE api/goals/:id
 @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findById(req.params.id)
    if (!goal){
        throw new Error('goal is not found !')
    }
    const deleteGoal = await GoalModel.findByIdAndDelete(req.params.id, res.body)
    res.status(200).json({msg: `delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}