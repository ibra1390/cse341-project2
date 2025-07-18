const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Movies']
    mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .find()
    .toArray((err, movies) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movies);
    });
};


const getSingle = async (req, res) => {
    //#swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid movie id to find a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .find({ _id: movieId })
    .toArray((err, result) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
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
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .insertOne(movie);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while creating the movie.');
  }
};


const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid movie id to update a movie.');
  }

  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    director: req.body.director,
    releaseYear: req.body.releaseYear,
    duration: req.body.duration,
    genre: req.body.genre,
    rating: req.body.rating,
    synopsis: req.body.synopsis
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .replaceOne({ _id: movieId }, movie);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the movie.');
  }
};


const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid movie id to delete a movie.');
  }

  const movieId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .deleteOne({ _id: movieId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the movie.');
  }
};


module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
}