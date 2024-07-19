const express = require("express");
const Producer = require("./Producer");
const server = express(); //creates a new express server app


// middleware
server.use(express.json())

//create producer 
const producer = new Producer();


// routes 
server.get("/", (request, response) => {

    response.status(200).send({
        message: 'Everything works fine',
        code: "success"
    })
})


// send a message to the broker
server.post("/send-message", async (request, response) => {
    let message_title = request.body.title.trim();
    let message_content = request.body.content.trim();

    if(message_title.length > 0 && message_content.length > 0){
        //proceed to sending the message to the broker
        let message = {
            message_title,
            message_content
        }
        await producer.publishMessage("simple-routing-key", message);

        response.status(201).send({
            message: "Message sent successfully!",
            code: "success",
            data: message
        })

    }

})


server.get("/consume", (request, response) => {
    
    producer.consumeMessage();

    response.send({
        message: "Message consumed",
        data: null
    });

})

// server needs to be listening 
server.listen("1234", () => console.log(`Server is listening on port 1234`));