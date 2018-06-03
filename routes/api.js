/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the app.js
|
*/
const productRoutes = require('../app/Http/Controllers/ProductsController');
const orderRoutes = require('../app/Http/Controllers/OrdersController');

let routes = {
    '/products': productRoutes,
    '/orders'  : orderRoutes
};

module.exports = routes;

