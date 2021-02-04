const yearStats = async (req, res) => {
    const results = await Statistic.aggregate([
        {
            $facet: {
                'TotalCount': [
                    {
                        $group: {
                            _id: {
                                cluster: "$properties.cluster_id",
                            },
                            count: {$sum: 1}
                        },
                    },
                    {
                        $group: {
                            _id: "$_id.cluster",
                            data: {
                                $push: '$count'
                            }
                        },

                    },
                    {
                        $sort: {_id: 1}
                    },
                ],
                'Yearly': [
                    {
                        $group: {
                            _id: {
                                cluster: "$properties.cluster_id",
                                year: "$properties.year",
                            },
                            count: {$sum: 1}
                        }
                    },
                    {
                        $sort: {'_id.year': 1}
                    },
                    {
                        $group: {
                            _id: "$_id.cluster",
                            data: {
                                $push: {
                                    year: "$_id.year",
                                    total: "$count"
                                }
                            },

                        },
                    },
                    {
                        $sort: {_id: 1}
                    },


                ],
                'Monthly': [
                    {
                        $group: {
                            _id: {
                                cluster: "$properties.cluster_id",
                                month: "$properties.month",
                            },
                            count: {$sum: 1}
                        }
                    },
                    {
                        $sort: {'_id.month': 1}
                    },
                    {
                        $group: {
                            _id: "$_id.cluster",
                            data: {
                                $push: {
                                    month: "$_id.month",
                                    total: "$count"
                                }
                            },

                        },
                    },
                    {
                        $sort: {_id: 1}
                    },


                ],
                'Countries': [
                    {
                        $group: {
                            _id: {
                                cluster: "$properties.cluster_id",
                                country: "$properties.country",
                            },
                            count: {$sum: 1}
                        }
                    },
                    {
                        $sort: {'_id.country': 1}
                    },
                    {
                        $group: {
                            _id: "$_id.cluster",
                            data: {
                                $push: {
                                    country: "$_id.country",
                                    total: "$count"
                                }
                            },

                        },
                    },
                    {
                        $sort: {_id: 1}
                    },


                ]

            }
        }

    ]);

    return res.json({
        type: "FeatureCollection",
        features: results
    })
};


module.exports = {
    yearStats
};
