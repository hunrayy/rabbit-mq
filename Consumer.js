const express = require("express");
const amqplib = require("amqplib");


class Consumer {

    constructor(){
        this.createConnection()
    }


    createConnection(){
        amqplib.connect("amqp://localhost:5672").then( async ( connection ) => {

        this.channel = await connection.createChannel("test-channel");

        console.log("Channel created: ");
    }).catch(error => {
        console.log("An error just occurred! ", error.message)
    })


    }


}