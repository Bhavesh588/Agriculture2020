import React from 'react';
import axios from 'axios';
// import $ from 'jquery';

import './dashboard.styles.scss';

const Dashboard = ({ user }) => {

    async function accept(id) {
        let data = []
        let status
        let adminId
        
        await axios.get('http://localhost:5000/users/'+id)
        .then(res => {
            data.push(res.data);

            axios.delete('http://localhost:5000/users/'+id)
            .then(res => console.log(res.data))
        }); 

        await axios.get('http://localhost:5000/admin')
        .then(res => {
            if(res.data.length === 0) {
                console.log('It is empty')
                status = 'accept'
                axios.post('http://localhost:5000/admin/add/'+status, data)
                .then(res => console.log(res.data))
            } else {
                adminId = res.data[0]._id
                status = 'accept'
                axios.post('http://localhost:5000/admin/update/'+adminId+'/'+status, data)
                .then(res => console.log(res.data))
            }
        });
        window.location.reload();
    }

    async function decline(id) {
        let data = []
        let status
        let adminId
        
        await axios.get('http://localhost:5000/users/'+id)
        .then(res => {
            data.push(res.data);

            axios.delete('http://localhost:5000/users/'+id)
            .then(res => console.log(res.data))
        }); 

        await axios.get('http://localhost:5000/admin')
        .then(res => {
            if(res.data.length === 0) {
                console.log('It is empty')
                status = 'cancel'
                axios.post('http://localhost:5000/admin/add/'+status, data)
                .then(res => console.log(res.data))
            } else {
                adminId = res.data[0]._id
                status = 'cancel'
                axios.post('http://localhost:5000/admin/update/'+adminId+'/'+status, data)
                .then(res => console.log(res.data))
            }
        });
        window.location.reload();
    }

    return (
        <div>
            <h2 className="text-left p-3">Dashboard</h2>
            <hr className="m-0 mx-3 line" />
            <div className="orders">
                <h3 className="text-left mx-3">New Orders</h3>
                <div className="scroll">
                    <table className="table table-striped" id="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Accept / Decline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((u,i) => 
                                    <tr key={i}>
                                        <td>{u.fname}</td>
                                        <td>{u.email}</td>
                                        <td>{u.mobileno}</td>
                                        <td>{u.subject}</td>
                                        <td>{u.message}</td>
                                        <td>
                                            <button className="btn border-success text-success mr-2" onClick={() => accept(u._id)}>Accept</button>
                                            <button className="btn border-danger text-danger mr-2" onClick={() => decline(u._id)}>Decline</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;