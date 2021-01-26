import { Employee } from '../interfaces/EmployeeInterface';
import { handleError, handleResponse } from './ServiceUtils';
const baseUrl = 'http://localhost:8080/api/v1';

class EmployeeService {
  getEmployees() {
    return fetch(baseUrl + '/employees')
      .then(handleResponse)
      .catch(handleError);
  }

  getEmployeeById(id: number) {
    return fetch(baseUrl + '/employees/' + id)
      .then(handleResponse)
      .catch(handleError);
  }

  saveOrUpdateEmployee(employee: Employee) {
    let urlextension: string = `/employees${
      employee.id ? `/${employee.id}` : ''
    }`;
    return fetch(baseUrl + urlextension, {
      method: employee.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(employee),
    })
      .then(handleResponse)
      .catch(handleError);
  }

  deleteEmployee(id: number) {
    return fetch(baseUrl + '/employees/' + id, { method: 'DELETE' })
      .then(handleResponse)
      .catch(handleError);
  }
}

export default new EmployeeService();
