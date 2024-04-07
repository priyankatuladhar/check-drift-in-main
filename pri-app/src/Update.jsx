import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function Update() {
  const [values, setValues] = useState({
    name: '',
    address: '',
    dateOfBirth: new Date(),
    status: ''
  });
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/internmembers/${id}`)
      .then(res => setValues(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'status' ? (value === 'true' ? 'Yes, Selected' : 'No, not Selected') : value;
    setValues({ ...values, [name]: finalValue });
  };

  const handleDateChange = (date) => {
    setValues({ ...values, dateOfBirth: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/internmembers/${id}`, values)
      .then(res => {
        console.log(res);
        // Redirect to the read page after update
        window.location.href = '/';
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light'>
      <div className='w-150 border bg-white shadow px-5 pt-3 rounded'>
        <h1>Update Member - Intern</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name='name'
              className='form-control'
              placeholder="Enter Name"
              value={values.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name='address'
              className='form-control'
              placeholder="Enter Address"
              value={values.address || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <DatePicker
              selected={new Date(values.dateOfBirth)}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="status">Selection Status:</label>
            <select
              name='status'
              className='form-control'
              value={values.status === 'Yes, Selected' ? 'true' : 'false'}
              onChange={handleInputChange}
            >
              <option value="true">Yes, Selected</option>
              <option value="false">No, not Selected</option>
            </select>
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to="/" className='btn btn-secondary ms-3 border-1'>Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;