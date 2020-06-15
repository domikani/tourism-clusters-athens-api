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

    function f(str) {

        const firstSplit = str.split(' ');
        const dateSplit = firstSplit[0].split('-');

        return {
            year: dateSplit[0],
            month: dateSplit[1],
            day: dateSplit[2],
            hour: firstSplit[1]
        };

    }

    //Store in the results array new fields such as location and image url
    for (let i = 0; i < photoData.length; i++) {
        if (photoData[i].photo.id === results[0].photos.photo[i].id) {
            results[0].photos.photo[i].ownerLocation = photoData[i].photo.owner.location;
            results[0].photos.photo[i].img = photoData[i].photo.urls.url[0]._content;
            results[0].photos.photo[i].location = [photoData[i].photo.location.longitude, photoData[i].photo.location.latitude];
            results[0].photos.photo[i].dateTime = f(photoData[i].photo.dates.taken);

        }
    }

    //Save the data in compass
    for (let i = 0; i < results[0].photos.photo.length; i++) {

        try {

            const p = new Post({

                userID: results[0].photos.photo[i].owner,
                photo: results[0].photos.photo[i].img,
                ownerLocation: results[0].photos.photo[i].ownerLocation,
                yearTaken: results[0].photos.photo[i].dateTime.year,
                monthTaken: results[0].photos.photo[i].dateTime.month,
                dayTaken: results[0].photos.photo[i].dateTime.day,
                hourTaken: results[0].photos.photo[i].dateTime.hour,
                id: req.body.id,
                geometry:
                    {
                        type: 'Point',
                        coordinates:
                        results[0].photos.photo[i].location


                    }
            });
            await p.save();
            console.log(p._id + " created");


        } catch (e) {
            console.log("Already exists");
        }
    }


};
const list = (req, res) => {
    Post.find({}, (err, posts) => {
        res.json(posts)
    })
};


module.exports = {
    index,
    list

};
