const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors');
const consTable = require('console.table');
/* ---------- Functions to delete items from tables ---------- */
// TODO: Deletes department from table
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
        console.log(`Selected department has been deleted.\n`.green)
        prompt.mainPrompt();
      })
    })
  })
}
// TODO: Deletes role from table
deleteRole = () => {

}
// TODO: Deletes employee from table
deleteEmp = () => {

}
module.exports = {deleteDept, deleteRole, deleteEmp}