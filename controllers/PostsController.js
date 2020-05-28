const rp = require("request-promise"); // einai i vivliothiki pou mou epitrepei na kanw requests


const index = async (req, res) => {
    const apiKey = process.env.FLICKR_APIKEY;
    const results = await rp({
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

    const data = JSON.parse(results);
    const table = [];
    table.push(data.photos.photo);

    for (let i = 0; i < table[0].length; i++) {
        const p = new Post({
            timestamp: table[0][i].datetaken,
            photo: table[0][i].id,
            latitude: table[0][i].latitude,
            longitude: table[0][i].longitude
        });
        p.save().then(() => {
            res.json({
                message: "Post created"
            });
        });

    }


    return res.json(data);


};


module.exports = {
    index

};
