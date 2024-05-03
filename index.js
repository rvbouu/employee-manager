const { Pool } = require('pg');
const colors = require('colors');
const prompt = require('./lib/questions');


const connection = new Pool(
  {
    //PostgreSQL username
    user: 'rvbou',
    //PostgreSQL password
    password: 'redrum',
    host: 'localhost',
    database: 'employees_db'
  },
)

connection.connect(err => {
  if (err) throw err;
  afterConnect();
})

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

  prompt.mainPrompt().then((data) => {
    switch (data) {
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
        connection.end();
        break;
    }
  })
}









