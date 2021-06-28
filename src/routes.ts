import { Router } from 'express'
import { 
    list_tasks, 
    insert_tasks, 
    update_tasks, 
    find_by_id_tasks, 
    delete_tasks } from './controllers/taskControlles'


const router = Router()

router.route("/")
    .get(list_tasks)
    .post(insert_tasks)
    .post(insert_tasks)

router.route("/:id")
    .get(find_by_id_tasks)
    .put(update_tasks)
    .delete(delete_tasks)

export default router