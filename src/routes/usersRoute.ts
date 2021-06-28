import { Router } from 'express'
import { insert_users } from '../controllers/userController'


const router = Router()

router.route("/user")
    .post(insert_users)
    // .get(list_tasks)

// router.route("/:id")
//     .get(find_by_id_tasks)
//     .put(update_tasks)
//     .delete(delete_tasks)

export default router