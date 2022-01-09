const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanDB',(err)=>{
    if(!err)
        console.log('DB connection successful.');
    else  
        console.log('DB connection unsuccessful.' + err);  

});

module.exports = mongoose;