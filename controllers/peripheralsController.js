const Peripherals = require('../models/Peripherals');

//List all Peripherals
exports.list = async(req, res) => {
    try {
        const peripherals = await Peripherals.find({})
         .populate('gateway');
        res.json(peripherals);
    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
        next();
    }
};

//Add Peripheral
exports.add = async(req, res, next) => {
    try {
        const peripheral = new Peripherals(req.body);
        await peripheral.save();

        res.json({
            message: 'New Peripheral Added!'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
    }
};

//Read Peripheral by Id
exports.show = async(req, res, next) => {
    try {
        const peripheral = await Peripherals.findById(req.params.id)
         .populate('gateway');

        if(!peripheral){
            res.status(404).json({
                message: 'Peripheral does not exist!'
            });
            next();
        }

        res.json(peripheral);

    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
    }
};

//Update Peripheral
exports.update = async(req, res, next) => {
    try {
        const peripheral = await Peripherals.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        );

        res.json({
            message: 'Peripheral successfully updated!'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
    }
};

//Delete Peripheral
exports.delete = async(req, res, next) => {
    try {
        await Peripherals.findByIdAndDelete(
            {_id: req.params.id}
        );

        res.json({
            message: 'Peripheral successfully deleted!'
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error processing request'
        });
    }
};