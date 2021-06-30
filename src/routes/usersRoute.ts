import { Router } from 'express'
import { find_by_id_user, insert_users } from '../controllers/userController'


const router = Router()

router.route("/user")
    .post(insert_users)

router.route("/user/:id")
    .get(find_by_id_user)

export default router