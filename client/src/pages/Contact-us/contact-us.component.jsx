import React, {Component} from 'react';
import axios from 'axios';

import './contact-us.styles.scss';

import FormInput from '../../components/form-input/form-input.component';

class Contactus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fname: '',
            email: '',
            mobileno: '',
            subject: '',
            message: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

		const user = {
            fname: this.state.fname,
            email: this.state.email,
            mobileno: this.state.mobileno,
            subject: this.state.subject,
            message: this.state.message
        }
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

		// if (user.email === "sbhavesh@gmail.com" && user.username === "Bhavesh") {
		// 	window.location = '/admin'
		// } else {
		// }

		// this.setState({
		// 	username: '',
		// 	email: ''
		// })
    }
    
    render(){
        return (
            <div className="contactus">
                <div className="conbox" data-aos="fade-up">
                    <div className="title">Contact Us</div>
                    <form className="formbox" onSubmit={this.onSubmit}>
                        <FormInput name="fname" type="text" label="Your Name" onChange={this.onChange} value={this.state.fname} />
                        <FormInput name="email" type="email" label="Email Address" onChange={this.onChange} value={this.state.email} />
                        <FormInput name="mobileno" type="text" label="Mobile" maxLength="10" onChange={this.onChange} value={this.state.mobileno} />
                        <FormInput name="subject" type="text" label="Subject" onChange={this.onChange} value={this.state.subject} />
                        <FormInput name="message" type="textarea" label="Message" onChange={this.onChange} value={this.state.message} />
                        <button className="btn btn-danger w-25 button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Contactus;