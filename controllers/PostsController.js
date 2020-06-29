/*const rp = require("request-promise"); // einai i vivliothiki pou mou epitrepei na kanw requests*/
const _ = require("lodash");
const helpers = require("../helpers");


const index = async (req, res) => {
//Request the data
    const apiKey = process.env.FLICKR_APIKEY;
    const requestData = [];
    await helpers.firstRequest(apiKey, requestData, "request2009", 17, 2009, 0o1, 0o1, 12, 31);


    /*await getResults("request2010A", 12, 2010, 0o1, 0o1, 0o6, 30);*/
    /*await getResults("request2010B", 11, 2010, 0o6, 30, 12, 31);
    await getResults("request2012A", 13, 2012, 0o1, 0o1, 0o6, 30);
    await getResults("request2012B", 14, 2012, 0o6, 30, 12, 31);
    await getResults("request2013A", 17, 2013, 0o1, 0O1, 0o6, 30);
    await getResults("request2013B", 15, 2013, 0o6, 30, 12, 31);
    await getResults("request2014", 13, 2014, 0o1, 0o1, 12, 31);
    await getResults("request2015", 15, 2015, 0o1, 0o1, 12, 31);
    await getResults("request2016A", 8, 2016, 0o1, 0o1, 0o6, 30);
    await getResults("request2016B", 13, 2016, 0o6, 30, 12, 31);
    await getResults("request2017", 15, 2017, 0o1, 0o1, 12, 31);
    await getResults("request2018A", 12, 2018, 0o1, 0o1, 0o6, 30);
    await getResults("request2018B", 13, 2018, 0o6, 30, 12, 31);
    await getResults("request2019", 10, 2019, 0o1, 0o1, 12, 31);*/


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
        results[r].img = photoData[r].photo.urls.url[0]._content;

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
                        id: req.body.id
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
