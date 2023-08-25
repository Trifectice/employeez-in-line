const inquirer = require('inquirer');
const dbQueries = require('./db/dbQueries');
//functions for the cli interface
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'View all department managers',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    
    .then(answers => {
      switch (answers.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          break;
        case 'View all department managers':
          viewDepartmentManagers();
           break;
        case 'Exit':
          process.exit();
      }
    });
}

function viewDepartments() {
  dbQueries.getAllDepartments()
    .then(data => {
      console.table(data);
      mainMenu();
    })
    .catch(error => {
      console.error("Error fetching departments: ", error);
      mainMenu();
    });
}

function viewRoles() {
  dbQueries.getAllRoles()
    .then(data => {
      console.table(data);
      mainMenu();
    })
    .catch(error => {
      console.error("Error fetching roles: ", error);
      mainMenu();
    });
}

function viewEmployees() {
  dbQueries.getAllEmployees()
    .then(data => {
      console.table(data);
      mainMenu();
    })
    .catch(error => {
      console.error("Error fetching employees: ", error);
      mainMenu();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: input => input ? true : "Department name cannot be empty!"
      }
    ])
    .then(answer => {
      dbQueries.addDepartment(answer.departmentName)
        .then(() => {
          console.log("Department added successfully!");
          mainMenu();
        })
        .catch(error => {
          console.error("Error adding department: ", error);
          mainMenu();
        });
    });
}



function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
        validate: input => input ? true : "Role title cannot be empty!"
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary for the new role:',
        validate: input => !isNaN(input) && input > 0 ? true : "Please enter a valid salary!"
      },
      {
        type: 'number',
        name: 'departmentId',
        message: 'Enter the department ID for the new role:',
        validate: input => !isNaN(input) && input > 0 ? true : "Please enter a valid department ID!"
      }
    ])
    .then(answer => {
      dbQueries.addRole(answer.title, answer.salary, answer.departmentId)
        .then(() => {
          console.log("Role added successfully!");
          mainMenu();
        })
        .catch(error => {
          console.error("Error adding role: ", error);
          mainMenu();
        });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the new employee:',
        validate: input => input ? true : "First name cannot be empty!"
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the new employee:',
        validate: input => input ? true : "Last name cannot be empty!"
      },
      {
        type: 'number',
        name: 'roleId',
        message: 'Enter the role ID for the new employee:',
        validate: input => !isNaN(input) && input > 0 ? true : "Please enter a valid role ID!"
      },
      {
        type: 'number',
        name: 'managerId',
        message: 'Enter the manager ID for the new employee (or leave blank if none):',
        validate: input => !isNaN(input) || input.trim() === "" ? true : "Please enter a valid manager ID or leave blank!",
        default: ""
      }
    ])
    .then(answer => {
      if (answer.managerId === "") {
        answer.managerId = null;
      }
      dbQueries.addEmployee(answer.firstName, answer.lastName, answer.roleId, answer.managerId)
        .then(() => {
          console.log("Employee added successfully!");
          mainMenu();
        })
        .catch(error => {
          console.error("Error adding employee: ", error);
          mainMenu();
        });
    });
}

function viewDepartmentManagers() {
  dbQueries.getAllManagers() 
    .then(data => {
      console.table(data);
      mainMenu();
    })
    .catch(error => {
      console.error("Error fetching department managers: ", error);
      mainMenu();
    });
}





mainMenu();  // Start the main menu when the program starts
