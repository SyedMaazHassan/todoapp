const express           = require('express');
const task_controller   = require('../controllers/taskTemplate');
const router            = express.Router();

router.get('/', task_controller.get_tasks);
router.post('/add', task_controller.add_new_task);
router.get('/delete/:id', task_controller.delete_task);
router.get('/done/:id', task_controller.toggle_task);
router.get('/undone/:id', task_controller.toggle_task);


module.exports = router;