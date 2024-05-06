// declaring dependencies and variables
const pool = require('./pool');
const prompt = require('./questions');
const inquirer = require('inquirer');
const colors = require('colors');
const consTable = require('console.table');

/* ---------- Functions to add items to tables ---------- */
// Adds new employee
addNewEmployee = () => {
  // prompts user
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'firstName',
      // validates that information was given
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
      // validates that information was given
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
    // takes user data and puts it in an array
    const params = [ans.firstName, ans.lastName];
    // PostgreSQL command that selects title and id from roles table
    const roleSql = `SELECT roles.id, roles.title FROM roles`;
    pool.query(roleSql, (err, data) => {
      if (err) throw err;
      // maps over data gotten from query
      const roles = data.rows.map(({ id, title }) => ({ name: title, value: id }));
      // prompts user
      inquirer.prompt([
        {
          type: 'list',
          message: `What is the employee's role?`,
          name: 'role',
          choices: roles
        }
      ]).then(roleAns => {
        const role = roleAns.role;
        // pushes data into params array
        params.push(role);
        // PostgreSQL command selecting all data from employee table
        const managerSql = `SELECT * FROM employee`;
        pool.query(managerSql, (err, data) => {
          if (err) throw err;
          // console.log(data.rows)
          // maps over data gotten from query
          const managers = data.rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
          // adds string to managers array
          managers.push('None')
          //prompts user
          inquirer.prompt([
            {
              type: 'list',
              message: `Who is the employee's manager?`,
              name: 'manager',
              choices: managers
            }
          ]).then(managerAns => {
            let manager = managerAns.manager;
            // if user selects 'None', set manager to null
            if(manager === 'None'){
              manager = null;
            }
            // pushes data to params array
            params.push(manager);
            // PostgreSQL command to add employee to employee table
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)`;
            // console.log(params)
            pool.query(sql, params, (err, results) => {
              if (err) throw err;
              // confirming that employee was added to employee_db
              console.log(`\nAdded ${ans.firstName} ${ans.lastName} to the database.\n`.green);
              // loops back to mainPrompt questions
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
  // prompts user
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'title',
      // validates that information was given
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
      // validates that input is a number
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
    // takes data and puts it in an array
    const params = [ans.title, ans.salary];
    // PostgreSQL command selecting all data from department table
    const deptSql = `SELECT * FROM department`;
    pool.query(deptSql, (err, data) => {
      if (err) throw err;
      // maps over data gotten from query
      const depts = data.rows.map(({id, name}) => ({name: name, value: id}));
      // prompts user
      inquirer.prompt([
        {
          type: 'list',
          message: `Which department does the role belong to?`,
          name: 'department',
          choices: depts
        }
      ]).then(deptAns => {
        const dept = deptAns.department;
        // pushes data to params array
        params.push(dept);
        // PostgreSQL command to add role to roles table
        const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES ($1, $2, $3)`;
        pool.query(sql, params, (err, results) => {
          if (err) throw err;
          // confirming that role was added to employees_db
          console.log(`\nAdded ${ans.title} to the database.\n`.green);
          // loops back to mainPrompt questions
          prompt.mainPrompt();
        })
      })
    })
  })
}

// Adds new department
addNewDept = () => {
  // prompts user
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'department',
      // validates that information was given
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
    // takes data from user and puts it in an array
    const params = [ans.department];
    // PostgreSQL command to add department to department table
    const sql = `INSERT INTO department (name)
    VALUES ($1)`;
    pool.query(sql, params, (err, results) => {
      if (err) throw err;
      // confirming that department was added to employees_db
      console.log(`\nAdded ${ans.department} to the database.\n`.green);
      // loops back to mainPrompt questions
      prompt.mainPrompt();
    })
  })
}

// exports functions for other files to use
module.exports = {addNewEmployee, addNewRole, addNewDept}