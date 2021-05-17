const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gatewaysSchema = new Schema({
    serial_number: {
        type: String,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    address_ip: {
        type: String,
        trim: true,
        validate: {
            validator: function(ip) {
                const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                const ipRegExp = new RegExp(ipPattern);
                return ip.match(ipRegExp);
            },
            message: props => `${props.value} is not a valid IP address`
        },
    },
    /*peripherals: [{
        type: Schema.Types.ObjectId,
        ref: 'Peripherals',
    }]*/
});

gatewaysSchema.virtual('peripherals', {
    ref: 'Peripherals',
    localField: '_id',
    foreignField: 'gateway',
});

gatewaysSchema.virtual('peripherals_count', {
    ref: 'Peripherals',
    localField: '_id',
    foreignField: 'gateway',
    count: true,
});

gatewaysSchema.set('toObject', { virtuals: true });
gatewaysSchema.set('toJSON', { virtuals: true });

/*function ValidateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
        return (true)  
    }  
    alert("You have entered an invalid IP address!")  
    return (false)  
}
*/
module.exports = mongoose.model('Gateways', gatewaysSchema);