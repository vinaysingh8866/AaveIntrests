const mongoose = require('mongoose')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var cors = require('cors')
app.use(cors)

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const intrestsSchema = require('./models/Intrests');
const messageSchema = require('./models/Message');
const connectionString = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000" //"mongodb+srv://vinay:HmmQ5jlIJ6dfHlCY@cluster0.4xl4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => { console.log("Mongoose connected sucessfully") },
        errot => { console.log("error" + errot) })

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));


const intrests = mongoose.model('Intrests', intrestsSchema)
const message = mongoose.model('Message', messageSchema)
    // await intrests.deleteMany({})
    // await message.deleteMany({})
io.on("connection", async function(socket) {
    const _address = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"


    socket.on("message", function(message) {
        console.log(`Recieved message: ${message} - from client`);
        socket.emit("msgreceived");
    });

    socket.on("disconnect", async function() {
        console.log("Disconnected...");
    });


    //donsent update based on time
    socket.on("set-interest", async function(_address, borrowRateData, lendingRateData) {
        const query = await intrests.findOne({ address: _address })
        console.log(query)
        console.log(borrowRateData, lendingRateData)

        if (query == null) {

            const intrestTemp = {
                address: _address,
                borrowRateData: [borrowRateData],
                lendingRateData: [lendingRateData],
                lastAdded: new Date().toLocaleString()
            }

            const intrestAdd = intrests.create(intrestTemp)
                //console.log("added")
        } else {
            const past = new Date(query['lastAdded'])
            const present = new Date()
            const timePassedHr = Math.abs(present - past) / 3.6e+6
            console.log(query['lastAdded'], new Date().toLocaleString())
            console.log(timePassedHr)
            if (timePassedHr > 0.1) {
                console.log('Time to update')
                let lendingAr = query['lendingRateData']
                lendingAr.push(lendingRateData)
                let borrowAr = query['borrowRateData']
                borrowAr.push(borrowRateData)
                const filter = { address: _address }
                const update = { lendingRateData: lendingAr, borrowRateData: borrowAr, lastAdded: new Date().toLocaleString() }

                let doc = intrests.findOneAndUpdate(filter, update);
                //const intrestAdd = intrests.create(intrestTemp)
                //console.log("added")
            }
        }

    })

    socket.on("get-interest", function(address) {

    })

    socket.on("get-comments", async function() {
        const query = await message.find({})
        socket.emit('message', query)
    })

    socket.on("add-comment", async function(_address, _message) {
        const msg = await message.create({ "address": _address, "message": _message })
            //console.log("message added")
    })
});