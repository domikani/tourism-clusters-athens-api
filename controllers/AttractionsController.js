const attractions = async (req, res) => {
    const topAttractions = await Attraction.find().exec();
    return res.json({
        type: "FeatureCollection",
        features: topAttractions
    });
};


module.exports = {
    attractions
};
