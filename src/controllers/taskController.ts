import { Request, Response } from 'express'
import { Task } from '../interface/Task'
import { index, show, insert, update, destroy, findName } from '../services/taskService'


export async function list_tasks (request: Request, response: Response): Promise<Response> {
    //pagination
    const limit = Number(request.query.limit) ? Number(request.query.limit) : 5
    let offset = Number(request.query.offset) ? Number(request.query.offset): 0
    let currentPage = Number(request.query.currentPage) ? Number(request.query.currentPage): 0
    const title = String(request.query.title)

    if(currentPage >0 && currentPage <= 100){
        offset = (limit * currentPage)
    }

    //search title
    if(title != 'undefined'){
        const tasks = await findName(limit, offset, title)
    
        return response.status(200).json({
            'limit': limit,
            'offset': limit,
            currentPage,
            tasks
        })

    }else {
        const tasks = await index(limit, offset)
    
        return response.status(200).json({
            'limit': limit,
            'offset': limit,
            currentPage,
            tasks
        })
    }
}

export async function find_by_id_tasks (request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const task = await show(id)

    if(!task){
        return response.status(404).json({'message': 'task not found'})
    }

    return response.status(200).json(task)
}

export async function insert_tasks (request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.userId)
    const newTask: Task = {
        ...request.body,
        user_id
    }

    await insert(newTask)
    return response.json({'message': 'task created successfully'})
}

export async function update_tasks (request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.userId)
    const id = request.params.id

    const task = await show(id)
    if(!task){
        return response.json({'message': 'task not found'})
    }

    if(task.user_id != user_id){
        return response.json({'message': 'user does not have permission'})
    }

    const updateTask: Task = {
        ...request.body,
        user_id
    }
    await update(updateTask, id)
    return response.json({'message': 'task updated successfully'})
}

export async function delete_tasks (request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.userId)
    const id = request.params.id

    const task = await show(id)
    
    if(!task){
        return response.json({'message': 'task not found'})
    }
    
    if(task.user_id != user_id){
        return response.json({'message': 'user does not have permission'})
    }

    await destroy(id)
    return response.json({'message': 'task deteled successfully'})
}