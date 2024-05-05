const inquirer = require('inquirer');
const pool = require('./pool');
const display = require('./display');
const add = require('./add');
const update = require('./update');

function mainPrompt() {
  inquirer.prompt([
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
        display.showAllEmployees();
        break;
      case 'Add Employee':
        add.addNewEmployee();
        break;
      case 'Update Employee Role':
        update.updateEmpRole();
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
      case 'Add Department':
        add.addNewDept();
        break;
      case 'Quit':
        pool.end();
        break;
    }
  })
}

exports.mainPrompt = mainPrompt;