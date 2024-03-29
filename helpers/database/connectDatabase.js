const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex: true, })
        .then(() => {
            console.log("MongoDB Connection");
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = connectDatabase;