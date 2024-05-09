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
    const employees = data.rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: [id, first_name + ' ' + last_name] }));
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
        const roles = data.rows.map(({ id, title }) => ({ name: title, value: [id, title] }));
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
          // console.log(params)
          const sql = `UPDATE employee SET role_id = $2 WHERE id = $1`;
          pool.query(sql, [params[0][0],params[1][0]], (err, results) => {
            if (err) throw err;
            // confirming that employee role was updated
            console.log(`\nUpdated ${params[0][1]}'s role to ${params[1][1]}.\n`.green);
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
    const employees = data.rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: [id,  first_name + ' ' + last_name]}));
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
        const managers = data.rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: [id,  first_name + ' ' + last_name]}));
        // adds string to managers array
        managers.push('None')
        // prompts user
        inquirer.prompt([
          {
            type: 'list',
            message: `Who do you want to assign as the selected employee's manager?`,
            name: 'manager',
            choices: managers
          }
        ]).then(managerAns => {
          let manager = managerAns.manager;
          // if user selects 'None', set manager to null
          if (manager === 'None') {
            manager = [null];
          }
          // pushes data into params array
          params.push(manager);
          // console.log(params)

          // PostgreSQL command to update employee's manager
          const sql = `UPDATE employee SET manager_id = $2 WHERE id = $1`;
          // console.log(typeof params[1][0])
          pool.query(sql, [params[0][0], params[1][0]], (err, results) => {
            if (err) throw err;
            // confirming that employee's manager was updated
            if(params[1][0]===null){
              console.log(`\ ${params[0][1]} no longer has a manager.\n`.green);
            }else{
              console.log(`\nUpdated ${params[0][1]}'s manager to ${params[1][1]}.\n`.green);
            }
            
            // loops back to mainPrompt questions
            prompt.mainPrompt();
          })
        })
      })
    })
  })
}

// exports functions for other files to use
module.exports = { updateEmpRole, updateEmpManager }