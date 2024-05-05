const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
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

// Displays employees by manager
showByManager = () => {
  const allSql = `SELECT * FROM employee WHERE (employee.id IN (SELECT manager_id FROM employee))`;
  pool.query(allSql, (err, data) => {
    if (err) throw err;
    const managers = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: 'Select a manager to view their employees:',
        name: 'manager',
        choices: managers
      }
    ]).then(ans => {
      let manager = ans.manager;
      
      const sql = `SELECT employee.id,
      CONCAT(employee.first_name, ' ', employee.last_name) AS employee, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      JOIN employee manager ON employee.manager_id = manager.id
      WHERE manager.id = $1`;
      
      pool.query(sql, [manager], (err, results) => {
        if (err) throw err;
        console.log(`\nShowing employees...\n`.yellow)
        console.table(results.rows);
        prompt.mainPrompt();
      })
    })
  })
}

// Displays employees by department
showByDepartment = () => {
  const allSql = `SELECT * FROM department`;
  pool.query(allSql, (err, data) => {
    if (err) throw err;
    const departments = data.rows.map(({id, name}) => ({name: name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: `Select a department to view its employees:`,
        name: 'dept',
        choices: departments
      }
    ]).then(ans => {
      console.log(ans)
      let dept = ans.dept;
      console.log(dept)

      const sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, department.name AS department
      FROM employee
      LEFT JOIN roles ON employee.role_id = roles.id
      LEFT JOIN department ON roles.department_id = department.id
      WHERE department.id = $1`;

      pool.query(sql, [dept], (err, results) => {
        if (err) throw err;
        console.log('\nShowing employees from department...\n'.yellow);
        console.table(results.rows);
        prompt.mainPrompt();
      })
    })
  })
}
// Displays total utilized budget of department
showBudget = () => {
  console.log('\nShowing utilized budget for each department...\n'.yellow);
  const sql = `SELECT department.name AS department,
  SUM(roles.salary) AS budget
  FROM roles
  JOIN department ON roles.department_id = department.id
  GROUP BY department.name`;
  pool.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results.rows);
    prompt.mainPrompt();
  })
}

module.exports = {showAllEmployees, showAllRoles, showAllDepts, showByManager, showByDepartment, showBudget}