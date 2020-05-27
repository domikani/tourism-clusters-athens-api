const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

global.Post = mongoose.model("Post", {
    timestamp: Date,
    ownerLocation: String,
    photo: String,
    latitude:Number,
    longitude:Number,
    visionData: String
});

