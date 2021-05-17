const Gateways = require('../models/Gateways');

//List all Gateways
exports.list = async(req, res) => {
    try {
        const gateways = await Gateways.find({})
         .populate({path: 'peripherals'})
         .populate({path: 'peripherals_count'});
        res.json(gateways);
    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
        next();
    }
};

//Add Gateway
exports.add = async(req, res) => {
    try {
        const gateway = new Gateways(req.body);
        await gateway.save();

        res.json({
            message: 'New Gateway Added!'
        });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(400).json({
                message: `A Gateway with SN: ${req.body.serial_number} already exists`
            });
        } else if (error.errors.address_ip) {
            res.status(400).json({
                message: `${req.body.address_ip} is not a valid IP address`
            });
        }else{
            res.status(400).json({
                message: 'Error processing request'
            });
        }
    }
};

//Read Gateway by Id
exports.show = async(req, res, next) => {
    try {
        const gateway = await Gateways.findById(req.params.id)
         .populate({path: 'peripherals'});

        if(!gateway){
            res.status(404).json({
                message: 'Gateway does not exist!'
            });
            next();
        }

        res.json(gateway);

    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
    }
};

//Update Gateway
exports.update = async(req, res, next) => {
    try {
        const gateway = await Gateways.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        );

        res.json({
            message: 'Gateway successfully updated!'
        });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(400).json({
                message: `A Gateway with IP: ${req.body.address_ip} already exists`
            });
        } else {
            res.status(400).json({
                message: 'Error processing request'
            });
        }
    }
};

//Delete Gateway
exports.delete = async(req, res, next) => {
    try {
        await Gateways.findByIdAndDelete(
            {_id: req.params.id}
        );

        res.json({
            message: 'Gateway successfully deleted!'
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
    }
};