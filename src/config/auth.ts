import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
// import { find_by_id_user } from '../services/userService'

export interface IPayload {
    id: string;
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
        
        // const user = await find_by_id_user(payload.id)
        //verifição se usuario existe

        // request.userId = payload.id

        next()
    } catch(err){
        return response.status(401).json({ message: 'authentication failure' })
    }
}