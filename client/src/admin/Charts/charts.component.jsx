import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
// import Switch from 'react-switch';

import './charts.styles.scss';

class Charts extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            admin1: [],
            month: '',
            monthnumber: 0,
            year: 0,
            yearindex: 0
        };
        
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount() {
        var d = new Date()
        if(this.state.month === '') {
            let dat = d.getMonth()
            var month = [0,1,2,3,4,5,6,7,8,9,10,11]
            let monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            this.setState({month: monthname[dat]})
            this.setState({monthnumber: month[dat]})
            $('#month').find('option').each(function(i,e) {
                if(Number($(e).val()) === month[dat]) {
                    $('#month').prop('selectedIndex', i);
                }
            })
            this.setState({year: d.getFullYear()})
            $('#year').find('option').each(function(i,e) {
                if(Number($(e).val()) === this.state.year) {
                    $('#year').prop('selectedIndex', i);
                }
            })
        }
    }
    
    onChange(e) {
        if(e.target.name === 'month') {
            let monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let mon = monthname[e.target.value]
            this.setState({[e.target.name]: mon, monthnumber: Number(e.target.value)})
        } else if(e.target.name === 'year') {
            this.setState({year: Number(e.target.value)})
        }
    }

    render() {

        let admin = this.props.admin
        let user = this.props.user
        let index = this.props.index
        let total, totalmonth, totaltoday
        let graphdates = []
        let done, at, ct, ut, dt
        let year, notpresent

        if(admin.length >= 1) {
            if((typeof index) !== 'undefined') {
                let accepted = admin[0].accepted[index[0]][index[1]][index[2]]
                
                if((typeof accepted) === 'undefined') {
                    let accepted = admin[0].accepted[index[0]][index[1]]
                    let cancelled = admin[0].cancelled[index[0]][index[1]]
                    let doned = admin[0].doned[index[0]][index[1]]
                    let users = admin[0].users[index[0]][index[1]]
                    totaltoday = accepted + cancelled + doned + users

                    console.log(admin[0].Dates.date[index[0]][index[1]] + ' July ' + accepted)
                } else {
                    year = admin[0].Dates.year
                    
                    let accepted = admin[0].accepted[index[0]][index[1]][index[2]]
                    let cancelled = admin[0].cancelled[index[0]][index[1]][index[2]]
                    let doned = admin[0].doned[index[0]][index[1]][index[2]]
                    let users = admin[0].users[index[0]][index[1]][index[2]]
                    totaltoday = accepted + cancelled + doned + users
                    
                    let d = new Date()

                    if(year.includes(this.state.year)) {
                        index[0] = year.indexOf(this.state.year)
                    } else {
                        notpresent = true
                    }
                    
                    if(!admin[0].Dates.month[index[0]].includes(this.state.monthnumber)) {
                        notpresent = true
                    } else { 
                        index[1] = admin[0].Dates.month[index[0]].indexOf(this.state.monthnumber)
                        index[2] = admin[0].Dates.date[index[0]][index[1]].indexOf(d.getDate())
                        done = admin[0].doned[index[0]][index[1]]
                        admin[0].Dates.date[index[0]][index[1]].map(dt => graphdates.push(dt + ' ' + this.state.month))
                    }
                }

                let am = admin[0].accepted[index[0]][index[1]]
                if((typeof am) === 'object'){
                    // let gtotal = 0
                    // for(var i=0; i<year.length; i++) {
                    //     index[1] = i
                    //     let gm = admin[0].accepted[index[0]][index[1]]
                    //     let gt = 0
                    //     gm.map(a => gt = gt + a)
                    //     gtotal = gt + gtotal
                    //     console.log(gtotal);
                    // }
                    let at = 0
                    am.map(a => at = at + a)
    
                    let cm = admin[0].cancelled[index[0]][index[1]]
                    ct = 0
                    cm.map(c => ct = ct + c)
                    
                    let dm = admin[0].doned[index[0]][index[1]]
                    dt = 0
                    dm.map(d => dt = dt + d)
                    
                    let um = admin[0].users[index[0]][index[1]]
                    ut = 0
                    um.map(u => ut = ut + u)
                    totalmonth = at + ct + dt + ut
                } else {
                    am = [am]
                    at = 0
                    am.map(a => at = at + a)
    
                    let cm = [admin[0].cancelled[index[0]][index[1]]]
                    ct = 0
                    cm.map(c => ct = ct + c)
    
                    let dm = [admin[0].doned[index[0]][index[1]]]
                    dt = 0
                    dm.map(d => dt = dt + d)
    
                    let um = [admin[0].users[index[0]][index[1]]]
                    ut = 0
                    um.map(u => ut = ut + u)
                    totalmonth = at + ct + dt + ut
                }
            }

            total = admin[0].orderaccept.length + admin[0].ordercancel.length + admin[0].orderdone.length + user.length
        }


        $(document).ready(function() {
            if(!notpresent) {
                var ctx2 = document.getElementById('Chart3').getContext('2d');
        
                new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: graphdates,
                        datasets: [{
                            label: 'Daily Orders',
                            data: done,
                            backgroundColor: '#dc3545',
                            borderColor: '#dc3545',
                            borderWidth: 1,
                            // fill: false
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Orders Done',
                            fontSize: 25
                        }
                    }
                });
            }

            if((typeof ct) !== 'undefined') {
                let ratio, ctper, dtper
                ratio = ct + dt
                ctper = ct*100/ratio
                
                dtper = dt*100/ratio
                
                var ctx5 = document.getElementById('Chart5').getContext('2d');
    
                new Chart(ctx5, {
                    type: 'pie',
                    data: {
                        labels: ['Cancelled '+ctper+'%', 'Done '+dtper+'%'],
                        datasets: [{
                            label: 'Percentage',
                            data: [ctper,dtper],
                            backgroundColor: ['#dc3545', 'rgb(0,123,255)'],
                            borderColor: ['#dc3545', 'rgb(0,123,255)'],
                            // fill: false
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Ratio of Order Cancelled and Done',
                            fontSize: 20
                        }
                    }
                });
            }
        })

        return (
            <div className="charts">
                <h3 className="text-left p-3">Charts</h3>
                <hr className="m-0 mx-3 line" />
    
                <h3 className="text-left m-3">Orders</h3>
                <div className="viewbox px-3 my-4">
                    <div className="totalview m-auto p-2">
                        <h3>{total}</h3>
                        <h4>Total Orders</h4>
                    </div>
                    <div className="monthlyview m-auto p-2">
                        <h3>{totalmonth}</h3>
                        <h4>Monthly Orders</h4>
                    </div>
                    <div className="todayview m-auto p-2">
                        <h3>{totaltoday}</h3>
                        <h4>Today Orders</h4>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <div className="tab-content text-dark">
                                <select name="month" id="month" onChange={this.onChange}>
                                    <option value="0">January</option>
                                    <option value="1">Febuary</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </select>
                                <select name="year" id="year" onChange={this.onChange}>
                                    {
                                        (typeof year) === 'undefined'
                                        ? false
                                        : year.map((y,i) => <option key={i} name={i} value={y}>{y}</option>)
                                    }
                                </select>
                                {
                                    notpresent
                                    ?   <div id="orderaccept" className="tab-pane active">
                                            <h3>No Records</h3>
                                        </div>
                                    :   <div id="orderaccept" className="tab-pane active">
                                            <canvas id="Chart3" width="200" height="50"></canvas>
                                        </div>
                                }
                            </div>
                        </div>
                    </div> 
                </div>
    
                <h3 className="text-left m-3">Analysis</h3>
                <div className="analysis">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <div><canvas id="Chart5" width="50" height="50"></canvas></div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Charts;