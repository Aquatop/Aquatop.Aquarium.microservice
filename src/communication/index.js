import { Kafka, logLevel } from 'kafkajs';

import AquariumController from '../app/controllers/AquariumController';

class Communication {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'aquarium',
      brokers: [process.env.KAFKA_URL],
      logLevel: logLevel.WARN,
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'aquarium-group' });

    this.run();
  }

  async run() {
    await this.producer.connect();
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: 'websocket-aquarium' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('Response: ', String(message.value));

        const payload = JSON.parse(message.value);
        const { type } = payload;

        let response = '';

        switch (type) {
          case 'CREATE_AQUARIUM':
            response = await AquariumController.store(payload);
            console.log(response);
            break;
          default:
            console.log(`Message type ${type} is invalid!`);
            break;
        }
      },
    });
  }
}

export default new Communication().producer;
