const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const geoSchema = mongoose.Schema({
    type: String,
    properties: {
        userID: String,
        ownerLocation: String,
        photo: {
            type: String,
            required: true,
            unique: true
        },
        yearTaken: String,
        monthTaken: String,
        dayTaken: String,
        hourTaken: String,
        id: mongoose.Types.ObjectId
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const attractionSchema = mongoose.Schema({
    type: String,
    properties: {
        name: String,
        category: String,
        img: String,
        source: String,
        sourceName: String
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});

const clusterSchema = mongoose.Schema({
    type: String,
    properties: {
        cluster_id: Number,
        frequency: Number,
        area: Number
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});

global.Geo = mongoose.model("Geo", geoSchema);
global.Attraction = mongoose.model("Attraction", attractionSchema);
global.Cluster = mongoose.model("Cluster", clusterSchema);
