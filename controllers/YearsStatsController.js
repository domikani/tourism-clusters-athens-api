const helpers = require("../helpers");
const yearStats = async (req, res) => {
    const posts = await Geo.find().exec();
    const labels = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"];
    const results = [];

    for (let l = 0; l < labels.length; l++) {
        const num = await Geo.countDocuments({"properties.yearTaken": labels[l]});
        results.push(num);
    }
    await res.json({
        success: true,
        chartData: [
            {
                label: 'Photos taken between 2009 and 2019',
                data: results
            },


        ],
        labels: labels,


    });
};


module.exports = {
    yearStats
};
