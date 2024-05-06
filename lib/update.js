const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors');
const consTable = require('console.table');

/* ---------- Functions to update items in tables ---------- */
// Updates employee's role
updateEmpRole = () => {
  const empSql = `SELECT * FROM employee`;
  pool.query(empSql, (err, data) => {
    if (err) throw err;
    const employees = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'emp',
        choices: employees
      }
    ]).then((ans) => {
      const params = [ans.emp];

      const roleSql = `SELECT * FROM roles`;
      pool.query(roleSql, (err, data) => {
        if (err) throw err;
        const roles = data.rows.map(({id, title}) => ({name: title, value: id}));

        inquirer.prompt([
          {
            type: 'list',
            message: `Which role do you want to assign the selected employee?`,
            name: 'role',
            choices: roles
          }
        ]).then(roleAns => {
          const role = roleAns.role;
          params.push(role);

          const sql = `UPDATE employee SET role_id = $2 WHERE id = $1`;

          pool.query(sql, params, (err, results) => {
            if(err) throw err;
            console.log(`\nUpdated employee's role.\n`.green);
            prompt.mainPrompt();
          })
        })
      })
    })
  })
}

// Updates employee's manager
updateEmpManager = () => {
  const empSql = `SELECT * FROM employee`;
  pool.query(empSql, (err, data) => {
    if (err) throw err;
    const employees = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: `Which employee's manager do you want to update?`,
        name: 'emp',
        choices: employees
      }
    ]).then((ans) => {
      const params = [ans.emp];

      const empSql = `SELECT * FROM employee`;
      pool.query(empSql, (err, data) => {
        if (err) throw err;
        const managers = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));

        inquirer.prompt([
          {
            type: 'list',
            message: `Who do you want to assign as the selected employee's manager?`,
            name: 'manager',
            choices: managers
          }
        ]).then(managerAns => {
          const manager = managerAns.manager;
          params.push(manager);

          console.log(params)
          const sql = `UPDATE employee SET manager_id = $2 WHERE id = $1`;

          pool.query(sql, params, (err, results) => {
            if(err) throw err;
            console.log(`\nUpdated employee's role.\n`.green);
            prompt.mainPrompt();
          })
        })
      })
    })
  })
}

module.exports = {updateEmpRole, updateEmpManager}