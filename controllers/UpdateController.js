const helpers = require("../helpers");

//update the owners location field with a country from the country list using regex function
const update = async (req, res) => {
    //create an array with regular expression of the countries to update the ownerLocation field
    const country = helpers.countryList;
    const regex = [];
    for (let c = 0; c < country.length; c++) {
        regex[c] = new RegExp(country[c], "i");
    }

    //update the fields
    const posts = await Geo.find();
    const results = [];
    for (let r = 0; r < regex.length; r++) {
        let str = regex[r];
        let res = str.toString();
        let sp = res.slice(1, -2);
        /*console.log(sp);*/
        const updateOrigin = await Geo.updateMany(
            {"properties.ownerLocation": {$regex: regex[r]}},
            {"properties.ownerLocation": sp}
        );
        results.push(updateOrigin);
    }

/*    for (let p = 0; p < posts.length; p++) {
        for (let c = 0; c < country.length; c++) {
            if (posts[p].properties.ownerLocation !== country[c]) {
                const test = await Geo.updateMany(
                    {"properties.ownerLocation":}
                )
            }
        }
    }*/

    return res.json({
        type: "FeatureCollection",
        features: "ok"
    });
};

module.exports = {
    update
};
