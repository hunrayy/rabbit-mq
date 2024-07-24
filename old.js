   async createConnection(){
        const connection = await amqplib.connect("amqp://localhost:5672")

        let channel = await connection.createChannel("test-channel")
        return channel
    }

    async publishMessage(routingKey, message){
        // if(!this.channel){
        //     this.channel = await this.createConnection("test-channel")
        // }

        let channel = await this.createConnection("test-channel")

        //console.log(this.channel);

        await channel.assertExchange("test-exchange-2", "direct");

        channel.publish("test-exchange-2", routingKey, Buffer.from(JSON.stringify(message)))

    }