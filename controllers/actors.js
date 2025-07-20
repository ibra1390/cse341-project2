const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=['Actors']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('actors')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Actors']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid actor ID' });
    }

    const actorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('actors')
      .find({ _id: actorId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Actor not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    next(err);
  }
};

const createActor = async (req, res, next) => {
  //#swagger.tags=['Actors']
  try {
    const actor = {
      name: req.body.name,
      birthdate: req.body.birthdate,
      age: req.body.age,
      nationality: req.body.nationality,
    };

    const response = await mongodb.getDatabase().db().collection('actors').insertOne(actor);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the actor.');
    }
  } catch (err) {
    next(err);
  }
};

const updateActor = async (req, res, next) => {
  //#swagger.tags=['Actors']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid actor id to update an actor.');
    }

    const actorId = new ObjectId(req.params.id);
    const actor = {
      name: req.body.name,
      birthdate: req.body.birthdate,
      age: req.body.age,
      nationality: req.body.nationality,
    };

    const response = await mongodb.getDatabase().db().collection('actors').replaceOne({ _id: actorId }, actor);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the actor.');
    }
  } catch (err) {
    next(err);
  }
};

const deleteActor = async (req, res, next) => {
  //#swagger.tags=['Actors']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid actor id to delete an actor.');
    }

    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('actors').deleteOne({ _id: actorId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the actor.');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createActor,
  updateActor,
  deleteActor,
};
