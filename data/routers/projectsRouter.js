const express = require('express');
const projects = require('../helpers/projectModel');
const actions = require('../helpers/actionModel');
const {
  validateAction,
  validateProject,
  validateProjectId
} = require('../middleware');

const router = express.Router();

// Get all resources from database
router.get('/', (req, res) => {
  projects
    .get()
    .then(projectList => {
      const projectActionsPromise = projectList.map(project =>
        projects.getProjectActions(project.id)
      );
      Promise.all(projectActionsPromise).then(projectActions => {
        const projectsWithActions = projectList.map((project, i) => ({
          ...project,
          actions: projectActions[i]
        }));
        res.status(200).json(projectsWithActions);
      });
    })
    .catch(err => {
      res.status(500).json({
        messgae: 'Your request could not be processed. ' + err.message
      });
    });
});

// Get Project
router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// Add a project
router.post('/', validateProject, (req, res) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed. ' + err.message
      });
    });
});

// Add an action to a project
router.post('/:id/actions', [validateProjectId, validateAction], (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };
  actions
    .insert(actionInfo)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error: could not add post. ' + err.message });
    });
});

// Delete a project
router.delete('/:id', validateProjectId, (req, res) => {
  projects
    .remove(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed. ' + err.message
      });
    });
});

// Update a project
router.put('/:id', [validateProjectId, validateProject], (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed. ' + err.message
      });
    });
});

module.exports = router;
