const rp = require("request-promise"); // einai i vivliothiki pou mou epitrepei na kanw requests


const index = async (req, res) => {
    //Request the data
    const apiKey = process.env.FLICKR_APIKEY;
    const photosRequest = await rp({
        uri: 'https://www.flickr.com/services/rest/',
        qs: {
            method: "flickr.photos.search",
            api_key: apiKey,
            min_taken_date: '2009-01-01',
            max_taken_date: '2019-12-31',
            bbox: "22.797318,40.471502,23.159866,40.723323",
            extras: "geo,date_taken",
            format: "json",
            nojsoncallback: 1

        }

    });

    //Store the data from the photos request to an array
    const photosData = JSON.parse(photosRequest);
    const results = [];
    results.push(photosData);

    //Store the photos ID to an array to made the second request
    const photosIDs = [];
    for (let i = 0; i < results[0].photos.photo.length; i++) {
        photosIDs.push(results[0].photos.photo[i].id);
    }

    /*console.log(photosIDs);*/

    const photoData = [];
    //Second request to retrieve the location and the image url
    for (let i = 0; i < photosIDs.length; i++) {
        const photo_url_request = await rp({
            uri: 'https://www.flickr.com/services/rest/',
            qs: {
                method: "flickr.photos.getInfo",
                api_key: apiKey,
                photo_id: photosIDs[i],
                format: "json",
                nojsoncallback: 1
            }
        });
        const extraData = JSON.parse(photo_url_request);
        photoData.push(extraData);
    }

    //Store in the results array new fields such as location and image url
    for (let i = 0; i < photoData.length; i++) {
        if (photoData[i].photo.id === results[0].photos.photo[i].id) {
            results[0].photos.photo[i].location = photoData[i].photo.owner.location;
            results[0].photos.photo[i].img = photoData[i].photo.urls.url[0]._content;
        }

    }

    //Save the data in compass
    for (let i = 0; i < results[0].photos.photo.length; i++) {
        const p = new Post({
            userID: results[0].photos.photo[i].owner,
            timestamp: results[0].photos.photo[i].datetaken,
            photo: results[0].photos.photo[i].img,
            latitude: results[0].photos.photo[i].latitude,
            longitude: results[0].photos.photo[i].longitude,
            ownerLocation: results[0].photos.photo[i].location,
        });
        p.save().then(() => {
            res.json({
                message: "Post created"
            });
        });

    }

    return res.json(results);
};


module.exports = {
    index,


};
