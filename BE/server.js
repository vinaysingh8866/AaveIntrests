const mongoose = require('mongoose')
const http = require("http"),
    url = require("url"),
    fs = require("fs"),
    io = require("socket.io");

const restaurantSchema = require('./models/Restaurant');
const intrestsSchema = require('./models/Intrests');
const connectionString = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000" //"mongodb+srv://vinay:HmmQ5jlIJ6dfHlCY@cluster0.4xl4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => { console.log("Mongoose connected sucessfully") },
        errot => { console.log("error" + errot) })




const server = http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    switch (path) {
        case "/":
            // fs.readFile(__dirname + "/index.html", function(err, data) {
            //     if (err) return send404(res);
            //     res.writeHead(200, {
            //         "Content-Type": path == "json.js" ? "text/javascript" : "text/html"
            //     });
            //     res.write(data, "utf8");
            //     res.end();
            // });
            break;

        default:
            send404(res);
    }
});
const send404 = function(res) {
    res.writeHead(404);
    res.write("404");
    res.end();
};

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));


const ioServer = io.listen(server);

const intrests = mongoose.model('intrests', intrestsSchema)

ioServer.on("connection", function(socket) {

    console.log("Connection accepted.");

    socket.on("message", function(message) {
        console.log(`Recieved message: ${message} - from client`);
        socket.emit("msgreceived");
    });

    socket.on("disconnect", function() {
        console.log("Disconnected...");
    });

    socket.on("set-interest", function(address, symbl) {

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