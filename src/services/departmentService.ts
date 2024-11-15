import { pool, connectToDb } from './db.js';

await connectToDb();
 


const getDepartment = async () => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
};


const addDepartment = async (name: string) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

const deleteDepartment = async (departmentId: number) => {
    await pool.query('DELETE FROM department WHERE id = $1', [departmentId]);
}

export { getDepartment, addDepartment, deleteDepartment };