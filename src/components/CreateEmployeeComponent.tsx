import React, { ChangeEvent, Component, MouseEvent } from 'react';
import { Employee } from '../interfaces/EmployeeInterface';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component<{history: any, match: any}, {id: number, firstName: string, lastName: string, emailId: string}> {
    
    public addOrUpdate: string;
    constructor(props: any){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        };

        this.addOrUpdate = this.props.match.params.addOrUpdate;
    }

    componentDidMount(){
        if(this.addOrUpdate === 'add'){
            return;
        } else if(this.addOrUpdate === 'update') {
            EmployeeService.getEmployeeById(this.state.id)
            .then((employee) =>{
                this.setState({firstName: employee.firstName, 
                    lastName: employee.lastName, 
                    emailId: employee.emailId
                });
            })
            .catch();
        }
    }

    changeFirstNameHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailIdHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        this.setState({emailId: event.target.value});
    }

    saveOrUpdateEmployee = (event: MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        let employee: Employee = {id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        EmployeeService.saveOrUpdateEmployee(employee)
        .then(savedOrUpdatedEmployee => {
            this.props.history.push('/employees');
          })
          .catch(error => {
            throw error;
          });;
    }

    cancel = () =>{
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">{this.addOrUpdate === 'add' ? 'Add': 'Edit'} Employee</h3>
                        <div className="card-body">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input type="text" placeholder="First Name" name="firstName" 
                                    className="form-control" 
                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input type="text" placeholder="Last Name" name="lastName" 
                                    className="form-control" 
                                    value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="emailId">Email Id:</label>
                                    <input type="email" placeholder="Email Id" name="emailId" 
                                    className="form-control" 
                                    value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                                </div>

                                <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;