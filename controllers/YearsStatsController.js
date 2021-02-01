const yearStats = async (req, res) => {
    const results = await Statistic.aggregate([
        {
            $group: {
                _id: {
                    cluster: "$properties.cluster_id",
                    year: "$properties.year",
                },
                count: {$sum: 1}
            }
        },
        {
            $sort: {'_id.year': 1}
        },
        {
            $group: {
                _id: "$_id.cluster",
                data: {
                    $push: {
                        year: "$_id.year",
                        total: "$count"
                    }
                },

            },
        },
        {
            $sort: {_id: 1}
        },


    ]);


    return res.json({
        type: "FeatureCollection",
        features: results
    });
};


module.exports = {
    yearStats
};
