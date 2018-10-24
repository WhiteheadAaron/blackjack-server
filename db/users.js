const users = [
    {
        _id: "000000000000000000000001",
        username: "msgreen",
        password: "$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi"
    },
    {
        _id: "000000000000000000000002",
        username: "aaron",
        password: "$2a$10$6AFPcXRCWVBrvjvpUoyj6uF19cuGjohP16OSk5RzwmnjcCiBHOSBW"
    },
    {
        _id: "000000000000000000000003",
        username: "nik",
        password: "$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi"
    },
    {
        _id: "000000000000000000000004",
        username: "joe",
        password: "$2a$10$6AFPcXRCWVBrvjvpUoyj6uF19cuGjohP16OSk5RzwmnjcCiBHOSBW"
    }
]

const stats = [
    {
        _id: "000000000000000000000101",
        played: "10",
        wins: "6",
        losses: "3",
        ties: "1",
        money: "110",
        netGain: "10",
        userId: "000000000000000000000001",
        username: "msgreen"
    },
    {
        _id: "000000000000000000000102",
        played: "15",
        wins: "11",
        losses: "3",
        ties: "1",
        money: "140",
        netGain: "40",
        userId: "000000000000000000000002",
        username: "aaron"
    },
    {
        _id: "000000000000000000000103",
        played: "1",
        wins: "0",
        losses: "0",
        ties: "1",
        money: "100",
        netGain: "0",
        userId: "000000000000000000000003",
        username: "nik"
    },
    {
        _id: "000000000000000000000104",
        played: "100",
        wins: "96",
        losses: "3",
        ties: "1",
        money: "1110",
        netGain: "1010",
        userId: "000000000000000000000004",
        username: "joe"
    }
]

module.exports = { users, stats };