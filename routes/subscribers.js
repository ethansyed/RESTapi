const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const mongoose = require('mongoose');

//Getting all subscribers
router.get('/', async (req,res) => {
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch{
        res.status(500).json({message: err.message})
    }
})
//Getting One sub
router.get('/:id', getSubscriber, (req,res) => {
    res.json(res.subscriber)
})
//Creating one sub
router.post('/', async (req,res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Updating one sub
router.patch('/:id', getSubscriber, async (req,res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Deleting One sub
router.delete('/:id', getSubscriber, async (req,res) => {
    try{
        await res.subscriber.remove()
        res.json({message: 'Deleted User'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getSubscriber(req, res, next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(mongoose.Types.ObjectId(req.params.id)) //if invalid id format then throws api error
        if(subscriber == null){
            return res.status(404).json({message: 'Cannot find Subscriber'})
        }
    }catch(err){
        //caught ill formatted subscriber id errors
        /*if(subscriber == undefined){
            return res.status(404).json({message: 'Not found/Not a valid id'})
        }*/
        console.log(subscriber)
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}
module.exports = router;