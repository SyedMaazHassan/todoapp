const Task = require('../models/task_model');


module.exports.get_tasks = async (request, response) => {
    let context = {
        out_message: request.flash('message')
    }
    try {
        let tasks = await Task.find();
        context['tasks'] = tasks;
        context['message'] = 'Tasks fetched successfully!';
    } catch (error) {
        context['message'] = error.message;
    }
    response.render('task', context);
}


module.exports.add_new_task = async (request, response) => {
    let new_task = new Task(request.body);
    try {
        await new_task.save();
        request.flash('message', 'Task added successfully!');
    } catch (error) {
        request.flash('message', error.message);
    }
    response.redirect('/tasks');
}

module.exports.delete_task = async (request, response) => {
    let id = request.params.id;
    try {
        let selected_task = Task.findById(id);
        await selected_task.remove();
        request.flash('message', 'Task deleted successfully!');
    } catch (error) {
        request.flash('message', error.message);
    }
    response.redirect('/tasks');
}

module.exports.toggle_task = async (request, response) => {
    let id = request.params.id;
    try {
        let selected_task = await Task.findById(id);
        selected_task.is_completed = !(selected_task.is_completed);
        await selected_task.save();
        request.flash('message', 'Task status updated!');
    } catch (error) {
        request.flash('message', error.message);
    }
    response.redirect('/tasks');
}

