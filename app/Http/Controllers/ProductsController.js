const express = require('express');
const router =  express.Router();
const Product = require('../../Models/Product');
const productTranformer = require('../../Models/transformers/ProductTranformer');
const mongoose = require('mongoose');

/**
 * GET (/products)
 * Display a listing of the resource.
 * @return Response
 */
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            res.status(200).json(productTranformer.getAllResponse(docs))
         })
        .catch(err => {
            res.status(500).json(err);
         });
});
/**
 * GET (/products/create)
 * Show the form for creating a new resource.
 * @return Response
 */
router.get('/create', (req, res, next) => {
    res.status(200).json({
        message : 'GET Request /products/create'
    })
});
/**
 * POST (/products)
 * Store a newly created resource in storage.
 * @param  request
 * @return Response
 */
router.post('/', (req, res, next) => {

    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });

    product.save().then(result => {
        console.log('Created to database', result);
        res.status(201).json(productTranformer.postResponse(result))
    })
    .catch(err => {
        res.status(500).json(err)
    });


});
/**
 * GET (/products/{id})
 * Display the specified resource.
 * @param  int  $id
 * @return Response
 */
router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .exec()
        .then(doc => {
            console.log('From database', doc);
            if(doc){
                res.status(200).json(productTranformer.getSingleResponse(doc));
            }else{
                res.status(404).json({message : 'No entry found'});
            }
        }).catch(err => {
           console.log(err);
           res.status(500).json(err);
        })
});
/**
 * PATCH (/products/{id})
 *
 * Update the specified resource in storage.
 * @param  $request
 * @param  int  $id

 */
router.patch('/:id', (req, res, next) => {
    const updateOps = {};
    //check whats in the request body
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id : req.params.id}, {$set : updateOps})
        .exec()
        .then(result => res.status(200).json(productTranformer.getUpdatedResponse(result, req.params.id)))
        .catch(err => res.status(500).json(err))
});
/**
 * DELETE (/products/{id})
 * Remove the specified resource from storage.
 * @param  int  $id
 * @return Response
 */
router.delete('/:id', (req, res, next) => {
    Product.findOneAndRemove({_id : req.params.id})
        .exec()
        .then(result => {
            res.status(200).json(productTranformer.getDeletedResponse())
        }).catch(err => {
            res.status(500).json(err)
        })
});


module.exports = router;