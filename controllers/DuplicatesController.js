const duplicates = async (req, res) => {
    const results = await Geo.aggregate([
        {
            $group: {
                _id: "$properties.userID",
                country: {$first: "$properties.ownerLocation"},
                year: {$first: "$properties.yearTaken"},
                day: {$first: "$properties.dayTaken"},
                month: {$first: "$properties.monthTaken"},
                /* hour: {$addToSet: "$properties.hourTaken"},*/
                allLoc: {$addToSet: "$geometry.coordinates"}
            }
        },
        {$unwind: {path: "$allLoc", preserveNullAndEmptyArrays: true}},
        {
            $project: {
                "_id": 0,
                "lng": {$arrayElemAt: ["$allLoc", 0]},
                "lat": {$arrayElemAt: ["$allLoc", 1]},
                "userID": "$_id",
                "country": "$country",
                "year": "$year",
                "month": "$month",
                "day": "$day",
                "hour": "$hour",

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
