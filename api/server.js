const express = require('express');
const server = express();
const Users = require('./users/model');

server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(() => {
            res.status(500).json({
                message: 'The users information could not be retrieved'
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else {
                res.json(user)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'The user information could not be retrieved'
            })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    Users.insert(user)
        .then(newUser => {
            if(!user.name || !user.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            } else {
                res.status(201).json(newUser)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'There was an error while saving the user to the database'
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Users.update(id, changes)
        .then(updatedUser => {
            if(!updatedUser) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else if(!changes.name || !changes.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            } else {
                res.status(200).json(updatedUser)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'The user information could not be modified'
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    Users.remove(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else {
                res.json(user)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'The user could not be removed'
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
