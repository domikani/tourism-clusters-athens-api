const duplicates = async (req, res) => {
    const results = await Geo.aggregate([
        {
            $group: {
                _id: {
                    USER_ID: '$properties.userID',
                    LOCATION: '$geometry.coordinates'
                },
                count: {
                    "$sum": 1
                }

            }

        },
        {
            $match: {
                count: {"$gt": 1},
            }
        },
        {
            $group: {
                _id: "$_id.USER_ID",
                LOCATION_GROUP: {
                    $push: {
                        LOCATION: "$_id.LOCATION",
                        count: "$count"
                    }
                }
            }
        }

    ]);
    return res.json({
        type: "FeatureCollection",
        features: results
    });
};

module.exports = {
    duplicates
};
