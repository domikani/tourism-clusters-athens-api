const updateHour = async (req, res) => {
    const posts = await Geo.find();
    for (let p = 0; p < posts.length; p++) {
        let hour = posts[p].properties.hourTaken;
        let newHour = hour.slice(0, -3);
        const hours = await Geo.updateMany(
            {"properties.hourTaken": hour},
            {"properties.hourTaken": newHour}
        );
        console.log(`Features updated for country ${newHour}`);
    }

    console.log("Update finished");

    return res.json({
        type: "FeatureCollection",
        features: "Updated"
    });
};

module.exports = {
    updateHour
};
