//Because for the argument month and day the flickr accept the date with the form YYYY-MM-DD we need to add a zero in front of the numbers
//so we used the OCTAL numbering system --> 0o1 = 01 and 0o10 = 08 and 0o11 = 09
const dataset_2009 = [
    {
        splitRange: '2009 January to March',
        pages: 12,
        year: 2009,
        monthA: 0o1,
        dayA: 0o1,
        monthB: 0o3,
        dayB: 31
    },
    {
        splitRange: '2009 April',
        pages: 4,
        year: 2009,
        monthA: 0o4,
        dayA: 0o1,
        monthB: 0o4,
        dayB: 30
    },
    {
        splitRange: '2009 May',
        pages: 6,
        year: 2009,
        monthA: 0o5,
        dayA: 0o1,
        monthB: 0o5,
        dayB: 31
    },
    {
        splitRange: '2009 June',
        pages: 4,
        year: 2009,
        monthA: 0o6,
        dayA: 0o1,
        monthB: 0o6,
        dayB: 30
    },
    {
        splitRange: '2009 July',
        pages: 5,
        year: 2009,
        monthA: 0o7,
        dayA: 0o1,
        monthB: 0o7,
        dayB: 31
    }, {
        splitRange: '2009 August',
        pages: 6,
        year: 2009,
        monthA: 0o10,
        dayA: 0o1,
        monthB: 0o10,
        dayB: 31
    }, {
        splitRange: '2009 September',
        pages: 8,
        year: 2009,
        monthA: 0o11,
        dayA: 0o1,
        monthB: 0o11,
        dayB: 30
    }, {
        splitRange: '2009 October-November',
        pages: 9,
        year: 2009,
        monthA: 10,
        dayA: 0o1,
        monthB: 11,
        dayB: 30
    }, {
        splitRange: '2009 December',
        pages: 3,
        year: 2009,
        monthA: 12,
        dayA: 0o1,
        monthB: 12,
        dayB: 31
    },
];
module.exports = {
    dataset_2009
};
