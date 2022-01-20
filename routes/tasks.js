const { response, request } = require('express');
const express = require('express');
const router = express.Router();
const tasks_controller = require('../controllers/tasks');
const Task = require('../models/task_model');

router.get('/', tasks_controller.read_tasks);

router.get('/:id', async (request, response) => {
    let id = request.params.id;
    let output = {
        'status': 404,
        'data': null,
        'message': 'No task exists with this id'
    }
    try {
        let task = await Task.findById(id);
        if (task) {
            output['status'] = 200;
            output['data'] = task;
            output['message'] = 'Task fetched sucessfully!';
        }
        response.json(output);
    } catch (e) {
        response.json(output);
        // response.json(e);
    }
});


router.post('/', async (request, response) => {
    let new_task = new Task(request.body);
    try {
        new_task = await new_task.save();
        response.json({
            'status': 200,
            'data': new_task,
            'message': 'Task added successfully'
        });
    } catch (e) {
        response.send(e);
    }
});


router.patch('/:id', async (request, response) => {
    let id = request.params.id;
    let output = {
        'status': 404,
        'data': null,
        'message': 'No task exists with this id'
    }
    try {
        let selected_task = await Task.findById(id);
        selected_task.title = request.body.title || selected_task.title;
        selected_task.description = request.body.description || selected_task.description;
        selected_task.is_completed = 'is_completed' in request.body ? request.body.is_completed : selected_task.is_completed;
        await selected_task.save();      
        output['status'] = 200;
        output['data'] = selected_task;
        output['message'] = 'Task updated sucessfully!';
        response.json(output);
    } catch (error) {
        response.json(output);
    }
});


router.delete('/:id', async (request, response) => {
    let id = request.params.id;
    let output = {
        'status': 404,
        'data': null,
        'message': 'No task exists with this id'
    }
    try {
        let selected_task = await Task.findById(id);
        await selected_task.remove();
        output['status'] = 200;
        output['data'] = selected_task;
        output['message'] = 'Task deleted sucessfully!';
        response.json(output);
    } catch (error) {
        response.json(output);   
    }
});

module.exports = router;