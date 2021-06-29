import { Router } from 'express'
import { session } from '../controllers/sessionController'


const router = Router()

router.route("/session")
    .post(session)


export default router