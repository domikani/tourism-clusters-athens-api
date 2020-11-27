const cleanData = async (req, res) => {
    const deleteData = await Geo.deleteMany(

        {
            $or: [
                {"properties.ownerLocation": ""},
                {"properties.ownerLocation": null},
                {"properties.ownerLocation": "Greece"}
            ]
        });

    return res.json({
        features: deleteData
    });

};

module.exports = {
    cleanData
};
