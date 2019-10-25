import { CompressionTypes } from 'kafkajs';

import Aquarium from '../schemas/Aquarium';

class PinController {
  async index(req, res) {
    const { name } = req.params;

    const aquarium = await Aquarium.findOne({ name });

    if (!aquarium) {
      return res.json({ error: 'Aquarium not found!' });
    }

    const message = { type: 'DISPLAY_PIN', aquarium: name, pin: aquarium.pin };

    await req.producer.send({
      topic: 'aquarium-websocket',
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify(message) }],
    });

    return res.json({ success: 'Pin send to aquarium' });
  }

  async store(req, res) {
    const { name } = req.params;
    const { pin } = req.body;

    const aquarium = await Aquarium.findOne({ name });

    if (!aquarium) {
      return res.json({ error: 'Aquarium not found!', authorized: false });
    }

    if (pin !== aquarium.pin) {
      return res.json({
        error: 'The pin does not match the one shown on the display!',
        authorized: false,
      });
    }

    return res.json({ authorized: true });
  }
}

export default new PinController();
