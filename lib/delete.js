const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors');
const consTable = require('console.table');
/* ---------- Functions to delete items from tables ---------- */
// Deletes department from table
deleteDept = () => {
  const deptSql = `SELECT * FROM department`;
  pool.query(deptSql, (err, data) => {
    if (err) throw err;
    const depts = data.rows.map(({id, name}) => ({name: name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: `Which department would you like to delete?`,
        name: 'dept',
        choices: depts
      }
    ]).then(ans => {
      const dept = [ans.dept];
      const sql = `DELETE FROM ONLY department WHERE id = $1`;

      pool.query(sql, dept, (err, results) => {
        if (err) throw err;
        console.log(`\nSelected department has been deleted.\n`.green)
        prompt.mainPrompt();
      })
    })
  })
}
// Deletes role from table
deleteRole = () => {
  const roleSql = `SELECT * FROM roles`;
  pool.query(roleSql, (err, data) => {
    if (err) throw err;
    const roles = data.rows.map(({id, title}) => ({name: title, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: `What role would you like to delete?`,
        name: 'role',
        choices: roles
      }
    ]).then(ans => {
      const role = [ans.role];
      const sql = `DELETE FROM ONLY roles WHERE id = $1`;

      pool.query(sql, role, (err, results) => {
        if (err) throw err;
        console.log(`\nSelected role has been deleted.\n`.green)
        prompt.mainPrompt();
      })
    })
  })
}
// Deletes employee from table
deleteEmp = () => {
  const empSql = `SELECT * FROM employee`;
  pool.query(empSql, (err, data) => {
    if (err) throw err;
    const emps = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: `Which employee would you like to delete?`,
        name: 'emp',
        choices: emps
      }
    ]).then(ans => {
      const emp = [ans.emp];
      const sql = `DELETE FROM ONLY employee WHERE id = $1`;

      pool.query(sql, emp, (err, results) => {
        if (err) throw err;
        console.log(`\nSelected employee has been deleted.\n`.green)
        prompt.mainPrompt();
      })
    })
  })
}

module.exports = {deleteDept, deleteRole, deleteEmp}