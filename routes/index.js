const express = require('express');

const router = express.Router();

const gatewaysController = require('../controllers/gatewaysController');
const peripheralsController = require('../controllers/peripheralsController');

module.exports = function(){
    /**
     * Gateways Routes
     */
    //get: /gateways
    router.get('/gateways', gatewaysController.list);
    //post: /gateways
    router.post('/gateways', gatewaysController.add);
    //get: /gateways/:id
    router.get('/gateways/:id', gatewaysController.show);
    //put: /gateways/:id
    router.put('/gateways/:id', gatewaysController.update);    
    //delete: /gateways/:id
    router.delete('/gateways/:id', gatewaysController.delete);

    
    /**
     * Peripherals Routes
     */
    //get: /peripherals
    router.get('/peripherals', peripheralsController.list);
    //post: /peripherals
    router.post('/peripherals', peripheralsController.add);
    //get: /peripherals/:id
    router.get('/peripherals/:id', peripheralsController.show);
    //put: /peripherals/:id
    router.put('/peripherals/:id', peripheralsController.update);    
    //delete: /peripherals/:id
    router.delete('/peripherals/:id', peripheralsController.delete);

    return router;
}