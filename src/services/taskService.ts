import { connect } from '../database'


export async function index (){
    const conn = await connect()
    let result = await conn.query('SELECT * FROM tasks')
    return result
}

export async function show (id){
    const conn = await connect()
    const result = await conn.query('SELECT * FROM tasks WHERE tasks_id=?', id)
    return result
}

export async function insert (newTask){
    const conn = await connect()
    console.log(newTask)
    const data = [newTask.title, newTask.description]
    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)'
    const result = await conn.query(sql, data)
    return result
}

export async function update (updateTask, id){
    const conn = await connect()
    const data = [updateTask.title, updateTask.description, id]
    const sql = 'UPDATE tasks SET title=?, description=? WHERE tasks_id=? '
    const res = await conn.query(sql, data)
    return res
}

export async function destroy (id){
    const conn = await connect()
    const result = await conn.query('DELETE FROM tasks WHERE tasks_id=?', id)
    return result
}