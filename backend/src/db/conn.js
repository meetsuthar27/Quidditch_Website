const mongoose = require("mongoose");
const DB = "mongodb+srv://kalash:Kalash2911@cluster0.hjbixyw.mongodb.net/Registration?retryWrites=true&w=majority";
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection established!");
}).catch((err) => console.log(err));