// declaring dependencies and variables
const inquirer = require('inquirer');
const pool = require('./pool');
const display = require('./display');
const add = require('./add');
const update = require('./update');
const del = require('./delete');

// main menu function
function mainPrompt() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: [
        'View All Employees',
        'View Employees by Manager',
        'View Employees by Department',
        'Add Employee',
        `Update Employee's Role`,
        `Update Employee's Manager`,
        'View All Roles',
        'Add Role',
        'View All Departments',
        'View Utilized Budget for Each Department',
        'Add Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'Quit']
    }
  ]).then((ans) => {
    const { mainMenu } = ans;
    // switch statement - if user selection matches a case, function within the case will run
    switch (mainMenu) {
      case 'View All Employees':
        display.showAllEmployees();
        break;
      case 'View Employees by Manager':
        display.showByManager();
        break;
      case 'View Employees by Department':
        display.showByDepartment();
        break;
      case 'Add Employee':
        add.addNewEmployee();
        break;
      case `Update Employee's Role`:
        update.updateEmpRole();
        break;
      case `Update Employee's Manager`:
        update.updateEmpManager();
        break;
      case 'View All Roles':
        display.showAllRoles();
        break;
      case 'Add Role':
        add.addNewRole();
        break;
      case 'View All Departments':
        display.showAllDepts();
        break;
      case 'View Utilized Budget for Each Department':
        display.showBudget();
        break;
      case 'Add Department':
        add.addNewDept();
        break;
      case 'Delete Department':
        del.deleteDept();
        break;
      case 'Delete Role':
        del.deleteRole();
        break;
      case 'Delete Employee':
        del.deleteEmp();
        break;
      // ends application session
      case 'Quit':
        pool.end();
        break;
    }
  })
}

// exports mainPrompt function for other files to use
exports.mainPrompt = mainPrompt;