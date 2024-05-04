const inquirer = require('inquirer');

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

// update employee prompt:
// select employee from list
// select new role from list
// console.log 'Updated employee's role

