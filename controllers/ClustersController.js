const clusters = async (req, res) => {
    const photoClusters = await Cluster.find().exec();


    await res.json({
        success: true,
        type: "FeFeatureCollection",
        features: photoClusters
    });
};


module.exports = {
    clusters
};
