import React from 'react';
import axios from 'axios';

import './orders.styles.scss';

const Orders = ({ user, admin }) => {

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

    async function done(id) {
        let data = []
        let status
        let adminId

        if(admin.length === 1) {
            admin[0].orderaccept.map((a,i) => {
                if(admin[0].orderaccept[i]._id === id) {
                    data.push(admin[0].orderaccept[i])
                    
                    status = 'acceptorder'
                    axios.post('http://localhost:5000/admin/pop/'+admin[0]._id+'/'+id+'/'+status)
                        .then(res => console.log(res.data))
                }
                return 0;
            })
        }

        await axios.get('http://localhost:5000/admin')
        .then(res => {
            adminId = res.data[0]._id
            status = 'done'
            axios.post('http://localhost:5000/admin/update/'+adminId+'/'+status, data)
            .then(res => console.log(res.data))
        });
        window.location.reload();
    }

    async function declineaccept(id) {
        let data = []
        let status
        let adminId
        
        if(admin.length === 1) {
            admin[0].orderaccept.map((a,i) => {
                if(admin[0].orderaccept[i]._id === id) {
                    data.push(admin[0].orderaccept[i])
                    
                    status = 'acceptorder'
                    axios.post('http://localhost:5000/admin/pop/'+admin[0]._id+'/'+id+'/'+status)
                        .then(res => console.log(res.data))
                }
                return 0;
            })
        }

        await axios.get('http://localhost:5000/admin')
        .then(res => {
            adminId = res.data[0]._id
            status = 'cancel'
            axios.post('http://localhost:5000/admin/update/'+adminId+'/'+status, data)
            .then(res => console.log(res.data))
        });
        window.location.reload();
    }

    async function acceptcancel(id) {
        let data = []
        let status
        let adminId
        
        if(admin.length === 1) {
            admin[0].ordercancel.map((a,i) => {
                if(admin[0].ordercancel[i]._id === id) {
                    data.push(admin[0].ordercancel[i])
                    
                    status = 'acceptcancel'
                    axios.post('http://localhost:5000/admin/pop/'+admin[0]._id+'/'+id+'/'+status)
                        .then(res => console.log(res.data))
                }
                return 0;
            })
        }

        await axios.get('http://localhost:5000/admin')
        .then(res => {
            adminId = res.data[0]._id
            status = 'accept'
            axios.post('http://localhost:5000/admin/update/'+adminId+'/'+status, data)
            .then(res => console.log(res.data))
        });
        window.location.reload();
    }

    return(
        <div className="orders">
            <h3 className="text-left p-3">Orders</h3>
            <hr className="m-0 mx-3 line" />
                <ul className="nav nav-tabs nav-justified" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="pill" href="#neworders">New Orders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#orderaccepted">Orders Accepted</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#orderscancel">Orders Cancelled</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#ordersdone">Orders Done</a>
                    </li>
                </ul>
            <div className="scroll">
                <div className="tab-content text-dark">
                    <div id="neworders" className="tab-pane active">
                        <table className="table table-striped">
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
                                    user.length === 0
                                    ?
                                    <tr>
                                        <td colSpan='6'>No Records</td>
                                    </tr>
                                    :
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
                    <div id="orderaccepted" className="tab-pane">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Decline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admin.length === 1
                                    ? 
                                    admin[0].orderaccept.map((a,i) => 
                                        <tr key={i}>
                                            <td>{a.fname}</td>
                                            <td>{a.email}</td>
                                            <td>{a.mobileno}</td>
                                            <td>{a.subject}</td>
                                            <td>{a.message}</td>
                                            <td>
                                                <button className="btn border-success text-success mr-2" onClick={() => done(a._id)}>Done</button>
                                                <button className="btn border-danger text-danger mr-2" onClick={() => declineaccept(a._id)}>Decline</button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan='6'>No Records</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div id="orderscancel" className="tab-pane">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Accept</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admin.length === 1
                                    ? 
                                    admin[0].ordercancel.map((a,i) => 
                                        <tr key={i}>
                                            <td>{a.fname}</td>
                                            <td>{a.email}</td>
                                            <td>{a.mobileno}</td>
                                            <td>{a.subject}</td>
                                            <td>{a.message}</td>
                                            <td>
                                                <button className="btn border-success text-success mr-2" onClick={() => acceptcancel(a._id)}>Accept</button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan='6'>No Records</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div id="ordersdone" className="tab-pane">
                         <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admin.length === 1
                                    ? 
                                    admin[0].orderdone.map((a,i) => 
                                        <tr key={i}>
                                            <td>{a.fname}</td>
                                            <td>{a.email}</td>
                                            <td>{a.mobileno}</td>
                                            <td>{a.subject}</td>
                                            <td>{a.message}</td>
                                            <td>
                                                <button className="btn border-success text-success mr-2" disabled><span className="glyphicon glyphicon-ok"></span>Done</button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan='6'>No Records</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;