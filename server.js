const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const PORT = 7000;

const users = {};

io.on("connection", (socket) => {
    console.log("Conectado com o id do Socket " + socket.id);

    socket.on("disconnect", () => {
        console.log(`${socket.id} se desconectou.`);

        for(let user in users){
            if(users[user] === socket.id){
                delete users[user];
            }
        }

        io.emit("guests.all", users);
    });

    socket.on("guest.new", (username) => {
        console.log("New guest: " + username);
        users[username] = socket.id;

        io.emit("guests.all", users);
    });

    socket.on("message.send", (data) => {
        console.log(data);

        const socketId = users[data.receiver];
        io.to(socketId).emit("message.new", data);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server escutando através da porta ${PORT}`);
});