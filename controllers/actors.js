const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Actors']
    const result = await mongodb.getDatabase().db().collection('actors').find();
    result.toArray().then((actors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(actors);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Actors']
    const actorId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('actors').find({ _id: actorId });
    result.toArray().then((actors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(actors[0]);
    });
};

const createActor = async (req, res) => {
    //#swagger.tags=['Actors']
    const actor = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        age: req.body.age,
        nationality: req.body.nationality
    };
    const response = await mongodb.getDatabase().db().collection('actors').insertOne(actor);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the actor.');
    }
};

const updateActor = async (req, res) => {
    //#swagger.tags=['Actors']
    const actorId = new ObjectId(req.params.id);
    const actor = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        age: req.body.age,
        nationality: req.body.nationality
    };
    const response = await mongodb.getDatabase().db().collection('actors').replaceOne({ _id: actorId }, actor);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the actor.');
    }
};

const deleteActor = async (req, res) => {
    //#swagger.tags=['Actors']
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('actors').deleteOne({ _id: actorId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the actor.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createActor,
    updateActor,
    deleteActor
};
