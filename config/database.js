const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const postSchema = mongoose.Schema({
    timestamp: Date,
    userID: String,
    ownerLocation: String,
    photo: {
        type: String,
        required: true,
        unique: true
    },
    latitude:Number,
    longitude:Number,
    visionData: String
});
global.Post = mongoose.model("Post", postSchema);

