const { Pool } = require('pg');
const inquirer = require('inquirer');
const colors = require('colors');
const prompt = require('./lib/questions');
const consTable = require('console.table');


const pool = new Pool(
  {
    //PostgreSQL username
    user: 'rvbou',
    //PostgreSQL password
    password: 'redrum',
    host: 'localhost',
    database: 'employees_db'
  },
)

const mainPrompt = () => inquirer.prompt([
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'mainMenu',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit']
  }
]).then((ans) => {
  const { mainMenu } = ans;
  switch (mainMenu) {
    case 'View All Employees':
      showAllEmployees();
      break;
    case 'Add Employee':
      addNewEmployee();
      break;
    case 'Update Employee Role':
      updateEmpRole();
      break;
    case 'View All Roles':
      showAllRoles();
      break;
    case 'Add Role':
      addNewRole();
      break;
    case 'View All Departments':
      showAllDepts();
      break;
    case 'Add Department':
      addNewDept();
      break;
    case 'Quit':

      pool.end();
      break;
  }
})

showAllEmployees = () => {
  console.log('Showing all employees...\n');
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
    mainPrompt();
  })
}

showAllRoles = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT roles.id,
  roles.title,
  department.name AS department,
  roles.salary
  FROM roles
  JOIN department ON roles.department_id = department.id`
  pool.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results.rows);
    mainPrompt();
  })
}

showAllDepts = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT * FROM department`
  pool.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results.rows);
    mainPrompt();
  })
}

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
          console.log(data.rows)
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
            console.log(params)
            pool.query(sql, params, (err, results) => {
              if (err) throw err;
              console.log(`Added ${ans.firstName} ${ans.lastName} to the database.\n`);

              mainPrompt();
            })
          })
        })
      })
    })
  })
}



// Welcome image function that displays after connection is made
afterConnect = () => {
      console.log(".-----------------------------------------------------.".yellow)
      console.log("|   ".yellow + " _____                 _                          ".magenta + "|".yellow)
      console.log("|   ".yellow + "| ____|_ __ ___  _ __ | | ___  _   _  ___  ___    ".magenta + "|".yellow)
      console.log("|   ".yellow + "|  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   ".magenta + "|".yellow)
      console.log("|   ".yellow + "| |___| | | | | | |_) | | (_) | |_| |  __/  __/   ".magenta + "|".yellow)
      console.log("|   ".yellow + "|_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|   ".magenta + "|".yellow)
      console.log("|   ".yellow + " __  __         |_|            |___/              ".magenta + "|".yellow)
      console.log("|   ".yellow + "|  \\/  | __ _ _ __   __ _  __ _  ___ _ __         ".magenta + "|".yellow)
      console.log("|   ".yellow + "| |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|        ".magenta + "|".yellow)
      console.log("|   ".yellow + "| |  | | (_| | | | | (_| | (_| |  __/ |           ".magenta + "|".yellow)
      console.log("|   ".yellow + "|_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|           ".magenta + "|".yellow)
      console.log("|   ".yellow + "                          |___/                   ".magenta + "|".yellow)
      console.log("'-----------------------------------------------------'".yellow)
      mainPrompt();
    }

afterConnect();





//   switch (mainMenu) {
//     case 'View All Employees':
//       showAllEmployees();
//       break;
//     case 'Add Employee':
//       addNewEmployee();
//       break;
//     case 'Update Employee Role':
//       updateEmpRole();
//       break;
//     case 'View All Roles':
//       showAllRoles();
//       break;
//     case 'Add Role':
//       addNewRole();
//       break;
//     case 'View All Departments':
//       showAllDepts();
//       break;
//     case 'Add Department':
//       addNewDept();
//       break;
//     case 'Quit':

//       pool.end();
//       break;
//   }









