INSERT INTO department (name) 
VALUES  ('Engineering'),
        ('Human Resources'),
        ('Finance'),
        ('Marketing');

INSERT INTO role (title, salary, department) 
VALUES  ('Software Engineer', 80000, 1),
        ('Product Manager', 95000, 1),
        ('HR Specialist', 60000, 2),
        ('Accountant', 70000, 3),
        ('Marketing Coordinator', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES  ('Alice', 'Johnson', 1, NULL),
        ('Bob', 'Smith', 2, 1),
        ('Cathy', 'Lee', 3, NULL),
        ('David', 'Brown', 4, NULL),
        ('Eve', 'White', 5, 2);        