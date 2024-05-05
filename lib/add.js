const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors');
const consTable = require('console.table');

/* ---------- Functions to add items to tables ---------- */
// Adds new employee
addNewEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'firstName',
      validate: addFName => {
        if (addFName) {
          return true;
        } else {
          console.log("Please enter the employee's first name: ");
          return false;
        }
      }
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'lastName',
      validate: addLName => {
        if (addLName) {
          return true;
        } else {
          console.log("Please enter the employee's last name: ");
          return false;
        }
      }
    }
  ]).then((ans) => {
    const params = [ans.firstName, ans.lastName];

    const roleSql = `SELECT roles.id, roles.title FROM roles`;
    pool.query(roleSql, (err, data) => {
      if (err) throw err;
      const roles = data.rows.map(({ id, title }) => ({ name: title, value: id }));

      inquirer.prompt([
        {
          type: 'list',
          message: `What is the employee's role?`,
          name: 'role',
          choices: roles
        }
      ]).then(roleAns => {
        const role = roleAns.role;
        params.push(role);

        const managerSql = `SELECT * FROM employee`;
        pool.query(managerSql, (err, data) => {
          if (err) throw err;
          // console.log(data.rows)
          const managers = data.rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
          managers.push('None')

          inquirer.prompt([
            {
              type: 'list',
              message: `Who is the employee's manager?`,
              name: 'manager',
              choices: managers
            }
          ]).then(managerAns => {
            let manager = managerAns.manager;
            if(manager === 'None'){
              manager = null;
            }
            params.push(manager);

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)`;
            // console.log(params)
            pool.query(sql, params, (err, results) => {
              if (err) throw err;
              console.log(`\nAdded ${ans.firstName} ${ans.lastName} to the database.\n`.green);

              prompt.mainPrompt();
            })
          })
        })
      })
    })
  })
}

// Adds new role
addNewRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'title',
      validate: addRole => {
        if(addRole){
          return true;
        }else{
          console.log('Please enter a role: ');
          return false;
        }
      }
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'salary',
      validate: addSalary => {
        if(!isNaN(addSalary)){
          return true;
        }else{
          console.log('Please enter a salary for the role: ');
          return false;
        }
      }
    }
  ]).then((ans) => {
    const params = [ans.title, ans.salary];

    const deptSql = `SELECT * FROM department`;
    pool.query(deptSql, (err, data) => {
      if (err) throw err;
      const depts = data.rows.map(({id, name}) => ({name: name, value: id}));

      inquirer.prompt([
        {
          type: 'list',
          message: `Which department does the role belong to?`,
          name: 'department',
          choices: depts
        }
      ]).then(deptAns => {
        const dept = deptAns.department;
        params.push(dept);

        const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES ($1, $2, $3)`;

        pool.query(sql, params, (err, results) => {
          if (err) throw err;
          console.log(`\nAdded ${ans.title} to the database.\n`.green);
          prompt.mainPrompt();
        })
      })
    })
  })
}

// Adds new department
addNewDept = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'department',
      validate: addDept => {
        if (addDept){
          return true;
        }else{
          console.log('Please enter a department: ');
          return false;
        }
      }
    }
  ]).then((ans) => {
    const params = [ans.department];
    const sql = `INSERT INTO department (name)
    VALUES ($1)`;

    pool.query(sql, params, (err, results) => {
      if (err) throw err;
      console.log(`\nAdded ${ans.department} to the database.\n`.green);
      prompt.mainPrompt();
    })
  })
}

module.exports = {addNewEmployee, addNewRole, addNewDept}