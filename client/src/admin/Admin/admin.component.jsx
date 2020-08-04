import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import axios from 'axios';
// import $ from 'jquery';

import Dashboard from '../Dashboard/dashboard.component';
import Charts from '../Charts/charts.component';
import Orders from '../Orders/orders.component';
import Website from '../Settings/website.component';

import './admin.styles.scss';

const mql = window.matchMedia(`(min-width: 768px)`);

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            i: 0,
            userdata: [],
            admindata: [],
            date: [],
            month: [],
            year: [],
            index: [],
            accepted: [],
            cancelled: [],
            doned: [],
            users: []
        };
        
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    
    async componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
        await axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({ userdata: res.data });
            });

            
        await axios.get('http://localhost:5000/admin')
            .then(res => {
                this.setState({ admindata: res.data });

                var d = new Date()

                let admindt = this.state.admindata
                let date = this.state.date
                let month  = this.state.month
                let year = this.state.year
                let accepted = this.state.accepted
                let cancelled = this.state.cancelled
                let doned = this.state.doned
                let users = this.state.users
                let index = []
                let status
                if(admindt.length > 0) {
                    this.setState({ date: this.state.admindata[0].Dates.date })
                    this.setState({ month: this.state.admindata[0].Dates.month })
                    this.setState({ year: this.state.admindata[0].Dates.year })
                    this.setState({ accepted: this.state.admindata[0].accepted })
                    this.setState({ cancelled: this.state.admindata[0].cancelled })
                    this.setState({ doned: this.state.admindata[0].doned })
                    this.setState({ users: this.state.admindata[0].users })
                
                    year = this.state.year
                    if(!year.includes(d.getFullYear())) {
                        year.push(d.getFullYear())
                    }
                    index.push(year.indexOf(d.getFullYear()))
                    
                    if(!this.state.month[index[0]]){
                        month = this.state.month
                        month.push(d.getMonth())
                        index.push(month.indexOf(d.getMonth()))
                    } else {
                        month = this.state.month[index[0]]
                        if(!month.includes(d.getMonth())) {
                            month.push(d.getMonth())
                        }
                        index.push(month.indexOf(d.getMonth()))
                    }
                    
                    if(!this.state.date[index[0]]){
                        
                        date = this.state.date
                        let dateout = []
                        dateout.push(d.getDate())
                        date.push(dateout)

                        accepted = this.state.accepted
                        let acceptedout = []
                        acceptedout.push(0)
                        accepted.push(acceptedout)

                        cancelled = this.state.cancelled
                        let cancelout = []
                        cancelout.push(0)
                        cancelled.push(cancelout)

                        doned = this.state.doned
                        let doneout = []
                        doneout.push(0)
                        doned.push(doneout)

                        users = this.state.users
                        let userout = []
                        userout.push(0)
                        users.push(userout)
                    
                    } else if(!this.state.date[index[0]][index[1]]) {

                        date = this.state.date[index[0]]
                        date.push(d.getDate())
                    
                        accepted = this.state.accepted[index[0]]
                        accepted.push(0)

                        cancelled = this.state.cancelled[index[0]]
                        cancelled.push(0)

                        doned = this.state.doned[index[0]]
                        doned.push(0)

                        users = this.state.users[index[0]]
                        users.push(0)

                    } else {

                        let dateout = this.state.date[index[0]]
                        date = dateout[index[1]]

                        let acceptedout = this.state.accepted[index[0]]
                        accepted = acceptedout[index[1]]

                        let cancelout = this.state.cancelled[index[0]]
                        cancelled = cancelout[index[1]]

                        let doneout = this.state.doned[index[0]]
                        doned = doneout[index[1]]

                        let userout = this.state.users[index[0]]
                        users = userout[index[1]]
                        
                        if(!date.includes(d.getDate())) {
                            date.push(d.getDate())
                            accepted.push(0)
                            cancelled.push(0)
                            doned.push(0)
                            users.push(0)
                        }
                        index.push(date.indexOf(d.getDate()))
                        
                        let dt = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()

                        let usercount = 0
                        this.state.userdata.map(use => {
                            if(use.created === dt) {
                                usercount += 1
                            }
                            return 0
                        })
                        users[index[2]] = usercount

                        let acceptedcount = 0
                        this.state.admindata[0].orderaccept.map(ad => {
                            if(ad.created === dt) {
                                acceptedcount += 1
                            }
                            return 0
                        })
                        accepted[index[2]] = acceptedcount

                        let cancelledcount = 0
                        this.state.admindata[0].ordercancel.map(ad => {
                            if(ad.created === dt) {
                                cancelledcount += 1
                            }
                            return 0
                        })
                        cancelled[index[2]] = cancelledcount

                        let donedcount = 0
                        this.state.admindata[0].orderdone.map(ad => {
                            if(ad.created === dt) {
                                donedcount += 1
                            }
                            return 0
                        })
                        doned[index[2]] = donedcount
                    }
                    
                    let data = {
                        year: this.state.year,
                        month: this.state.month,
                        date: this.state.date
                    }
                    let count = {
                        accepted: this.state.accepted,
                        cancelled: this.state.cancelled,
                        doned: this.state.doned,
                        users: this.state.users
                    }
                    
                    status = 'date'
                    axios.post('http://localhost:5000/admin/update/' + admindt[0]._id + '/' + status, data)
                    .then(res => console.log(res.data))
                    status = 'count'
                    axios.post('http://localhost:5000/admin/update/' + admindt[0]._id + '/' + status, count)
                    .then(res => console.log(res.data))

                    this.setState({index: index})
                } else {
                    date.push(d.getDate())
                    month.push(d.getMonth())
                    year.push(d.getFullYear())
                    accepted.push(0)
                    cancelled.push(0)
                    doned.push(0)
                    this.setState({index: [0,0,0]})
                    let usercount = 0
                    let dt = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()
                    this.state.userdata.map(use => {
                        if(use.created === dt) {
                            usercount += 1
                        }
                        return 0
                    })
                    let arrange = [
                        {
                            id: 1,
                            name: 'Product'
                        },
                        {
                            id: 2,
                            name: 'Services'
                        },
                        {
                            id: 3,
                            name: 'Aboutus'
                        },
                        {
                            id: 4,
                            name: 'Certificate'
                        },
                        {
                            id: 5,
                            name: 'Team'
                        },
                        {
                            id: 6,
                            name: 'Contactus'
                        }
                    ]
                    users.push(usercount)
                    let data = {
                        year: year,
                        month: [month],
                        date: [[date]],
                        accepted: [[accepted]],
                        cancelled: [[cancelled]],
                        doned: [[doned]],
                        users: [[users]],
                        arrange: arrange,
                        admindark: false,
                        aboutus : {
                            a_filename: '',
                            a_des: ''
                        },
                        certificate: [],
                        team:{
                            t_filename: [],
                            t_title: [],
                            t_job: []
                        },
                        home: {
                            h_logo: '',
                            h_title: '',
                            h_moto: ''
                        }
                    }
                    console.log(data)
                    console.log('It is empty')
                    status = 'date'
                    axios.post('http://localhost:5000/admin/add/'+status, data)
                    .then(res => console.log(res.data))
                }
            })
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }


    
    render() {
        let index
        if(this.state.index.length !== 0) {
            index = this.state.index
        }

        const sidebar = (
            <div className="text-light side">
                <ul className="nav" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#dashboard">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#charts">Charts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#orders">Orders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="pill" href="#website">Website</a>
                    </li>
                </ul>
            </div>
        )

        const maincontent = (
            <div className="tab-content content text-dark">
                <div id="dashboard" className="tab-pane">
                    <Dashboard user={this.state.userdata} />
                </div>
                <div id="charts" className="tab-pane">
                    <Charts user={this.state.userdata} admin={this.state.admindata} index={index} />
                </div>
                <div id="orders" className="tab-pane">
                    <Orders user={this.state.userdata} admin={this.state.admindata} />
                </div>
                <div id="website" className="tab-pane active">
                    <Website />
                </div>
            </div>
        )

        var Style = {
            sidebar:{
                background: "rgb(60,60,60)",
                top: 60
            },
            content: {
                background: "rgb(60,60,60)",
                top: 60
            }
        }

        

        return(
            <div className="admin">
                <div className='navbar navbar-dark fixed-top navbar-expand-md'>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsible" onClick={() => this.onSetSidebarOpen(true)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a href="/admin" className='navbar-brand'>Admin</a>
                </div>
                <Sidebar
                    sidebar={sidebar}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={Style}
                >
                    {
                        maincontent
                    }
                </Sidebar>
            </div>
        );

    }
}

export default Admin;