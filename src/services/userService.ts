import { connect } from '../database'


export async function register (newUser){
    const conn = await connect()
    const data = [newUser.username, newUser.email, newUser.password]
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
    const result = await conn.query(sql, data)
    return result
}

export async function show_user(id){
    const conn = await connect()
    const result = await conn.query('SELECT * FROM users WHERE id=?', [id])

    if (Object.values(result[0]).length > 0){
        return result[0][0]
    }
    return false

}

export async function find_email (email){
    const conn = await connect()
    const sql = 'SELECT * FROM users WHERE email=?'
    const result = await conn.query(sql, [email])

    if (Object.values(result[0]).length > 0){
        return result[0][0]
    }
    return false
}
