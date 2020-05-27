const rp = require("request-promise"); // einai i vivliothiki pou mou epitrepei na kanw requests


const index = async (req, res) => {
    const apiKey = process.env.FLICKR_APIKEY;
    const results = await  rp({
        uri: 'https://www.flickr.com/services/rest/',
        qs:{
            method: "flickr.photos.search",
            api_key: apiKey,
            min_taken_date: '2009-01-01',
            max_taken_date: '2019-12-31',
            bbox: "22.797318,40.471502,23.159866,40.723323",
            extras: "geo,date_taken",
            format: "json",
            nojsoncallback : 1
        }
    });

    return res.json(JSON.parse(results));
};

module.exports = {
    index
};
