CREATE TABLE userinfo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(role_id)
);
database:
customer_problem:
custproblem_id: int(11)AUTO
userid: int(11)FK
problem_id: int(11)FK
problem_description: varchar(255)
computer_model: varchar(30)
problem_date: date
status: varchar(30)
tech_comment: varchar(70)
t_id: int(11)FK

userinfo:
userid: int(11)PK
firstName: varchar(25)
lastName: varchar(25)
address: varchar(255)
pnum: varchar(15)
email: varchar(25)
username: varchar(12)
password: varchar(12)
role_id: int(11)FK

role:
role_id: int(11)PK
role name: varchar(25)

problem:
problem_id: int(11)PK
problem name: text