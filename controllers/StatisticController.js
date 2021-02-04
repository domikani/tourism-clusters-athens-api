const statistics = async (req, res) => {
    const statisticsClusters = await Statistic.find().exec();


    await res.json({
        success: true,
        type: "FeFeatureCollection",
        features: statisticsClusters
    });
};


module.exports = {
    statistics
};
