const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Movies']
    const result = await mongodb.getDatabase().db().collection('movies').find();
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    });
};


const getSingle = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    });   
};


const createMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movie = {
        title: req.body.title,
        director: req.body.director,
        releaseYear: req.body.releaseYear,
        duration: req.body.duration,
        genre: req.body.genre,
        rating: req.body.rating,
        synopsis: req.body.synopsis
    }
    const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        director: req.body.director,
        releaseYear: req.body.releaseYear,
        duration: req.body.duration,
        genre: req.body.genre,
        rating: req.body.rating,
        synopsis: req.body.synopsis
    }
    const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
}