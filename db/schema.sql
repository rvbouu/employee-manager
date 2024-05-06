DROP DATABASE IF EXISTS employees_db;
-- Creates 'employees_db' database --
CREATE DATABASE employees_db;

-- lets all of the following code affect employees_db --
\c employees_db;

-- Creates department table
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- Creates roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  -- creates an fk for department_id to reference the department table
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  -- if department gets deleted from department table, sets department_id to null
  ON DELETE SET NULL
);

-- Creates an employee table
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  -- creates an fk for role_id to reference the roles table
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  -- if role gets deleted from roles table, sets role_id to null
  ON DELETE SET NULL,
  manager_id INTEGER,
  -- creates an fk for manager_id to reference employee table
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  -- if manager gets deleted from employee table, sets manager_id to null for employees that had that manager assigned to them
  ON DELETE SET NULL
);