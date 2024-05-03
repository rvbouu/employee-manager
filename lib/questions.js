const inquirer = require('inquirer');

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
]);

const addDept = () => inquirer.prompt([
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
]);

const addRole = () => inquirer.prompt([
  {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'role',
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
      if(isNaN(addSalary)){
        return true;
      }else{
        console.log('Please enter a salary for the role: ');
        return false;
      }
    }
  },
]);
// need to add another prompt with choices for depts to add role too - after added it console.logs "Added {role} to the database"

const addEmployee = () => inquirer.prompt([
  {
    type: 'input',
    message: "What is the employee's first name?",
    name: 'firstName',
    validate: addFName => {
      if(addFName){
        return true;
      }else{
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
      if(addLName){
        return true;
      }else{
        console.log("Please enter the employee's last name: ");
        return false;
      }
    }
  }
]);
// need to add prompt asking for employee's role with roles as choices
// need to add prompt asking who employee's manager is with choices
// console.log 'Added {firstName} {lastName} to the database

// update employee prompt:
// select employee from list
// select new role from list
// console.log 'Updated employee's role

module.exports = {mainPrompt, addDept, addRole, addEmployee}