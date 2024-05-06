-- This file was used to test queries before adding them to js files
-- display department table
SELECT * FROM department;

-- display roles table
SELECT roles.id, roles.title, department.name AS department, roles.salary
FROM roles
LEFT JOIN department ON roles.department_id = department.id;

-- display all employees table
SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- display all employees table in order by manager
SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id
ORDER BY manager.id;

-- display all employees table in order by department
SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id
ORDER BY department.id;

-- display utilized budget table for each department
SELECT department.name AS department,
SUM(roles.salary) AS budget
FROM roles
LEFT JOIN department ON roles.department_id = department.id
GROUP BY department.name;

-- display employees for manager id 1 (Brian O'Conner)
SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON employee.manager_id = manager.id
WHERE manager.id = 1;

-- display employees for department id 1 (Engineering)
SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, department.name AS department
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
WHERE department.id = 1;