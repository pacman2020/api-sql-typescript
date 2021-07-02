import { Request, Response } from 'express'
import { Task } from '../interface/Task'
import { index, show, insert, update, destroy } from '../services/taskService'

//chave estrageira user

export async function list_tasks (request: Request, response: Response): Promise<Response> {
    //para fazer outros tipo de validação
    // const user_id = await request.userId
    // const user_username = await request.userName
    
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

    // await insert(newTask)
    return response.json({'message': 'created'})
}

export async function update_tasks (request: Request, response: Response): Promise<Response> {
    const updateTask: Task = request.body
    const id = request.params.id
    await update(updateTask, id)
    return response.json({'message': 'updated'})
}

export async function delete_tasks (request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    await destroy(id)
    return response.json({'message': 'deleted'})
}