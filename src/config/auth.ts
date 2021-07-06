import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { show_user } from '../services/userService'

export interface IPayload {
    id: string;
    username: string;
    iat: number;
    exp: number;
} 

export async function auth(request: Request, response: Response, next: NextFunction ) {
    const authHeader = String(request.headers.authorization)

    if (!authHeader){
        return response.status(401).json({ message: 'token required!'})
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = await jwt.verify(token, process.env.SECRET_KEY) as IPayload

        const user = await show_user(payload.id)
        
        if(!user){
            return response.status(404).json({ message: 'ussuario not found :(' })
        }

        request.userId = payload.id
        request.userName = payload.username

        next()
    } catch(err){
        return response.status(401).json({ message: 'authentication failure' })
    }
}