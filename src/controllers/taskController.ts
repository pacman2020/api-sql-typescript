import { Request, Response } from 'express'
import { Task } from '../interface/Task'
import { index, show, insert, update, destroy } from '../services/taskService'


export async function list_tasks (request: Request, response: Response): Promise<Response> {
    
    const tasks = await index()
    return response.status(200).json(tasks)
}

export async function find_by_id_tasks (request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const task = await show(id)

    if(!task){
        return response.json({'message': 'tasks não existe'})
    }

    return response.status(200).json(task)
}

export async function insert_tasks (request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.userId)
    const newTask: Task = {
        ...request.body,
        user_id
    }
    console.log('--', newTask)

    await insert(newTask)
    return response.json({'message': 'created'})
}

export async function update_tasks (request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.userId)
    const id = request.params.id

    const task = await show(id)
    if(!task){
        return response.json({'message': 'task não existe'})
    }

    if(task.user_id != user_id){
        return response.json({'message': 'usuario não tem permição'})
    }

    const updateTask: Task = {
        ...request.body,
        user_id
    }
    await update(updateTask, id)
    return response.json({'message': 'updated'})
}

export async function delete_tasks (request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.userId)
    const id = request.params.id

    const task = await show(id)
    
    if(!task){
        return response.json({'message': 'task não existe'})
    }
    
    if(task.user_id != user_id){
        return response.json({'message': 'usuario não tem permição'})
    }

    await destroy(id)
    return response.json({'message': 'deleted'})
}