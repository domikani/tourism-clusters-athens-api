const helpers = require("../helpers");

const monthsStats = async (req, res) => {
    const posts = await Geo.find().exec();
    const monthsLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const labels = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const results2009 = [];
    const results2010 = [];
    const results2011 = [];
    const results2012 = [];
    const results2013 = [];
    const results2014 = [];
    const results2015 = [];
    const results2016 = [];
    const results2017 = [];
    const results2018 = [];
    const results2019 = [];

    const getResults = async (arr, year) => {
        for (let l = 0; l < labels.length; l++) {
            const num = await Geo.count({"properties.yearTaken": year, "properties.monthTaken": labels[l]});
            arr.push(num);
        }
    };
    await getResults(results2009, 2009);


    await res.json({
        success: true,
        chartData: [
            {
                label: '2009',
                data: results2009
            },
            {
                label: '2010',
                data: results2010
            },
            {
                label: '2011',
                data: results2011
            },
            {
                label: '2012',
                data: results2012
            },
            {
                label: '2013',
                data: results2013
            },
            {
                label: '2014',
                data: results2014
            },
            {
                label: '2015',
                data: results2015
            },
            {
                label: '2016',
                data: results2016
            },
            {
                label: '2017',
                data: results2017
            },
            {
                label: '2018',
                data: results2018
            },
            {
                label: '2019',
                data: results2019
            }
        ],
        labels: monthsLabels,


    });

};

module.exports = {
    monthsStats
};
