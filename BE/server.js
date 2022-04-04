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
const restaurantSchema = require('./models/Restaurant');
const intrestsSchema = require('./models/Intrests');
const connectionString = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000" //"mongodb+srv://vinay:HmmQ5jlIJ6dfHlCY@cluster0.4xl4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => { console.log("Mongoose connected sucessfully") },
        errot => { console.log("error" + errot) })

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));


const intrests = mongoose.model('intrests', intrestsSchema)

io.on("connection", async function(socket) {

    console.log("Connection accepted.");
    const _address = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
        // const query = await intrests.find()
        // console.log(query)
    socket.on("message", function(message) {
        console.log(`Recieved message: ${message} - from client`);
        socket.emit("msgreceived");
    });

    socket.on("disconnect", async function() {
        console.log("Disconnected...");
    });

    socket.on("set-interest", async function(address, borrowRateData, lendingRateData) {
        const query = await intrests.findOne({ address: address })
        console.log(query)

        if (query == null) {
            const intrestTemp = {
                address: address,
                borrowRateData: [borrowRateData],
                lendingRateData: [lendingRateData],
                lastAdded: new Date().toLocaleString()
            }

            const intrestAdd = intrests.create(intrestTemp)
            console.log("added")
        }
    })

    socket.on("get-interest", function(address) {

    })
    socket.on("get-data", () => {
        console.log("server - get-data called");

    });

    // socket.on('get-orders', () => {
    //     _order.find((error, document) => {
    //         if (error) {
    //             console.log(error)
    //         } else {
    //             console.log(document)
    //             socket.emit('order-data', document)
    //         }
    //     })
    // })
});