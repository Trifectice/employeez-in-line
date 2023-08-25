const mysql = require('mysql2/promise');
require('dotenv').config();

let connection;

async function initializeConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
  }
}

//CRUD operations

async function getAllDepartments() {
    await initializeConnection();
    const [rows] = await connection.query('SELECT * FROM department');
    return rows;
}

async function getAllRoles() {
    await initializeConnection();
    const [rows] = await connection.query('SELECT * FROM role');
    return rows;
}

async function getAllEmployees() {
    await initializeConnection();
    const [rows] = await connection.query('SELECT * FROM employee');
    return rows;
}

async function addDepartment(departmentName) {
  await initializeConnection();
  const [result] = await connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
  return result;
}

async function addRole(title, salary, departmentId) {
  await initializeConnection();
  const [result] = await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  return result;
}

async function addEmployee(firstName, lastName, roleId, managerId = null) {
  await initializeConnection();
  const [result] = await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  return result;
}


async function getAllManagers() {
  await initializeConnection();
  const [rows] = await connection.query(`
      SELECT e.* 
      FROM employee e
      WHERE e.manager_id IS NOT NULL`);
  return rows;
}





module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  getAllManagers,
  addDepartment,
  addRole,
  addEmployee
};

