import inquirer from 'inquirer';
import 'dotenv/config';
import { getDepartment, addDepartment, deleteDepartment } from './services/departmentService.js';
import { getRoles, addRole, deleteRole } from './services/roleService.js';
import { getEmployees, addEmployee, updateEmployeeRole, updateEmployeeSalary, updateEmployeeDepartment, deleteEmployee } from './services/employeeService.js';

async function mainMenu() {
  try {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee’s role',
        'Update an employee’s salary',
        'Update an employee’s department',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'Exit'
      ]
    });

    switch (action) {
      case 'View all departments':
        console.table(await getDepartment());
        break;

      case 'View all roles':
        console.table(await getRoles());
        break;

      case 'View all employees':
        console.table(await getEmployees());
        break;

      case 'Add a department':
        const { deptName } = await inquirer.prompt({ type: 'input', name: 'deptName', message: 'Department name:' });
        if (!deptName) {
          console.log('Department name is required.');
          break;
        }
        await addDepartment(deptName);
        console.log('Department added successfully!');
        break;

      case 'Add a role':
        const departments = await getDepartment();
        const departmentChoices = departments.map(department => ({
          name: department.name,
          value: department.id
        }));
        const { title, salary, departmentId } = await inquirer.prompt([
          { type: 'input', 
            name: 'title', 
            message: 'Role title:' },

          { type: 'input', 
            name: 'salary', 
            message: 'Role salary:' },
            
          { type: 'list', 
            name: 'departmentId', 
            message: 'Add role to:',
            choices: departmentChoices, }
        ]);
        if (!title || !salary || !departmentId) {
          console.log('All fields are required to add a role.');
          break;
        }
        await addRole(title, Number(salary), Number(departmentId));
        console.log('Role added successfully!');
        break;

      case 'Add an employee':
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          { type: 'input', 
            name: 'firstName', 
            message: 'Employee first name:' },

          { type: 'input', 
            name: 'lastName', 
            message: 'Employee last name:' },

          { type: 'input', 
            name: 'roleId', 
            message: 'Role ID:' },

          { type: 'input', 
            name: 'managerId', 
            message: 'Manager ID (optional):' }
        ]);
        if (!firstName || !lastName || !roleId) {
          console.log('First name, last name, and role are required.');
          break;
        }
        await addEmployee(firstName, lastName, Number(roleId), managerId ? Number(managerId) : null);
        console.log('Employee added successfully!');
        break;

      case 'Update an employee’s role':
        const { employeeId, newRoleId } = await inquirer.prompt([
          { type: 'input', name: 'employeeId', message: 'Employee ID to update:' },
          { type: 'input', name: 'newRoleId', message: 'New role ID:' }
        ]);
        if (!employeeId || !newRoleId) {
          console.log('Employee ID and new role ID are required.');
          break;
        }
        await updateEmployeeRole(Number(employeeId), Number(newRoleId));
        console.log('Employee role updated successfully!');
        break;

      case 'Update an employee’s salary':
        const { employeeId: salaryEmployeeId, newSalary } = await inquirer.prompt([
          { type: 'input', 
            name: 'employeeId', 
            message: 'Employee ID to update:' },

          { type: 'input', 
            name: 'newSalary', 
            message: 'New salary:' }
        ]);
        if (!salaryEmployeeId || !newSalary) {
          console.log('Employee ID and new salary are required.');
          break;
        }
        await updateEmployeeSalary(Number(salaryEmployeeId), Number(newSalary));
        console.log('Employee salary updated successfully!');
        break;

      case 'Update an employee’s department':
        const { employeeId: deptEmployeeId, newDeptId } = await inquirer.prompt([
          { type: 'input', 
            name: 'employeeId', 
            message: 'Employee ID to update:' },

          { type: 'input', 
            name: 'newDeptId', 
            message: 'New department ID:' }
        ]);
        if (!deptEmployeeId || !newDeptId) {
          console.log('Employee ID and new department ID are required.');
          break;
        }
        await updateEmployeeDepartment(Number(deptEmployeeId), Number(newDeptId));
        console.log('Employee department updated successfully!');
        break;
        
      case 'Delete a department':
        const { departmentId: deleteDepartmentId } = await inquirer.prompt({
          type: 'input',
          name: 'departmentId',
          message: 'Department ID to delete:'
        });
        if (!deleteDepartmentId) {
          console.log('Department ID is required.');
          break;
        }
        await deleteDepartment(Number(deleteDepartmentId));
        console.log('Department deleted successfully!');
        break;
        
      case 'Delete a role':
        const alrExistingRolesId = await getRoles();
        const { roleId: deleteRoleId } = await inquirer.prompt({ 
          type: 'input', 
          name: 'roleId', 
          message: 'Role ID to delete:' });

          if (!deleteRoleId) {
            console.log('Role ID is required.');
            break;
          } else if (!alrExistingRolesId.some((role: { id: number; }) => role.id === Number(deleteRoleId))) {
            console.log('Role ID does not exist.');
            break;
          }

          await deleteRole(Number(deleteRoleId));
          console.log('Role deleted successfully!');
          break;
          
      case 'Delete an employee':
        const { employeeId: deleteEmployeeId } = await inquirer.prompt({
          type: 'input',
          name: 'employeeId',
          message: 'Employee ID to delete:'
        });

        if (!deleteEmployeeId) {
          console.log('Employee ID is required.');
          break;
        }
        
        await deleteEmployee(Number(deleteEmployeeId));
        console.log('Employee deleted successfully!');
        break;
        
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
  
      default:
        console.log('Invalid action, please try again.');
        break;
      }
              
              
              mainMenu();
              
            } catch (error: unknown) {
              
              if (error instanceof Error) {
                console.error('Error occurred:', error.message);
              } else {
                console.error('An unknown error occurred');
              }
    
    
    const { retry } = await inquirer.prompt({
      type: 'confirm',
      name: 'retry',
      message: 'An error occurred. Would you like to try again?',
      default: true
    });
    if (retry) {
      mainMenu(); 
    } else {
      console.log('Goodbye!');
      process.exit();
    }
  }
}


mainMenu();