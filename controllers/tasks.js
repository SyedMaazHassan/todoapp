// const express = require('express');
const Task = require('../models/task_model');

module.exports.read_tasks = async (request, response) => {
    let output = {
        'status': 404,
        'data': null,
        'message': 'No tasks available'
    }
    try {
        asd
        let tasks = await Task.find();
        output['status'] = 200;
        output['data'] = tasks;
        output['message'] = 'Tasks fetched successfully!'
        response.json(output);
    } catch (e) {
        output['message'] = e.message;
        response.json(output);
    }
}
