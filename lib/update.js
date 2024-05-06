// declaring dependencies and variables
const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors');
const consTable = require('console.table');

/* ---------- Functions to update items in tables ---------- */
// Updates employee's role
updateEmpRole = () => {
  // PostgreSQL command selecting all data from employee table
  const empSql = `SELECT * FROM employee`;
  pool.query(empSql, (err, data) => {
    if (err) throw err;
    // maps over data gotten from query
    const employees = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));
    // Prompts user
    inquirer.prompt([
      {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'emp',
        choices: employees
      }
    ]).then((ans) => {
      // takes data from user and puts it in an array
      const params = [ans.emp];
      // PostgreSQL command selecting all data from roles table
      const roleSql = `SELECT * FROM roles`;
      pool.query(roleSql, (err, data) => {
        if (err) throw err;
        // maps over data gotten from query
        const roles = data.rows.map(({id, title}) => ({name: title, value: id}));
        // prompts user
        inquirer.prompt([
          {
            type: 'list',
            message: `Which role do you want to assign the selected employee?`,
            name: 'role',
            choices: roles
          }
        ]).then(roleAns => {
          const role = roleAns.role;
          // pushes data into params array
          params.push(role);
          // PostgreSQL command to update employee role
          const sql = `UPDATE employee SET role_id = $2 WHERE id = $1`;
          pool.query(sql, params, (err, results) => {
            if(err) throw err;
            // confirming that employee role was updated
            console.log(`\nUpdated employee's role.\n`.green);
            // loops back to mainPrompt questions
            prompt.mainPrompt();
          })
        })
      })
    })
  })
}

// Updates employee's manager
updateEmpManager = () => {
  // PostgreSQL command selecting all data from employee table
  const empSql = `SELECT * FROM employee`;
  pool.query(empSql, (err, data) => {
    if (err) throw err;
    // maps over data gotten from query
    const employees = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));
    // prompts user
    inquirer.prompt([
      {
        type: 'list',
        message: `Which employee's manager do you want to update?`,
        name: 'emp',
        choices: employees
      }
    ]).then((ans) => {
      // takes data from user and puts it in an array
      const params = [ans.emp];
      // PostgreSQL command selecting all data from employees
      const empSql = `SELECT * FROM employee`;
      pool.query(empSql, (err, data) => {
        if (err) throw err;
        // maps over data gotten from query
        const managers = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));
        // prompts user
        inquirer.prompt([
          {
            type: 'list',
            message: `Who do you want to assign as the selected employee's manager?`,
            name: 'manager',
            choices: managers
          }
        ]).then(managerAns => {
          const manager = managerAns.manager;
          // pushes data into params array
          params.push(manager);
          // console.log(params)

          // PostgreSQL command to update employee's manager
          const sql = `UPDATE employee SET manager_id = $2 WHERE id = $1`;
          pool.query(sql, params, (err, results) => {
            if(err) throw err;
            // confirming that employee's manager was updated
            console.log(`\nUpdated employee's manager.\n`.green);
            // loops back to mainPrompt questions
            prompt.mainPrompt();
          })
        })
      })
    })
  })
}

// exports functions for other files to use
module.exports = {updateEmpRole, updateEmpManager}