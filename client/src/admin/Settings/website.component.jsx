import React, { Component } from 'react';
import Switch from 'react-switch';
import { ReactSortable } from 'react-sortablejs';
import $ from 'jquery';

import './website.styles.scss';
import axios from 'axios';

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            checked2: false,
            admindata: [],
            i: -1,
            selectedFile: null,
            filehome: '',
            filepro: '',
            fileser: '',
            fileab: '',
            filecer: '',
            fileteam: '',
            titletext: '',
            destext: '',
            list: [],
            home: [],
            product: [],
            services: [],
            certificate: [],
            team: [],
            h_logo: [],
            h_title: [],
            h_moto: [],
            p_filename: [],
            p_title: [],
            p_des: [],
            s_filename: [],
            s_des: [],
            a_filename: '',
            a_des: '',
            t_filename: [],
            t_title: [],
            t_job: []
        };

        this.handleChange2 = this.handleChange2.bind(this);
        this.Changelist = this.Changelist.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.onEditHome = this.onEditHome.bind(this);
        this.onEditProduct = this.onEditProduct.bind(this);
        this.onEditService = this.onEditService.bind(this);
        this.onEditAboutus = this.onEditAboutus.bind(this);
        this.onEditCertificate = this.onEditCertificate.bind(this);
        this.onEditTeam = this.onEditTeam.bind(this);
    }

    async componentDidMount() {
        await axios.get('/admin')
        .then(res => {
            if(res.data.length !== 0) {
                this.setState({
                    admindata: res.data[0], 
                    list: res.data[0].arrange,
                    checked2: res.data[0].admindark,
                    p_filename: res.data[0].product.p_filename,
                    p_title: res.data[0].product.p_title,
                    p_des: res.data[0].product.p_des,
                    s_filename: res.data[0].services.s_filename,
                    s_des: res.data[0].services.s_des,
                    a_filename: res.data[0].aboutus.a_filename,
                    a_des: res.data[0].aboutus.a_des,
                    t_filename: res.data[0].team.t_filename,
                    t_title: res.data[0].team.t_title,
                    t_job: res.data[0].team.t_job,
                    h_logo: res.data[0].home.h_logo,
                    h_title: res.data[0].home.h_title,
                    h_moto: res.data[0].home.h_moto,
                    product: res.data[0].product,
                    services: res.data[0].services,
                    aboutus: res.data[0].aboutus,
                    certificate: res.data[0].certificate,
                    team: res.data[0].team
                })
            }
        })
    }
    
    handleChange2() {
        if(this.state.checked2 === true) {
            this.setState({ checked2: false });
        } else {
            this.setState({ checked2: true });
        }
        let data = {admindark: !this.state.checked2}
        let status = 'dark'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
        .then(res => console.log(res.data))
    }

    Changelist() {
        this.state.list.map((item,i) =>
            item.id = i+1
        )
        let status = 'arrange'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, this.state.list)
        .then(res => console.log(res.data))
    }

    onChange(e) {
        let index = e.target.id
        if(e.target.name === 'fileab') {
            this.setState({ selectedFile: e.target.files[0] })
            index = index.replace('#', '')
            if(e.target.value === "") {
                this.setState({fileab: this.state.fileab})
            } else {
                this.setState({fileab: e.target.value.replace("C:\\fakepath\\", '')})
            }
        } else if(e.target.name === 'filehome') {
            this.setState({ selectedFile: e.target.files[0] })
            if((typeof e.target.value) === "undefined" || e.target.value === "") {
                this.setState({filehome: this.state.filehome})
            } else {
                this.setState({filehome: e.target.value.replace("C:\\fakepath\\", '')})
            }
        } else if(e.target.name === 'filepro') {
            index = index.replace('#', '')
            this.setState({ selectedFile: e.target.files[0] })
            if(index === '') {
                this.setState({filepro: e.target.value.replace("C:\\fakepath\\", '')})
            } else {
                if((typeof e.target.value) === "undefined" || e.target.value === "") {
                    this.setState({filepro: this.state.filepro})
                } else {
                    this.setState({filepro: this.state.p_filename[index]})
                    this.state.p_filename.splice(index, 1, e.target.value.replace("C:\\fakepath\\", ''))
                    this.setState({p_filename: this.state.p_filename})
                    console.log(this.state.p_filename)
                }
            }
        } else if(e.target.name === 'fileser') {
            this.setState({ selectedFile: e.target.files[0] })
            if(index === '') {
                this.setState({fileser: e.target.value.replace("C:\\fakepath\\", '')})
            } else {
                if(e.target.value === "") {
                    this.setState({fileser: this.state.fileser})
                } else {
                    this.state.s_filename.splice(index, 1, e.target.value.replace("C:\\fakepath\\", ''))
                    this.setState({s_filename: this.state.s_filename})
                }
            }
        } else if(e.target.name === 'filecer') {
            this.setState({ selectedFile: e.target.files[0] })
            index = index.replace('##', '')
            if(index === '') {
                this.setState({filecer: e.target.value.replace("C:\\fakepath\\", '')})
            } else {
                if(e.target.value === "") {
                    this.setState({filecer: this.state.certificate[index]})
                } else {
                    this.state.certificate.splice(index, 1, e.target.value.replace("C:\\fakepath\\", ''))
                    this.setState({certificate: this.state.certificate})
                }
            }
        } else if(e.target.name === 'fileteam') {
            this.setState({ selectedFile: e.target.files[0] })
            index = index.replace('###', '')
            if(index === '') {
                this.setState({fileteam: e.target.value.replace("C:\\fakepath\\", '')})
            } else {
                if(e.target.value === "") {
                    this.setState({fileteam: this.state.t_filename[index]})
                } else {
                    this.state.t_filename.splice(index, 1, e.target.value.replace("C:\\fakepath\\", ''))
                    this.setState({t_filename: this.state.t_filename})
                }
            }
        }
        else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    onDecline(e) {
        if(e.target.name === 'product') {
            let index = e.target.id.replace('#', '')
            this.state.p_filename.pop(index)
            this.state.p_title.pop(index)
            this.state.p_des.pop(index)
            let data = {
                p_filename: this.state.p_filename,
                p_title: this.state.p_title,
                p_des: this.state.p_des
            }
            let status = 'Product'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))
            window.location.reload();
        } else if(e.target.name === 'service') {
            let index = e.target.id
            this.state.s_filename.pop(index)
            this.state.s_des.pop(index)
            let data = {
                s_filename: this.state.s_filename,
                s_des: this.state.s_des
            }
            let status = 'Service'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))
            window.location.reload();
        } else if(e.target.name === 'certificate') {
            let index = e.target.id
            this.state.certificate.pop(index)
            let data = {
                certificate: this.state.certificate
            }
            let status = 'Certificate'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))
            window.location.reload();
        } else if(e.target.name === 'team') {
            let index = e.target.id.replace('#', '')
            this.state.t_filename.pop(index)
            this.state.t_title.pop(index)
            this.state.t_job.pop(index)
            let data = {
                team: {
                    t_filename: this.state.t_filename,
                    t_title: this.state.t_title,
                    t_job: this.state.t_job
                }
            }
            let status = 'Team'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))
            window.location.reload();
        }
    }

    onEditHome(e) {
        e.preventDefault();
        let filestr = this.state.h_logo
        let titlestr = this.state.h_title
        let desstr = this.state.h_moto
        if(this.state.filehome !== '') {
            filestr = this.state.filehome
        }
        if(this.state.titletext !== '') {
            titlestr = this.state.titletext
        }
        if(this.state.destext !== '') {
            desstr = this.state.destext
        }
        
        let data = {
            home: {
                h_logo: filestr,
                h_title: titlestr,
                h_moto: desstr
            }
        }
        let status = 'Home'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)

        const formdata = new FormData()
        formdata.append('file', this.state.selectedFile)
        axios.post('/admin/upload', formdata)
        .then(res => window.location.reload(true))
        window.location.reload(true)

    }

    onEditProduct(e) {
        e.preventDefault();
        let index = Number(e.target.name)
        if(this.state.filepro !== '') {
            let file = this.state.p_filename
            file[index] = this.state.p_filename[index]
            this.setState({p_filename: file})
        } 
        if(this.state.titletext !== '') {
            let title = this.state.p_title
            title[index] = this.state.titletext
            this.setState({p_title: title})
        } else {
            this.setState({titletext: this.state.p_title[index]})
        }
        if(this.state.destext !== '') {
            let des = this.state.p_des
            des[index] = this.state.destext
            this.setState({p_des: des})
        } else {
            this.setState({destext: this.state.p_des[index]})
        }

        let data = {
            p_filename: this.state.p_filename,
            p_title: this.state.p_title,
            p_des: this.state.p_des
        }
        
        let status = 'Product'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
        .then(res => console.log(res.data))
        
        const formdata = new FormData()
        formdata.append('file', this.state.selectedFile)
        axios.post('/admin/upload', formdata)
        .then(res => window.location.reload(true))
        window.location.reload(true)
        // page is not Refresh after insertion of the file
    }
        
    onEditService(e) {
        let index = Number(e.target.name)
        if(this.state.fileser !== '') {
            let file = this.state.s_filename
            file[index] = this.state.fileser
            this.setState({s_filename: file})
        } 
        if(this.state.destext !== '') {
            let des = this.state.s_des
            des[index] = this.state.destext
            this.setState({s_des: des})
        } else {
            this.setState({destext: this.state.s_des[index]})
            this.setState({s_des: this.state.destext})
        }

        let data = {
            s_filename: this.state.s_filename,
            s_des: this.state.s_des
        }
        let status = 'Service'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
        .then(res => console.log(res.data))

        const formdata = new FormData()
        formdata.append('file', this.state.selectedFile)
        axios.post('/admin/upload', formdata)
        .then(res => window.location.reload(true))

    }

    onEditAboutus() {
        let filestr = this.state.a_filename
        let desstr = this.state.a_des
        if(this.state.fileab !== '') {
            filestr = this.state.fileab
        }
        if(this.state.destext !== '') {
            desstr = this.state.destext
        }

        let data = {
            a_filename: filestr,
            a_des: desstr
        }
        let status = 'Aboutus'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
        .then(res => console.log(res.data))

        const formdata = new FormData()
        formdata.append('file', this.state.selectedFile)
        axios.post('/admin/upload', formdata)
        .then(res => window.location.reload(true))
    }

    onEditCertificate(e) {
        let index = Number(e.target.name)
        if(this.state.filecer !== '') {
            let file = this.state.certificate
            file[index] = this.state.filecer
            this.setState({certificate: file})
        }

        let data = {
            certificate: this.state.certificate
        }
        let status = 'Certificate'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
        .then(res => console.log(res.data))

        const formdata = new FormData()
        formdata.append('file', this.state.selectedFile)
        axios.post('/admin/upload', formdata)
        .then(res => window.location.reload(true))

    }

    onEditTeam(e) {
        let index = Number(e.target.name)
        if(this.state.fileteam !== '') {
            let file = this.state.t_filename
            file[index] = this.state.fileteam
            this.setState({t_filename: file})
        } 
        if(this.state.titletext !== '') {
            let title = this.state.t_title
            title[index] = this.state.titletext
            this.setState({t_title: title})
        } else {
            this.setState({titletext: this.state.t_title[index]})
        }
        if(this.state.destext !== '') {
            let des = this.state.t_job
            des[index] = this.state.destext
            this.setState({t_job: des})
        } else {
            this.setState({destext: this.state.t_job[index]})
        }

        let data = {
            team: {
                t_filename: this.state.t_filename,
                t_title: this.state.t_title,
                t_job: this.state.t_job
            }
        }
        let status = 'Team'
        axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
        .then(res => console.log(res.data))

        const formdata = new FormData()
        formdata.append('file', this.state.selectedFile)
        axios.post('/admin/upload', formdata)
        .then(res => window.location.reload(true))
    }

    onSave(e) {
        // e.preventDefault()
        if(e.target.name === 'product') {
            this.setState({i: 0})
            let file = this.state.p_filename
            let title = this.state.p_title
            let des = this.state.p_des
    
            let filepro = this.state.filepro
            let titletext = this.state.titletext
            let destext = this.state.destext
    
            file.push(filepro)
            title.push(titletext)
            des.push(destext)
    
            this.setState({p_filename: file})
            this.setState({p_title: title})
            this.setState({p_des: destext})
            
            let data = {
                p_filename: this.state.p_filename,
                p_title: this.state.p_title,
                p_des: this.state.p_des
            }
            let status = 'Product'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))

            const formdata = new FormData()
            formdata.append('file', this.state.selectedFile)
            axios.post('/admin/upload', formdata)
            .then(res => window.location.reload(true))

        } else if(e.target.name === 'services') {
            this.setState({i: 0})
            let file = this.state.s_filename
            let des = this.state.s_des
    
            let fileser = this.state.fileser
            let destext = this.state.destext
    
            file.push(fileser)
            des.push(destext)
    
            this.setState({s_filename: file})
            this.setState({s_des: destext})
            
            let data = {
                s_filename: this.state.s_filename,
                s_des: this.state.s_des
            }
            let status = 'Service'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))

            const formdata = new FormData()
            formdata.append('file', this.state.selectedFile)
            axios.post('/admin/upload', formdata)
            .then(res => window.location.reload(true))

        } else if(e.target.name === 'certificate') {
            this.setState({i: 0})
            let file = this.state.certificate
    
            let filecer = this.state.filecer
    
            file.push(filecer)
    
            this.setState({certificate: file})
            
            let data = {
                certificate: this.state.certificate
            }
            let status = 'Certificate'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))

            const formdata = new FormData()
            formdata.append('file', this.state.selectedFile)
            axios.post('/admin/upload', formdata)
            .then(res => window.location.reload(true))

        } else if(e.target.name === 'team') {
            this.setState({i: 0})
            let file = this.state.t_filename
            let title = this.state.t_title
            let job = this.state.t_job
    
            let fileteam = this.state.fileteam
            let titletext = this.state.titletext
            let destext = this.state.destext
    
            file.push(fileteam)
            title.push(titletext)
            job.push(destext)
    
            this.setState({t_filename: file})
            this.setState({t_title: title})
            this.setState({t_job: job})
            
            let data = {
                team: {
                    t_filename: this.state.t_filename,
                    t_title: this.state.t_title,
                    t_job: this.state.t_job
                }
            }
            let status = 'Team'
            axios.post('/admin/update/' + this.state.admindata._id + '/' + status, data)
            .then(res => console.log(res.data))

            const formdata = new FormData()
            formdata.append('file', this.state.selectedFile)
            axios.post('/admin/upload', formdata)
            .then(res => window.location.reload(true))
        }
    }
    
    render() {

        if(this.state.checked2) {
            document.getElementById('dashboard').classList.add('darktheme','bg-dark')
            document.getElementById('website').classList.add('darktheme','bg-dark')
            document.getElementById('charts').classList.add('darktheme','bg-dark')
            document.getElementById('orders').classList.add('darktheme','bg-dark')
            const tab = document.getElementsByClassName("table");
            for(var i=0; i<tab.length; i++) {
                tab[i].classList.add('darktheme','bg-dark')
            }
            const navlink = document.getElementsByClassName("nav-link");
            for(var j=0; j<navlink.length; j++) {
                navlink[j].classList.add('text-light')
            }
            // document.getElementById('orderaccepted').classList.add('darktheme','bg-dark')
            // document.getElementById('ordercancel').classList.add('darktheme','bg-dark')
            // document.getElementById('orderdone').classList.add('darktheme','bg-dark')
            // document.getElementById('orderpending').classList.add('darktheme','bg-dark')
            const navbar = document.getElementsByClassName("navbar");
            for(var k=0; k<navbar.length; k++) {
                navbar[k].classList.add('bg-dark')
            }
            const text = document.getElementsByClassName("span6");
            for(var a=0; a<text.length; a++) {
                text[a].classList.add('bg-dark','text-light')
            }
            const inpu = document.getElementsByTagName("input");
            for(var b=0; b<inpu.length; b++) {
                inpu[b].classList.add('bg-dark','text-light')
            }
        } else {
            $(document).ready(function() {
                document.getElementById('dashboard').classList.remove('darktheme','bg-dark')
                document.getElementById('website').classList.remove('darktheme','bg-dark')
                document.getElementById('charts').classList.remove('darktheme','bg-dark')
                document.getElementById('orders').classList.remove('darktheme','bg-dark')
                const nam = document.getElementsByClassName("table");
                for(var i=0; i<nam.length; i++) {
                    nam[i].classList.remove('darktheme','bg-dark')
                }
                const navlink = document.getElementsByClassName("nav-link");
                for(var j=0; j<navlink.length; j++) {
                    navlink[j].classList.remove('text-light')
                }
                
                // document.getElementById('orderaccepted').classList.remove('darktheme','bg-dark')
                // document.getElementById('ordercancel').classList.remove('darktheme','bg-dark')
                // document.getElementById('orderdone').classList.remove('darktheme','bg-dark')
                // document.getElementById('orderpending').classList.remove('darktheme','bg-dark')
                const navbar = document.getElementsByClassName("navbar");
                for(var k=0; k<navbar.length; k++) {
                    navbar[k].classList.remove('bg-dark')
                }
                const text = document.getElementsByClassName("span6");
                for(var a=0; a<text.length; a++) {
                    text[a].classList.remove('bg-dark','text-light')
                }
                const inpu = document.getElementsByTagName("input");
                for(var b=0; b<inpu.length; b++) {
                    inpu[b].classList.remove('bg-dark','text-light')
                }
            })
        }

        let name = []
        let idname = []
        if(this.state.product.length !== 0) {
            this.state.product.p_title.map(tit => {
                tit = tit.replace(/ /g, '')
                idname.push(tit)
                name.push('#'+tit)
                return 0
            })
        }

        let s_name = []
        let s_idname = []
        if(this.state.services.length !== 0) {
            this.state.services.s_des.map((tit, i) => {
                tit = 's'+i
                s_idname.push(tit)
                s_name.push('#'+tit)
                return 0
            })
        }

        let c_name = []
        let c_idname = []
        if(this.state.certificate.length !== 0) {
            this.state.certificate.map((tit, i) => {
                tit = 'c'+i
                c_idname.push(tit)
                c_name.push('#'+tit)
                return 0
            })
        }

        let t_name = []
        let t_idname = []
        if(this.state.team.length !== 0) {
            this.state.team.t_title.map(tit => {
                tit = tit.replace(/ /g, '')
                t_idname.push(tit)
                t_name.push('#'+tit)
                return 0
            })
        }

        return (
            <div className="website">
                <div className="toppart">
                    <h2 className="text-left p-3">Edit Website</h2>
                    <div className="m-3">
                        <a className="btn border-success text-success mr-2" href="https://desolate-sierra-70172.herokuapp.com/" target="_blank" rel="noopener noreferrer">Publish</a>
                    </div>
                </div>
                <hr className="m-0 mx-3 line" />

                <h3 className="text-left m-3">Dark Themes</h3>

                <div className="text-left m-3 d-flex subtit">
                    <b className="m-3">Admin Dark theme</b>
                    <Switch className="mx-3 my-1"
                        onChange={this.handleChange2} 
                        checked={this.state.checked2}
                        // onColor="#999"
                        // onHandleColor="#fff"
                        // handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0,0,0,0.6)"
                        height={15}
                        width={30} />
                </div>

                <h3 className="text-left m-3">Arrange</h3>
                <div className="m-3 subtit">
                    <ReactSortable
                        tag="ul"
                        group="group"
                        animation={200}
                        delayOnTouchOnly={true}
                        delay={2}
                        list={this.state.list}
                        setList={newState => this.setState({ list: newState })}
                    >
                        {
                            this.state.list.map(item => (
                                <li className="dragli py-2" key={item.id}>{item.name}</li>
                            ))
                        }
                    </ReactSortable>
                </div>
                <div className="text-right mx-3 set">
                    <button 
                        className="btn btn-danger" 
                        onClick={this.Changelist}
                        >
                            Save
                    </button>
                </div>

                <h3 className="text-left m-3">Content Edit</h3>
                {/*Home*/}
                <div className="mx-3 text-left">
                    <h4>Home</h4>
                    <div className="imgabout m-auto">
                        {
                            this.state.h_logo.length === 0
                                ? <img src={require('../../Images/Service.png')} className="imgab" alt="About us"/>
                                : <img src={require('../../uploads/'+this.state.h_logo)} className="imgab" alt="About us"/>
                        }
                    </div>
                    <form className="formbox">
                        <ul className="navbar-nav">
                            <li className="nav-item py-3">
                                <input type="file" name="filehome" onChange={this.onChange} required />
                            </li>
                            <li className="nav-item py-2">
                                <input type="text" name="titletext" placeholder="Add Title" onChange={this.onChange} defaultValue={this.state.h_title} required />
                            </li>
                            <li className="nav-item py-2">
                                <textarea className="span6 w-100" rows="3" name="destext" placeholder="Type Moto Here" onChange={this.onChange} defaultValue={this.state.h_moto} required></textarea>
                            </li>
                            <li className="nav-item text-right">
                                <button className="btn btn-danger" name="about" onClick={this.onEditHome}>Save</button>
                            </li>
                        </ul>
                    </form>
                </div>

                {/*Product*/}
                <div className="mx-3 text-left">
                    <h4>Product</h4>
                    {/*Edit Product*/}
                    <div className="productedit my-3" id="product">
                        {
                            this.state.product.length === 0
                            ? null
                            : this.state.product.p_title.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>{tit}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="product" id={'#'+i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={idname[i]}>
                                            <div className="imgproduct m-auto">
                                                {/* {
                                                    this.state.filepro === ''
                                                    ? <img src={require('../../../public/uploads/'+this.state.p_filename[i])} id="blah" alt="Product"/>
                                                    : <img src={require('../../Images/Service.png')} className="imgab" alt="About us"/>
                                                } */}
                                                {
                                                    this.state.filepro === ''
                                                        ? <img src={require('../../uploads/'+this.state.p_filename[i])} id="blah" alt="Product"/>
                                                        : <img src={require('../../uploads/'+this.state.filepro)} id="blah" alt="Product"/>
                                                }
                                                {/* <img src={require('../../../public/uploads/'+this.state.p_filename[i])} alt="Product"/> */}
                                            </div>
                                            <form className="formbox">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="filepro" id={'#'+i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <input type="text" name="titletext" placeholder="Add Title" onChange={this.onChange} defaultValue={this.state.p_title[i]} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <textarea className="span6 w-100" rows="6" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} defaultValue={this.state.p_des[i]}></textarea>
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditProduct}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>

                    {/*Add Product*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#productadd"><span>Add Product</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="productadd">
                            <div className="imgproduct m-auto">
                                {/* {
                                    this.state.filepro === ''
                                    ? <img src={require('../../Images/Service.png')} alt="Product"/>
                                    : <img src={require('../../Images/'+this.state.filepro)} alt="Product"/>
                                } */}
                            </div>
                            <form className="formbox">
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        {/* Add required */}
                                        <input type="file" name="filepro" onChange={this.onChange} />
                                    </li>
                                    <li className="nav-item py-2">
                                        <input type="text" name="titletext" placeholder="Add Title" onChange={this.onChange} />
                                    </li>
                                    <li className="nav-item py-2">
                                        <textarea className="span6 w-100" rows="6" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} ></textarea>
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger" name="product" onClick={this.onSave}>Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>

                {/*Services*/}
                <div className="m-3 text-left">
                    <h4>Services</h4>
                    {/*Edit Services*/}
                    <div className="productedit my-3">
                    {
                            this.state.product.length === 0
                            ? null
                            : this.state.services.s_des.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>Service {i+1}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={s_name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="service" id={i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={s_idname[i]}>
                                            <div className="imgproduct m-auto">
                                                <img src={require('../../Images/'+this.state.s_filename[i])} alt="Product"/>
                                            </div>
                                            <form className="formbox" action="/upload-ser" method="POST" encType="multipart/form-data">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="fileser" id={i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <textarea className="span6 w-100" rows="6" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} defaultValue={this.state.s_des[i]}></textarea>
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditService}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>
                    
                    {/*Add Services*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#serviceadd"><span>Add Service</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="serviceadd">
                            <div className="imgproduct m-auto">
                                {
                                    this.state.fileser === ''
                                    ? <img src={require('../../Images/Service.png')} alt="Product"/>
                                    : <img src={require('../../Images/'+this.state.fileser)} alt="Product"/>
                                }
                            </div>
                            <form className="formbox">
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        <input type="file" name="fileser" onChange={this.onChange} />
                                    </li>
                                    <li className="nav-item py-2">
                                        <textarea className="span6 w-100" rows="3" name="destext" placeholder="Add Service Description" onChange={this.onChange} ></textarea>
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger" name="services" onClick={this.onSave}>Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>

                {/*About us*/}
                <div className="mx-3 text-left">
                    <h4>About Us</h4>
                    <div className="imgabout m-auto">
                        {
                            this.state.fileab === ''
                            ? (typeof this.state.a_filename) !== 'undefined'
                                ? this.state.a_filename !== ''
                                    ? <img src={require('../../Images/'+this.state.a_filename)} className="imgab" alt="About us"/>
                                    : <img src={require('../../Images/Service.png')} className="imgab" alt="About us"/>
                                : <img src={require('../../Images/Service.png')} className="imgab" alt="About us"/>
                            : <img src={require('../../Images/'+this.state.fileab)} className="imgab" alt="About us"/>
                        }
                    </div>
                    <form className="formbox">
                        <ul className="navbar-nav">
                            <li className="nav-item py-3">
                                <input type="file" name="fileab" onChange={this.onChange} />
                            </li>
                            <li className="nav-item py-2">
                                <textarea className="span6 w-100" rows="10" name="destext" placeholder="About us Content" onChange={this.onChange} defaultValue={this.state.a_des}></textarea>
                            </li>
                            <li className="nav-item text-right">
                                <button className="btn btn-danger" name="about" onClick={this.onEditAboutus}>Save</button>
                            </li>
                        </ul>
                    </form>
                </div>
                
                {/*Certificate*/}
                <div className="m-3 text-left">
                    <h4>Certificate</h4>
                    {/*Edit Certificate*/}
                    <div className="productedit my-3">
                        {
                            this.state.certificate.length === 0
                            ? null
                            : this.state.certificate.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>Certificate {i+1}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={c_name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="certificate" id={i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={c_idname[i]}>
                                            <div className="imgcer m-auto">
                                                <img src={require('../../Images/'+this.state.certificate[i])} className="img" alt="Product"/>
                                            </div>
                                            <form className="formbox">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="filecer" id={'##'+i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditCertificate}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>
                    
                    {/*Add Certificate*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#ceradd"><span>Add Service</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="ceradd">
                            <div className="imgcer m-auto">
                                {
                                    this.state.filecer=== ''
                                    ? <img src={require('../../Images/Service.png')} className="img" alt="Product"/>
                                    : <img src={require('../../Images/'+this.state.filecer)} className="img" alt="Product"/>
                                }
                            </div>
                            <form className="formbox" name="certificate" onSubmit={this.onSave}>
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        <input type="file" name="filecer" onChange={this.onChange} required />
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger">Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>

                {/*Team*/}
                <div className="mx-3 text-left">
                    <h4>Team</h4>
                    {/*Edit Team*/}
                    <div className="productedit my-3" id="product">
                        {
                            this.state.team.length === 0
                            ? null
                            : this.state.team.t_title.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>{tit}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={t_name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="team" id={'#'+i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={t_idname[i]}>
                                            <div className="imgproduct m-auto">
                                                <img src={require('../../Images/'+this.state.t_filename[i])} alt="Product"/>
                                            </div>
                                            <form className="formbox">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="fileteam" id={'###'+i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <input type="text" name="titletext" placeholder="Add Name" onChange={this.onChange} defaultValue={this.state.t_title[i]} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <input type="text" name="destext" placeholder="Add Job Title" onChange={this.onChange} defaultValue={this.state.t_job[i]} />
                                                        {/* <textarea className="span6 w-100" rows="3" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} defaultValue={this.state.p_des[i]}></textarea> */}
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditTeam}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>

                    {/*Add Team*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#teamadd"><span>Add Team</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="teamadd">
                            <div className="imgproduct m-auto">
                                {
                                    this.state.fileteam === ''
                                    ? <img src={require('../../Images/Service.png')} alt="Product"/>
                                    : <img src={require('../../Images/'+this.state.fileteam)} alt="Product"/>
                                }
                            </div>
                            <form className="formbox" name="team" onSubmit={this.onSave}>
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        <input type="file" name="fileteam" onChange={this.onChange} required />
                                    </li>
                                    <li className="nav-item py-2">
                                        <input type="text" name="titletext" placeholder="Add Name" onChange={this.onChange} required />
                                    </li>
                                    <li className="nav-item py-2">
                                        <input type="text" name="destext" placeholder="Add Job Title" onChange={this.onChange} required />
                                        {/* <textarea className="span6 w-100" rows="3" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} required></textarea> */}
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger">Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Website;