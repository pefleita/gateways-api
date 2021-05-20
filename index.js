const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');

const routes = require('./routes');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb://pedro:amVFrj1Q7jeD1N81@SG-Gateways-44211.servers.mongodirector.com:27017/gateways-api',
    //'mongodb://localhost/gateways-api',
    {
        useNewUrlParser: true,
    }
)
.then(db => console.log('DB conextion success'))
.catch(error => console.log(error));

//Set Up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Set up cors
app.use(cors());


app.use('/', routes());

app.listen(5000, function(){
    console.log('Express Web Server Online');
});