const projects = require('../helpers/projectModel');
const actions = require('../helpers/actionModel');

function validateProjectId(req, res, next) {
  projects
    .get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: 'Project does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your reques could not be processed: ' + err.message
      });
    });
}

function validateActionId(req, res, next) {
  actions
    .get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(404).json({ message: 'Action does not exist.' });
      } else {
        req.action = action;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your reques could not be processed: ' + err.message
      });
    });
}

function validateProject(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing project data' });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Name and description are required!' });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing Action data' });
  } else if (!req.body.notes || !req.body.description) {
    res.status(400).json({ message: 'Notes and description are required!' });
  } else {
    next();
  }
}

module.exports = {
  validateAction,
  validateActionId,
  validateProject,
  validateProjectId
};
