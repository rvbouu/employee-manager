# Employee Manager

## Description

This Employee Manager command-line application allows users to add, view, delete, and update employees as well as the roles and departments of their business. It uses the inquirer and pg packages through Nodejs to run the application. The colors and console.table packages were also installed for use in the application for aesthetic purposes.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Table of Contents

* [Description](#description)

* [User Story](#user-story)

* [Acceptance Criteria](#acceptance-criteria)

* [Installation](#installation)

* [Usage](#usage)

* [Tests](#tests)

* [Contributing](contributing)

* [Screenshot](#screenshot)

* [Questions](#questions)

## Installation

💾

`npm init`

`npm i inquirer@8.2.4`

`npm i pg`

`npm i console.table`

**optional, may need to edit code so no errors get thrown**

`npm i colors`

## Usage

💻

* Open the command-line at the root of your project, input `psql` to open the PostgreSQL command-line.

* Once in the PostgreSQL command-line, input `\i db/schema.sql;` to build the database and create the tables.

* Then input `\i db/seeds.sql;` to input starter data into the tables.

* Once finished, input `\q` to exit out of the PostgresSQL command-line and input `node index.js` to start application.

## Tests

N/A

## Contributing

* [**Vanessa Bou**](https://github.com/rvbouu)

* **Charles from BCS Learning Assistant** helped with figuring out how to split index.js into multiple files.

## Screenshot

![gif of application functionality](./images/employee_manager_gif.gif)

The full video showing the application functionality can be found [here](https://drive.google.com/file/d/1qbDQvCmdYqEXB-0c7kCwEAS2VOXf-skQ/view?usp=sharing).

## Questions

  [GitHub](https://github.com/rvbouu)

  For additional questions or concerns, please email me at rvbouu@gmail.com