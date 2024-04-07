import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Update from './Update';


function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/internmembers/`+ id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-150 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Details of Intern</h3>
        <div className='mb-2'>
          <strong>Name: {data.name}</strong>
        </div>
        <div className='mb-2'>
          <strong>Address: {data.address}</strong>
        </div>
        <div className='mb-2'>
          <strong>Date of Birth: {data.dateOfBirth}</strong>
        </div>
        <div className='mb-2'>
          <strong>Selection Status: {data.status}</strong>
        </div>
        
        <Link to={`/update/${id}`} className='btn btn-sm btn-primary me-2'>Update</Link>
        <Link to="/" className='btn btn-sm btn-secondary me-3'>Back</Link>
                           
      </div>
    </div>
    
  );
}

export default Read;
