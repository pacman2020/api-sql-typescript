import express from 'express'
import task from './routes/tasksRoute'
import user from './routes/usersRoute'
import session from './routes/sessionRoute'
import dotenv from 'dotenv'


const app = express()

dotenv.config()
app.use(express.json())
app.use(task)
app.use(user)
app.use(session)

app.listen(3000, ()=> console.log('http://localhost:3000'))