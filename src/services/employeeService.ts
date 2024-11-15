import { pool, connectToDb } from './db.js';

await connectToDb();

const getEmployees = async () => {
  const result = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name,
           role.title, department.name AS department, role.salary,
           manager.first_name AS manager_first, manager.last_name AS manager_last
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
  return result.rows;
};

const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
};

const updateEmployeeRole = async (employeeId: number, newRoleId: number) => {
  await pool.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [newRoleId, employeeId]
  );
};

const updateEmployeeSalary = async (employeeId: number, newSalary: number) => {
  await pool.query(
    'UPDATE employee SET salary = $1 WHERE id = $2',
    [newSalary, employeeId]
  );
};

const updateEmployeeDepartment = async (employeeId: number, newDepartmentId: number) => {
  await pool.query(
    'UPDATE role SET department = $1 WHERE id = $2',
    [newDepartmentId, employeeId]
  );
};

const deleteEmployee = async (employeeId: number) => {
  await pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);
};



export { getEmployees, addEmployee, updateEmployeeRole, deleteEmployee, updateEmployeeSalary, updateEmployeeDepartment };
