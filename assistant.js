//Grab provided args
const [,, ...args] = process.argv;
const fs = require('fs');

let checkListOfDirectories = ['/app', 'app/Http', 'app/Http/Controllers', 'app/Models/Check'];

//Map through the list of directories
checkListOfDirectories.map(value => {

    //Check if the directory exists
    if(fs.existsSync(`${__dirname}/${value}`)){
        console.log(`Directory ${value} already exists`);
    }else{
        //Create directory if not exists
        console.log(`Creating directory ${value}`);
        // fs.mkdirSync(`${__dirname}/${value}`);
    }
});


console.log(`Checking arguments ${args} ${__dirname}`);

if(args[0] == 'make:controller'){
    createController(args[1], args[2]);
}

// else if(args[0] == 'make:model'){
//
// }



function createController(name, route){

fs.writeFile(`${__dirname}/app/Http/Controllers/${name}.js`, `
const express = require('express');
const router =  express.Router();
/**
 * GET (/${route.toLowerCase()})
 * Display a listing of the resource.
 * @return Response
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'GET Request /${route.toLowerCase()}'
    })
});
/**
 * GET (/${route.toLowerCase()}/create)
 * Show the form for creating a new resource.
 * @return Response
 */
router.get('/create', (req, res, next) => {
    res.status(200).json({
        message : 'GET Request /${route.toLowerCase()}/create'
    })
});
/**
 * POST (/${route.toLowerCase()})
 * Store a newly created resource in storage.
 * @param  request
 * @return Response
 */
router.post('/', (req, res, next) => {
    res.status(201).json({
        message : 'POST Request /${route.toLowerCase()}'
    })
});
/**
 * GET (/${route.toLowerCase()}/{id})
 * Display the specified resource.
 * @param  int  $id
 * @return Response
 */
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message : 'GET Request /${route.toLowerCase()}/{id}',
        id : req.params.id
    })
});
/**
 * PATCH (/${route.toLowerCase()}/{id})
 *
 * Update the specified resource in storage.
 * @param  $request
 * @param  int  $id

 */
router.patch('/:id', (req, res, next) => {

    const id = req.params.id;

    res.status(200).json({
        message : 'PATCH Request /${route.toLowerCase()}',
        id : req.params.id
    })
});
/**
 * DELETE (/${route.toLowerCase()}/{id})
 * Remove the specified resource from storage.
 * @param  int  $id
 * @return Response
 */
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message : 'DELETE Request /${route.toLowerCase()}',
        id : req.params.id
    })
});
module.exports = router;`
    , function (err) {
        if (err)
            return console.log(err);
        console.log(`Controller ${name} Successfully Created!`);
    });
}

