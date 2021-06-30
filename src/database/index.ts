import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {

    const connection = await createPool({
      host: process.env.LOCALHOST,
      user: process.env.USER,
      password: process.env.PASSOWRD,
      database: process.env.DATABASE
    });
    return connection
  }