const helpers = require("../helpers");

//update the owners location field with a country from the country list using regex function
const update = async (req, res) => {
    //create an array with regular expression of the countries to update the ownerLocation field
    const countries = helpers.countryList;
    const regex = [];
    for (let c = 0; c < countries.length; c++) {
        regex[c] = new RegExp(countries[c], "i"); //make the expression case insensitive
    }

    //First update-- Update the ownerLocations fields
    for (let r = 0; r < regex.length; r++) {
        let str = regex[r];
        let regexToString = str.toString();
        let countryName = regexToString.slice(1, -2); //remove the regular expression symbols from the string to acquire only the country name
        await Geo.updateMany(
            {"properties.ownerLocation": {$regex: regex[r]}},
            {"properties.ownerLocation": countryName}
        );
    }

    const posts = await Geo.find();
    const ownerCountry = [];
    const unknownLocations = [];
    for (let p = 0; p < posts.length; p++) {
        ownerCountry.push(posts[p].properties.ownerLocation);
    }

    for (let c = 0; c < ownerCountry.length; c++) {
        if (countries.indexOf(ownerCountry[c]) === -1) {
            unknownLocations.push(ownerCountry[c]);
        }
    }

    await Geo.bulkWrite([{
        updateMany: {
            "filter": {$or: [{"properties.ownerLocation": "UK"}, {"properties.ownerLocation": "England"}]},
            "update": {"properties.ownerLocation": "United Kingdom"}
        }
    }]);


//Second update to
    /*for (let u = 0; u < unknownLocations.length; u++)
        await Geo.updateMany(
            {"properties.ownerLocation": unknownLocations[u]},
            {"properties.ownerLocation": "unknown country name"}
        )
    }*/


    return res.json({
        type: "FeatureCollection",
        features: unknownLocations
    });
};

module.exports = {
    update
};
