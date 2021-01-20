const attractions = async (req, res) => {
    const topAttractions = await Attraction.find().exec();


    await res.json({
        success: true,
        data: topAttractions
    });
};


module.exports = {
    attractions
};
