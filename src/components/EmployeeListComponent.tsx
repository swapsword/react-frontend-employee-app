import React, { Component } from 'react';
import { Employee } from '../interfaces/EmployeeInterface';
import EmployeeService from '../services/EmployeeService'

type MyState = { employees: Employee[], isLoaded: boolean, error: any };

class EmployeeListComponent extends Component<{history:any}, MyState> {
    constructor(props: any){
        super(props);
        this.state = {
            employees: [],
            isLoaded: true,
            error: null
        };
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then(employees => {
            this.setState({
                employees,
                isLoaded: true
            });
        })
        .catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    addEmployee(){
        this.props.history.push('/employee/add');
    }
    
    updateEmployee = (id: number) => {
        this.props.history.push(`/employee/update/${id}`);
    }

    deleteEmployee = (id: number) => {
        EmployeeService.deleteEmployee(id);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>

                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Id</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key= {employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <button className="btn btn-info" onClick={() => this.updateEmployee(employee.id)}>Update</button>
                                            <button className="btn btn-danger" onClick={() => this.deleteEmployee(employee.id)}>Delete</button>
                                        </td>
                                    </tr>  
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default EmployeeListComponent;