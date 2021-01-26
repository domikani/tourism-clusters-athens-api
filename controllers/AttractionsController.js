const attractions = async (req, res) => {
    const topAttractions = await Attraction.find().exec();


    await res.json({
        success: true,
        type: "FeFeatureCollection",
        features: topAttractions
    });
};


module.exports = {
    attractions
};
