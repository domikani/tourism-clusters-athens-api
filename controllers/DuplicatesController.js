const duplicates = async (req, res) => {
    const results = await Geo.aggregate([
        {
            $group: {
                _id: "$properties.userID",
                country: {$first: "$properties.ownerLocation"},
                year: {$first: "$properties.yearTaken"},
                day: {$first: "$properties.dayTaken"},
                month: {$first: "$properties.monthTaken"},
                hour: {$addToSet: "$properties.hourTaken"},
                allLoc: {$first: "$geometry.coordinates"}
            }
        },
        {$unwind: {path: "$hour", preserveNullAndEmptyArrays: true}},
        {
            $project: {
                "_id": 0,
                "geometry.coordinate": "$allLoc",
                "properties.userID": "$_id",
                "properties.country": "$country",
                "properties.year": "$year",
                "properties.month": "$month",
                "properties.day": "$day",
                "properties.hour": "$hour",

            }
        },
        {$out: "transformed"}

    ]);


    return res.json({
        type: "FeatureCollection",
        features: results
    });
};

module.exports = {
    duplicates
};
