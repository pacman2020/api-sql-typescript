import { Router } from 'express'
import { insert_users } from '../controllers/userController'


const router = Router()

router.route("/user")
    .post(insert_users)

export default router