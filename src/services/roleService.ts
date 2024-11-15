import { pool, connectToDb } from './db.js';

await connectToDb();

const getRoles = async () => {
    const result = await pool.query('SELECT role.id, role.title, role.salary, department.name as department FROM role JOIN department ON role.department = department.id');
    return result.rows
};


const addRole = async (title: string, salary: number, departmentId: number) => {
    await pool.query(
        'INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)',
        [title,salary, departmentId]);            
};

const deleteRole = async (roleId: number) => {
    await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
};

export { getRoles, addRole, deleteRole };