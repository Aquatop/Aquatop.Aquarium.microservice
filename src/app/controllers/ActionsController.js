import { CompressionTypes } from 'kafkajs';

import Aquarium from '../schemas/Aquarium';

class ActionsController {
  async store(req, res) {
    const { name } = req.params;
    const { type } = req.body;

    const aquarium = await Aquarium.findOne({ name });

    if (aquarium) {
      const message = { type, aquarium: name };

      await req.producer.send({
        topic: 'aquarium-websocket',
        compression: CompressionTypes.GZIP,
        messages: [{ value: JSON.stringify(message) }],
      });

      return res.json({ result: 'Action was sent!' });
    }

    return res.json({ error: 'Aquarium not found!' });
  }
}

export default new ActionsController();
