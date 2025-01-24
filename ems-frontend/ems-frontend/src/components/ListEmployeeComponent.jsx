import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

    function getAllEmployee(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() =>{
        getAllEmployee();
    }, [])

    function addNewEmployee(){
        navigator("/create")
    }

    function updateEmployee(id){
        navigator(`/update/${id}`);
    }

    function removeEmployee(id){

        deleteEmployee(id).then(()=> {
            getAllEmployee();
        }).catch(error => {
            console.error(error);
            
        })
    }

    

  return (
    <div className='container'>
        <h2 className='text-center mt-2 fw-bold'>LIST OF EMPLOYEES</h2>
        <button className='btn btn-primary mb-4 mt-4' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.key}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger ms-2' onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent