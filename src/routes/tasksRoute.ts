import { Router } from 'express'
import { auth } from '../config/auth'
import { 
    list_tasks, 
    insert_tasks, 
    update_tasks, 
    find_by_id_tasks, 
    delete_tasks, 
    find_title_tasks} from '../controllers/taskController'


const router = Router()

router.route("/")
    .get( list_tasks)
    .post(auth,insert_tasks)

    
router.route("/:id")
    .get(find_by_id_tasks)
    .put(auth ,update_tasks)
    .delete(auth ,delete_tasks)
    
router.route("/search/:title")
    .get(find_title_tasks)

export default router