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
        console.log(`Features updated for country ${countryName}`);
    }

    await Geo.bulkWrite([
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": " "},
                        {"properties.ownerLocation": null},
                        {"properties.ownerLocation": "unknown country name"}

                    ]
                },
                "update": {"properties.ownerLocation": "unknown country name"}
            },
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "UK"},
                        {"properties.ownerLocation": "England"},
                        {"properties.ownerLocation": "Glasgow, Scotland"},
                        {"properties.ownerLocation": "Scotland"},
                        {"properties.ownerLocation": "Cambridge"},
                        {"properties.ownerLocation": "Southampton, U.K."},
                        {"properties.ownerLocation": "Birmingham"},
                        {"properties.ownerLocation": "Southampton"},
                        {"properties.ownerLocation": "London"},
                        {"properties.ownerLocation": "Croydon"},
                        {"properties.ownerLocation": "Wales"},
                    ]
                },
                "update": {"properties.ownerLocation": "United Kingdom"}
            },
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Piraeus, Grecia"},
                        {"properties.ownerLocation": "Thessaloniki"},
                        {"properties.ownerLocation": "Athens"},
                        {"properties.ownerLocation": "Ελλάδα"},
                        {"properties.ownerLocation": "Athens, Hellas"},
                    ]
                },
                "update": {"properties.ownerLocation": "Greece"}
            }
        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Wien (Vienna), AT"
                },
                "update": {"properties.ownerLocation": "Austria"}
            }

        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Mons, Belgique"},
                        {"properties.ownerLocation": "GENT, belgie"},
                        {"properties.ownerLocation": "Brussels, Belgio"},
                        {"properties.ownerLocation": "Brussels"},
                        {"properties.ownerLocation": "Bruxelles"},
                    ]
                },
                "update": {"properties.ownerLocation": "Belgium"}
            }
        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Ottawa"
                },
                "update": {"properties.ownerLocation": "Canada"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Copenhagen"
                },
                "update": {"properties.ownerLocation": "Denmark"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Quarry Bay"
                },
                "update": {"properties.ownerLocation": "Hong Kong"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Seoul"
                },
                "update": {"properties.ownerLocation": "Korea"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "México"
                },
                "update": {"properties.ownerLocation": "Mexico"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Brasil"
                },
                "update": {"properties.ownerLocation": "Brazil"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Tánger, Marruecos"
                },
                "update": {"properties.ownerLocation": "Morocco"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Oslo, Norge"
                },
                "update": {"properties.ownerLocation": "Norway"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Vers Chiang Mai, Thaïlande"
                },
                "update": {"properties.ownerLocation": "Thailand"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Tunis"
                },
                "update": {"properties.ownerLocation": "Tunisia"}
            }

        },
        {
            updateMany: {
                "filter": {
                    "properties.ownerLocation": "Dubai, UAE"
                },
                "update": {"properties.ownerLocation": "United Arab Emirates"}
            }

        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Czech Republic"},
                        {"properties.ownerLocation": "prague, Czech republic"},
                    ]
                },
                "update": {"properties.ownerLocation": "Czech Republic"}
            }
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Paris"},
                        {"properties.ownerLocation": "Poey de Lescar"},
                        {"properties.ownerLocation": "Bastia, Corsica"},
                    ]
                },
                "update": {"properties.ownerLocation": "France"}
            }
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Bavaria"},
                        {"properties.ownerLocation": "Deutschland"},
                        {"properties.ownerLocation": "Gütersloh"},
                        {"properties.ownerLocation": "Berlin"}
                    ]
                },
                "update": {"properties.ownerLocation": "Germany"}
            }
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Italia"},
                        {"properties.ownerLocation": "Alessandria"},
                        {"properties.ownerLocation": "Catania"},
                        {"properties.ownerLocation": "Venice"}
                    ]
                },
                "update": {"properties.ownerLocation": "Italy"}
            }
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Leiden, Holland"},
                        {"properties.ownerLocation": "Amsterdam, Nederland"},
                        {"properties.ownerLocation": "s-Hertogenbosch, Nederland"},
                        {"properties.ownerLocation": "Rotterdam"}
                    ]
                },
                "update": {"properties.ownerLocation": "Netherlands"}
            }
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "España"},
                        {"properties.ownerLocation": "Tarifa"},
                        {"properties.ownerLocation": "Barcelona"},
                    ]
                },
                "update": {"properties.ownerLocation": "Spain"}
            }
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "Cheseaux, Швейцария"},
                        {"properties.ownerLocation": "Rebstein, Rheintal"},
                        {"properties.ownerLocation": "Schweiz"},
                    ]
                },
                "update": {"properties.ownerLocation": "Switzerland"}
            }
        },
        {
            updateMany: {
                "filter": {
                    $or: [
                        {"properties.ownerLocation": "United States"},
                        {"properties.ownerLocation": "Berkeley, CA"},
                        {"properties.ownerLocation": "Las Vegas, U.S.A."},
                        {"properties.ownerLocation": "Concord, NC"},
                        {"properties.ownerLocation": "Port Wing, WI"},
                        {"properties.ownerLocation": "Somerville, MA"},
                        {"properties.ownerLocation": "Daly City, CA, US"},
                        {"properties.ownerLocation": "Sunnyvale, US"},
                        {"properties.ownerLocation": "chicago"},
                        {"properties.ownerLocation": "Baltimore"},
                        {"properties.ownerLocation": "Fremont, California"},
                        {"properties.ownerLocation": "US"},
                        {"properties.ownerLocation": "Los Angeles"},
                        {"properties.ownerLocation": "St. Paul, MInnesota"},
                        {"properties.ownerLocation": "New York City"},
                        {"properties.ownerLocation": "Denver, CO"},
                        {"properties.ownerLocation": "Brooklyn"},
                        {"properties.ownerLocation": "Weehawken, NJ"},
                        {"properties.ownerLocation": "Tarrytown, New York"},
                        {"properties.ownerLocation": "NYC, Terra, Sol, Milky Way"},
                        {"properties.ownerLocation": "Carmel, IN, US"},
                        {"properties.ownerLocation": "Cincinnati, OH"},
                        {"properties.ownerLocation": "Washington, D.C."},
                        {"properties.ownerLocation": "Washington, DC"},
                        {"properties.ownerLocation": "Largo, FL, US"},
                        {"properties.ownerLocation": "San Francisco, CA, US"},
                        {"properties.ownerLocation": "Oak Hill, VA, U.S.A."},
                        {"properties.ownerLocation": "Grand Rapids, MI, US"},
                        {"properties.ownerLocation": "Lompoc"},
                        {"properties.ownerLocation": "San Mateo, CA"},
                        {"properties.ownerLocation": "Austin Texas, United State of America"},
                        {"properties.ownerLocation": "Las Vegas, U.S.A."},
                    ]
                },
                "update": {"properties.ownerLocation": "USA"}
            }
        },
    ]);

    //Second update to update the fields with unknown origin names, null and ""
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


    for (let u = 0; u < unknownLocations.length; u++) {
        await Geo.updateMany(
            {"properties.ownerLocation": unknownLocations[u]},
            {"properties.ownerLocation": "unknown country name"}
        );
        console.log(`Update for ${unknownLocations[u]}`)
    }

    console.log("UPDATE DONE");


    return res.json({
        type: "FeatureCollection",
        features: "OK"
    });
};

module.exports = {
    update
};
