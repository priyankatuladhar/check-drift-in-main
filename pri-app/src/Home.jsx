import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/internmembers')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id)=> {
        const confirm = window.confirm("Would you like to delete?")
        if(confirm){
            axios.delete('http://localhost:3000/internmembers/'+id)
            .then(res =>{
                location.reload();

            }).catch(err =>console.log(err));
        }
    }


    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List of Intern Members</h1>
            <div className='w-120 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-success'>
                        <span className="me-2">Add +</span>
                        <i className="bi bi-plus-circle"></i>
                    </Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Date of Birth</th>
                            <th>Selection Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d) => (
                            <tr key={d.id}>
                                <td>{d.name}</td>
                                <td>{d.address}</td>
                                <td>{d.dateOfBirth}</td>
                                <td>{d.status}</td>
                                <td>
                                    <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                                    <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                    <button onClick={ e=> handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
