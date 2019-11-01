const express = require('express');
const actions = require('../helpers/actionModel');
const { validateActionId, validateAction } = require('../middleware');

const router = express.Router();

// Get all actions
router.get('/', (req, res) => {
  actions
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed! ' + err.message
      });
    });
});

// Get action
router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// Delete action
router.delete('/:id', validateActionId, (req, res) => {
  actions
    .remove(req.params.id)
    .then(actionToRemove => {
      res.status(200).json(actionToRemove);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed ' + err.message
      });
    });
});

// Update action
router.put('/:id', [validateActionId, validateAction], (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then(actionToUpdate => {
      res.status(200).json(actionToUpdate);
    })
    .catch(err => {
      res.status(500).json({
        message: 'your request could not be processed ' + err.message
      });
    });
});

module.exports = router;
