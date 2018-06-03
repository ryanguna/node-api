const express = require('express');
const router =  express.Router();
/**
 * GET (/products)
 * Display a listing of the resource.
 * @return Response
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'GET PRODUCTS! Request /products'
    })
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
    const product = {
      name : req.body.name,
      price : req.body.price
    };

    res.status(201).json({
        message : 'POST Request /products',
        product : product.name,
        price :  product.price
    })
});
/**
 * GET (/products/{id})
 * Display the specified resource.
 * @param  int  $id
 * @return Response
 */
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message : 'GET Request /products/req.params.id',
        id : req.params.id
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

    const id = req.params.id;

    res.status(200).json({
        message : 'PATCH Request /products' + req.params.id,
        id : req.params.id
    })
});
/**
 * DELETE (/products/{id})
 * Remove the specified resource from storage.
 * @param  int  $id
 * @return Response
 */
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message : 'DELETE Request /products' + req.params.id,
        id : req.params.id
    })
});


module.exports = router;