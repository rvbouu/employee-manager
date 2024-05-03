INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 4),
  ('Salesperson', 80000, 4),
  ('Lead Engineer', 250000, 1),
  ('Software Engineer', 175000, 1),
  ('Account Manager', 160000, 2),
  ('Accountant', 110000, 2),
  ('Legal Team Lead', 275000, 3),
  ('Lawyer', 170000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Brian', 'OConner', 7, Null),
  ('Dominic', 'Toretto', 4, 5),
  ('Gisele', 'Yashar', 1, NULL),
  ('Mia', 'Toretto', 5, NULL),
  ('Letty', 'Ortiz', 3, NULL),
  ('Han', 'Seoul-Oh', 2, 3),
  ('Tej', 'Parker', 6, 4),
  ('Roman', 'Pearce', 8, 1);