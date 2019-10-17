// import { CompressionTypes } from 'kafkajs';

import Aquarium from '../schemas/Aquarium';

class AquariumController {
  async store(req) {
    const { name } = req.params;

    const aquarium = await Aquarium.findOne({ name });

    if (aquarium) {
      return { aquarium, result: 'Aquarium already exists!' };
    }

    const newAquarium = await Aquarium.create({ ...req.body, name });

    return { newAquarium, result: 'Aquarium created!' };
  }

  async update(req, res) {
    const { name } = req.params;

    const aquarium = await Aquarium.findOne({ name });

    if (aquarium) {
      aquarium.fictionalName = req.body.fictionalName;
      // adicionar demais atributos

      const updatedAquarium = await aquarium.save();

      res.json({ updatedAquarium, result: 'Aquarium updated!' });
    }

    res.json({ error: 'Aquarium not found!' });
  }

  // async index(req, res) {
  //   const { name } = req.params;

  //   const message = { type: 'REQUEST_REPORT', aquarium: name };

  //   await req.producer.send({
  //     topic: 'monitoring-websocket',
  //     compression: CompressionTypes.GZIP,
  //     messages: [{ value: JSON.stringify(message) }],
  //   });

  //   const sleep = ms => {
  //     return new Promise(resolve => setTimeout(resolve, ms));
  //   };

  //   await sleep(3000);

  //   const aquarium = await Aquarium.findOne({ name });

  //   if (aquarium) {
  //     return res.json(aquarium);
  //   }

  //   return res.json({ ok: false });
  // }
}

export default new AquariumController();
