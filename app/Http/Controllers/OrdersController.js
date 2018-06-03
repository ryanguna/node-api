const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Order = require('../../Models/Orders');


/**
 * GET (/orders)
 * Display a listing of the resource.
 * @return Response
 */
router.get('/', (req, res, next) => {
    Order.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
/**
 * GET (/orders/create)
 * Show the form for creating a new resource.
 * @return Response
 */
router.get('/create', (req, res, next) => {
    res.status(200).json({
        message : 'GET Request /orders/create'
    })
});
/**
 * POST (/orders)
 * Store a newly created resource in storage.
 * @param  request
 * @return Response
 */
router.post('/', (req, res, next) => {
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        product : req.body.productId
    });
        order.save().then(result => {
            console.log('Created to database', result);
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});
/**
 * GET (/orders/{id})
 * Display the specified resource.
 * @param  int  $id
 * @return Response
 */
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message : 'GET Request /orders',
        id : req.params.id
    })
});
/**
 * PATCH (/orders/{id})
 *
 * Update the specified resource in storage.
 * @param  $request
 * @param  int  $id

 */
router.patch('/:id', (req, res, next) => {

    const id = req.params.id;

    res.status(200).json({
        message : 'PATCH Request /orders',
        id : req.params.id
    })
});
/**
 * DELETE (/orders/{id})
 * Remove the specified resource from storage.
 * @param  int  $id
 * @return Response
 */
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message : 'DELETE Request /orders',
        id : req.params.id
    })
});
module.exports = router;