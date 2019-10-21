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
      await Aquarium.updateOne({ name }, { ...req.body, owner: req.userId });

      const updatedAquarium = await Aquarium.findOne({ name });

      res.json({ updatedAquarium, result: 'Aquarium updated!' });
    }

    res.json({ error: 'Aquarium not found!' });
  }

  async index(req, res) {
    const { name } = req.params;

    const aquarium = await Aquarium.findOne({ name });

    if (aquarium) {
      res.json(aquarium);
    }

    res.json({ error: 'Aquarium not found!' });
  }

  async list(req, res) {
    const { owner } = req.query;

    const aquariums = await Aquarium.find({
      owner: owner ? req.userId : 'owner',
    });

    if (aquariums) {
      res.json(aquariums);
    }

    res.json([]);
  }
}

export default new AquariumController();
