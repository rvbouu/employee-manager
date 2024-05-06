// declaring dependencies and variables
const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors');
const consTable = require('console.table');

/* ---------- Functions to display tables ---------- */
// Displays all employees
showAllEmployees = () => {
  console.log('\nShowing all employees...\n'.yellow);
  // PostgreSQL command to format employee table
  // joins roles table and department table to employee table
  // self-joins employee table and manager table
  const sql = `SELECT employee.id,
  employee.first_name,
  employee.last_name,
  roles.title,
  department.name AS department,
  roles.salary,
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN roles ON employee.role_id = roles.id
  LEFT JOIN department ON roles.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  pool.query(sql, (err, results) => {
    if (err) throw err;
    // displays table in console
    console.table(results.rows);
    // loops back to mainPrompt questions
    prompt.mainPrompt();
  })
}

// Displays all roles
showAllRoles = () => {
  console.log('\nShowing all roles...\n'.yellow);
  // PostgreSQL command to format roles table
  // joins department table to roles table
  const sql = `SELECT roles.id,
  roles.title,
  department.name AS department,
  roles.salary
  FROM roles
  LEFT JOIN department ON roles.department_id = department.id`;
  pool.query(sql, (err, results) => {
    if (err) throw err;
    // displays table in console
    console.table(results.rows);
    // loops back to mainPrompt questions
    prompt.mainPrompt();
  })
}

// Displays all departments
showAllDepts = () => {
  console.log('\nShowing all departments...\n'.yellow);
  // PostgreSQL command to format department table
  const sql = `SELECT * FROM department`;
  pool.query(sql, (err, results) => {
    if (err) throw err;
    // displays table in console
    console.table(results.rows);
    // loops back to mainPrompt questions
    prompt.mainPrompt();
  })
}

// Displays employees by manager
showByManager = () => {
  // PostgreSQL command selecting all managers from employee table
  const allSql = `SELECT * FROM employee WHERE (employee.id IN (SELECT manager_id FROM employee))`;
  pool.query(allSql, (err, data) => {
    if (err) throw err;
    // maps over data gotten from query
    const managers = data.rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
    // Prompts user
    inquirer.prompt([
      {
        type: 'list',
        message: 'Select a manager to view their employees:',
        name: 'manager',
        choices: managers
      }
    ]).then(ans => {
      // takes data from user and puts it in an array
      let manager = [ans.manager];
      // PostgreSQL command to format table for employees for selected manager
      const sql = `SELECT employee.id,
      CONCAT(employee.first_name, ' ', employee.last_name) AS employee, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      JOIN employee manager ON employee.manager_id = manager.id
      WHERE manager.id = $1`;
      pool.query(sql, manager, (err, results) => {
        if (err) throw err;
        console.log(`\nShowing employees...\n`.yellow);
        // displays table in console
        console.table(results.rows);
        // loops back to mainPrompt questions
        prompt.mainPrompt();
      })
    })
  })
}

// Displays employees by department
showByDepartment = () => {
  // PostgreSQL command selecting all data from department table
  const allSql = `SELECT * FROM department`;
  pool.query(allSql, (err, data) => {
    if (err) throw err;
    // maps over data gotten from query
    const departments = data.rows.map(({ id, name }) => ({ name: name, value: id }));
    // Prompts user
    inquirer.prompt([
      {
        type: 'list',
        message: `Select a department to view its employees:`,
        name: 'dept',
        choices: departments
      }
    ]).then(ans => {
      // console.log(ans)
      // takes data from user and puts it in an array
      let dept = [ans.dept];
      // console.log(dept)
      // PostgreSQL command to format table for employees for selected department
      const sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, department.name AS department
      FROM employee
      LEFT JOIN roles ON employee.role_id = roles.id
      LEFT JOIN department ON roles.department_id = department.id
      WHERE department.id = $1`;
      pool.query(sql, dept, (err, results) => {
        if (err) throw err;
        console.log('\nShowing employees from department...\n'.yellow);
        // displays table in console
        console.table(results.rows);
        // loops back to mainPrompt questions
        prompt.mainPrompt();
      })
    })
  })
}
// Displays total utilized budget of department
showBudget = () => {
  console.log('\nShowing utilized budget for each department...\n'.yellow);
  // PostgreSQL command to format table with sum of salaries by department
  const sql = `SELECT department.name AS department,
  SUM(roles.salary) AS budget
  FROM roles
  JOIN department ON roles.department_id = department.id
  GROUP BY department.name`;
  pool.query(sql, (err, results) => {
    if (err) throw err;
    // displays table in console
    console.table(results.rows);
    // loops back to mainPrompt questions
    prompt.mainPrompt();
  })
}

// exports functions for other files to use
module.exports = { showAllEmployees, showAllRoles, showAllDepts, showByManager, showByDepartment, showBudget }