// declaring dependencies and variables
const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors'); // for aesthetics only
const consTable = require('console.table');
/* ---------- Functions to delete items from tables ---------- */
// Deletes department from table
deleteDept = () => {
  // PostgreSQL command to get all data from department table
  const deptSql = `SELECT * FROM department`;
  pool.query(deptSql, (err, data) => {
    if (err) throw err;
    // maps over data gotten from query 
    const depts = data.rows.map(({id, name}) => ({name: name, value: [id,name]}));
    // prompts user
    inquirer.prompt([
      {
        type: 'list',
        message: `Which department would you like to delete?`,
        name: 'dept',
        choices: depts
      }
    ]).then(ans => {
      // takes data from user and puts it in an array
      const dept = ans.dept;
      console.log(dept)
      // PostgreSQL command to delete selected department from department table
      const sql = `DELETE FROM ONLY department WHERE id = $1`;
      pool.query(sql, [dept[0]], (err, results) => {
        if (err) throw err;
        // confirming deletion of department
        console.log(`\nThe ${dept[1]} has been deleted.\n`.green);
        // loops back to mainPrompt questions
        prompt.mainPrompt();
      })
    })
  })
}
// Deletes role from table
deleteRole = () => {
  // PostgreSQL command to get all data from roles table
  const roleSql = `SELECT * FROM roles`;
  pool.query(roleSql, (err, data) => {
    if (err) throw err;
    // maps over data gotten from query
    const roles = data.rows.map(({id, title}) => ({name: title, value: [id, title]}));
    // prompts user
    inquirer.prompt([
      {
        type: 'list',
        message: `What role would you like to delete?`,
        name: 'role',
        choices: roles
      }
    ]).then(ans => {
      // takes data from user and puts it in an array
      const role = ans.role;
      // PostgreSQL command to delete selected role from roles table
      const sql = `DELETE FROM ONLY roles WHERE id = $1`;
      pool.query(sql, [role[0]], (err, results) => {
        if (err) throw err;
        // confirming deletion of role
        console.log(`\nThe ${role[1]} role has been deleted.\n`.green);
        // loops back to mainPrompt questions
        prompt.mainPrompt();
      })
    })
  })
}
// Deletes employee from table
deleteEmp = () => {
  // PostgreSQL command to get all data from employee table
  const empSql = `SELECT * FROM employee`;
  pool.query(empSql, (err, data) => {
    if (err) throw err;
    // maps over data gotten from query
    const emps = data.rows.map(({id, first_name, last_name}) => ({name: first_name+' '+last_name, value: [id, first_name+' '+last_name]}));
    // prompts user
    inquirer.prompt([
      {
        type: 'list',
        message: `Which employee would you like to delete?`,
        name: 'emp',
        choices: emps
      }
    ]).then(ans => {
      // takes data from user and puts it in an array
      const emp = ans.emp;
      // PostgreSQL command to delete selected employee from employee table
      const sql = `DELETE FROM ONLY employee WHERE id = $1`;
      pool.query(sql, [emp[0]], (err, results) => {
        if (err) throw err;
        // confirming deletion of employee
        console.log(`\n${emp[1]} has been deleted.\n`.green);
        // loops back to mainPrompt questions
        prompt.mainPrompt();
      })
    })
  })
}

// exports functions for other files to use
module.exports = {deleteDept, deleteRole, deleteEmp}