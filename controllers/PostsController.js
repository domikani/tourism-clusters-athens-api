const _ = require("lodash");
const helpers = require("../helpers");
const dataset2009 = require("../datasetsForRequests/dataset2009");
const dataset2010 = require("../datasetsForRequests/dataset2010");
const dataset2011 = require("../datasetsForRequests/dataset2011");
const dataset2012 = require("../datasetsForRequests/dataset2012");
const dataset2013 = require("../datasetsForRequests/dataset2013");
const dataset2014 = require("../datasetsForRequests/dataset2014");
const dataset2015 = require("../datasetsForRequests/dataset2015");
const dataset2016 = require("../datasetsForRequests/dataset2016");
const dataset2017 = require("../datasetsForRequests/dataset2017");
const dataset2018 = require("../datasetsForRequests/dataset2018");
const dataset2019 = require("../datasetsForRequests/dataset2019");


const index = async (req, res) => {
//Request the data
    const apiKey = process.env.FLICKR_APIKEY;
    const requestData = [];

    //import the datasets
    const request2009 = dataset2009.dataset_2009;
    const request2010 = dataset2010.dataset_2010;
    const request2011 = dataset2011.dataset_2011;
    const request2012 = dataset2012.dataset_2012;
    const request2013 = dataset2013.dataset_2013;
    const request2014 = dataset2014.dataset_2014;
    const request2015 = dataset2015.dataset_2015;
    const request2016 = dataset2016.dataset_2016;
    const request2017 = dataset2017.dataset_2017;
    const request2018 = dataset2018.dataset_2018;
    const request2019 = dataset2019.dataset_2019;

    //create the call function
    const callReq = async (arrayDataset) => {
        for (let d = 0; d < arrayDataset.length; d++) {
            await helpers.firstRequest(apiKey, requestData, arrayDataset[d].pages, arrayDataset[d].year, arrayDataset[d].monthA, arrayDataset[d].dayA, arrayDataset[d].monthB, arrayDataset[d].dayB);
        }
    };

    //Call the requests for each year
    await callReq(request2009);
    await callReq(request2010);
    await callReq(request2011);
    await callReq(request2012);
    await callReq(request2013);
    await callReq(request2014);
    await callReq(request2015);
    await callReq(request2016);
    await callReq(request2017);
    await callReq(request2018);
    await callReq(request2019);

//store the requested data in a proper format
    const results = [];
    for (let rd = 0; rd < requestData.length; rd++) {
        for (let p = 0; p < requestData[rd].photos.photo.length; p++) {
            results.push(requestData[rd].photos.photo[p]);
        }
    }
    console.log("Original Posts stored");

//Store the photos ID to an array to make the second request
    const photosIDs = [];
    for (let r = 0; r < results.length; r++) {
        photosIDs.push(results[r].id);
    }

//Second request to get extra data for the posts
    const photoData = [];
    await helpers.requestChunk(photoData, photosIDs, apiKey);


// Insert extra fields to the results table such as img, location, date/time, and owner location
    for (let r = 0; r < results.length; r++) {

        results[r].location = [results[r].longitude, results[r].latitude];
        results[r].dateTime = helpers.splitter(results[r].datetaken);
        results[r].ownerLocation = photoData[r].photo.owner.location;

    }

    console.log("Posts updated with extra data");


//Save the data in compass
    console.time("create posts");
    const chunks = _.chunk(results, 250);
    for (const chunk of chunks) {
        for (const post of chunk) {
            try {
                const g = new Geo({
                    type: "Feature",
                    properties: {
                        photo: post.id,
                        userID: post.owner,
                        yearTaken: post.dateTime.year,
                        monthTaken: post.dateTime.month,
                        dayTaken: post.dateTime.day,
                        hourTaken: post.dateTime.hour,
                        id: req.body.id,
                        ownerLocation: post.ownerLocation
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: post.location

                    }
                });
                await g.save();
                console.log(`${g._id} has been created`);
            } catch (e) {
                console.log(`This post already exists`);
            }
        }
        console.log(chunk.length, " posts created");

    }
    console.timeEnd("create posts");
    await res.json("Posts created");

};

const list = async (req, res) => {
    const posts = await Geo.find().exec();

    return res.json({
        type: "FeatureCollection",
        features: posts
    });
};

module.exports = {
    index,
    list
};
