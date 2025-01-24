import React, { useState } from 'react'
import { createEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigator = useNavigate();
  const {id} = useParams();

  const [errors, setErros] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })


  function saveOrUpdateEmployee(e){
    e.preventDefault();

    if(validateForm()){
      const employee = {firstName, lastName, email};
      console.log(employee);

      if(id){
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employee')
        }).catch(error => {
          console.error(error)
        })
      }
      else{
        createEmployee(employee).then((response) => {
          console.log(response.data);
  
          navigator('/employee')
        }).catch(error => {
          console.error(error);    
        })
      } 
    } 
  }

  function validateForm(){
    let valid = true;

    const errorCopy = {...errors}

    if(firstName.trim()){
      errorCopy.firstName = '';
    }else{
      errorCopy.firstName = "First Name is required";
      valid = false;
    }

    if(lastName.trim()){
      errorCopy.lastName = '';
    }else{
      errorCopy.lastName = "Last Name is required";
      valid = false;
    }

    if(email.trim()){
      errorCopy.email = '';
    }else{
      errorCopy.email = "Email is required";
      valid = false;
    }

    setErros(errorCopy);

    return valid;

  }

  function pageTitle(){
    if(id){
        return <h2 className='text-center mt-1 fw-bold'>UPDATE EMPLOYEE</h2>
    }else{
      return <h2 className='text-center mt-1 fw-bold'>ADD EMPLOYEE</h2>
    }
}

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-mid-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name</label>
                <input 
                  type='text' 
                  placeholder='Enter Employee First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                  required>
                </input>
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Last Name</label>
                <input 
                  type='text' 
                  placeholder='Enter Employee Last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                  required>
                </input>
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input 
                  type='text' 
                  placeholder='Enter Employee Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid': ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                  required>
                </input>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <button className='btn btn-success mt-2' onClick={saveOrUpdateEmployee}>Submit</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployeeComponent