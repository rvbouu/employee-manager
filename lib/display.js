const pool = require('./pool');
const prompt = require('./questions');
const colors = require('colors');
const consTable = require('console.table');

/* ---------- Functions to display tables ---------- */
// Displays all employees
showAllEmployees = () => {
  console.log('\nShowing all employees...\n'.yellow);
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
  LEFT JOIN employee manager ON employee.manager_id = manager.id`
  pool.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results.rows);
    prompt.mainPrompt();
  })
}

// Displays all roles
showAllRoles = () => {
  console.log('\nShowing all roles...\n'.yellow);
  const sql = `SELECT roles.id,
  roles.title,
  department.name AS department,
  roles.salary
  FROM roles
  JOIN department ON roles.department_id = department.id`
  pool.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results.rows);
    prompt.mainPrompt();
  })
}

// Displays all departments
showAllDepts = () => {
  console.log('\nShowing all departments...\n'.yellow);
  const sql = `SELECT * FROM department`
  pool.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results.rows);
    prompt.mainPrompt();
  })
}

// TODO: Displays employees by manager

// TODO: Displays employees by department

// TODO: Displays total utilized budget of department

module.exports = {showAllEmployees, showAllRoles, showAllDepts}