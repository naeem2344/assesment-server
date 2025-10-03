


const socketConfig = (io) => {
    io.on("connection", (socket) => {

        console.log("Client connected:", socket.id);


        socket.on('disconnect', (socket) => {
            console.log(socket)
            console.log("Client disconnected:", socket.id);
        })
    });
}

module.exports = socketConfig;