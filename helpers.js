//Request function to get the posts from flickr
const rp = require("request-promise");
const firstRequest = async (key, array, request, pages, year, monthA, dayA, monthB, dayB) => {
    for (let p = 1; p < pages; p++) {
        const request = await rp({

            uri: 'https://www.flickr.com/services/rest/',
            qs: {
                method: "flickr.photos.search",
                api_key: key,
                min_taken_date: `${year}-${monthA}-${dayA}`,
                max_taken_date: `${year}-${monthB}-${dayB}`,
                bbox: "22.797318,40.471502,23.159866,40.723323",
                extras: "geo,date_taken",
                format: "json",
                nojsoncallback: 1,
                page: p
            }
        });
        //Store the data from the photos request to an array
        const postsData = JSON.parse(request);
        array.push(postsData);
    }
    return array
};

//Split the PhotoIDs table with chunk method and Create the second request to get the location of the photo-owner and the image url
const _ = require("lodash");

async function requestChunk(arrayPhotoData, arrayPhotosIDs, key) {
    console.time("Get extra data for posts");
    const chunksPhotoIDs = _.chunk(arrayPhotosIDs, 100);
    for (const chunk of chunksPhotoIDs) {
        const secondRequests = [];
        for (const photoID of chunk) {
            const photo_url_request = await rp({
                uri: 'https://www.flickr.com/services/rest/',
                qs: {
                    method: "flickr.photos.getInfo",
                    api_key: key,
                    photo_id: photoID,
                    format: "json",
                    nojsoncallback: 1
                }
            });
            secondRequests.push(photo_url_request);
            const extraData = JSON.parse(photo_url_request);
            arrayPhotoData.push(extraData);
        }
        await Promise.all(secondRequests);
        console.log(chunk.length, " extra data acquired");
    }
    console.timeEnd("Get extra data for posts");
}

// Splitter function to split the timestamp
const splitter = (str) => {

    const firstSplit = str.split(' ');
    const dateSplit = firstSplit[0].split('-');

    return {
        year: dateSplit[0],
        month: dateSplit[1],
        day: dateSplit[2],
        hour: firstSplit[1]
    };

};


module.exports =
    {
        firstRequest,
        requestChunk,
        splitter

    };


