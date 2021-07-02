import { connect } from '../database'


export async function index (){
    //traze user de user_id
    const conn = await connect()
    let result = await conn.query('SELECT * FROM tasks')
    const tasks = {...result[0]}
    return tasks
}

export async function show (id){
    //traze user de user_id
    const conn = await connect()
    const result = await conn.query('SELECT * FROM tasks WHERE task_id=?', id)
    const task = {...result[0][0]}
    
    if (Object.values(task).length > 0){
        return task
    }
    return false
}

export async function insert (newTask){
    const conn = await connect()
    const data = [newTask.title, newTask.description, newTask.user_id]
    const sql = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)'
    const result = await conn.query(sql, data)
    return result
}

export async function update (updateTask, id){
    //user_id 
    const conn = await connect()
    const data = [updateTask.title, updateTask.description, updateTask.user_id, id]
    const sql = 'UPDATE tasks SET title=?, description=?, user_id=? WHERE task_id=? '
    const res = await conn.query(sql, data)
    return res
}

export async function destroy (id){
    const conn = await connect()
    const result = await conn.query('DELETE FROM tasks WHERE task_id=?', id)
    return result
}