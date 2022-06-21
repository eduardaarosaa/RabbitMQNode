const express = require("express");
const app = express();
const post = 5002
const ampq = require("amqplib")

var channel, connection

// http://localhost:15672/#/
// guest::guest
connect()
async function connect() {
    try {
        const server = "amqp://localhost:5672"
        connection = await ampq.connect(server)
        channel = await connection.createChannel()

        await channel.assertQueue("session")
        channel.consume("session", (data) => {
            console.log("receive data at 5002")
            channel.ack(data)
        })
    } catch (e) {
        console.error(e)
    }
}

app.listen(post, () =>
    console.log(`Servidor on-line`)
);