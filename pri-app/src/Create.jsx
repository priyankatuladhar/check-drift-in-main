import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';

function Create() {
    const [values, setValues] = useState({
        name: '',
        address: '',
        dateOfBirth: new Date(),
        status: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedValues = { ...values, status: status === "true" ? "Yes, Selected" : "No, not Selected" };
        axios.post('http://localhost:3000/internmembers', updatedValues)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };
    
    const [status, setStatus] = useState("");
    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light'>
            <div className='w-150 border bg-white shadow px-5 pt-3 rounded'>
                <h1>Add an Intern</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name='name'
                            className='form-control'
                            placeholder="Enter Name"
                            value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name='address'
                            className='form-control'
                            placeholder="Enter Address"
                            value={values.address}
                            onChange={e => setValues({ ...values, address: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <DatePicker
                            selected={values.dateOfBirth}
                            onChange={date => {
                                const formattedDate = date.toISOString().split('T')[0];
                                setValues({ ...values, dateOfBirth: formattedDate });
                            }}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="status">Selection Status:</label>
                        <select
                            className='form-control'
                            value={status}
                            onChange={(e) => setStatus( e.target.value )}
                        >
                            <option value="true">Yes, Selected</option>
                            <option value="false">No, not Selected</option>
                        </select>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/" className='btn btn-secondary ms-3 border-1'>Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Create;
