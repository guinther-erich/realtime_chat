const app = require("express")();
const httpServer = require("http").createServer(app);
//const options = { /* ... */ };
const io = require("socket.io")(httpServer);
const PORT = 3000;

io.on("connection", socket => {
    console.log("Conectado com o id do Socket" + socket.id);
});

httpServer.listen(PORT, () => {
    console.log(`Server escutando através da porta ${PORT}`);
});