const countries = async (req, res) => {
    const countriesSum = await Geo.aggregate([
        {
            $group: {
                _id: "$properties.ownerLocation",
                count: {$sum: 1}
            }
        }

    ]);


    return res.json({
        type: "FeatureCollection",
        features: countriesSum
    });
};

module.exports = {
    countries
};
