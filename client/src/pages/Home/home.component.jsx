import React, { useRef } from 'react';
import $ from 'jquery';
import AOS from 'aos';
import axios from 'axios';

import Product from '../Product/product.component';
import Service from '../Services/services.component';
import Aboutus from '../About-us/about-us.component';
import Certificate from '../Certificate/certificate.component';
import Team from '../Team/team.component';
import Contactus from '../Contact-us/contact-us.component';

import './home.styles.scss';
import 'aos/dist/aos.css'
import { useState } from 'react';
import { useEffect } from 'react';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function Home() {
    $(window).scroll(function() {
        if ($(document).scrollTop() > 500) {
            $('.navbar').addClass('affix');
        } else {
            $('.navbar').removeClass('affix');
        }
    })

    $(document).ready(function(){
        $('FormInput').change(function() {
            alert("The Text has being change")
        });
    })

    const [data, setData] = useState({ admindata: [] })
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/admin',);
            setData(result.data)
        };
        fetchData();
    }, [])
    
    const home = useRef(null)
    const product = useRef(null)
    const services = useRef(null)
    const aboutus = useRef(null)
    const certificate = useRef(null)
    const contactus = useRef(null)
    const team = useRef(null)

    const Home1 = () => scrollToRef(home)
    const Product1 = () => scrollToRef(product)
    const Services1 = () => scrollToRef(services)
    const Aboutus1 = () => scrollToRef(aboutus)
    const Certificate1 = () => scrollToRef(certificate)
    const Contactus1 = () => scrollToRef(contactus)
    const Team1 = () => scrollToRef(team)

    let hom = []
    let pro = []
    let about = []
    let service = []
    let cert = []
    let tea = []
    let arrange = []
    let navar = []
    let contentar = []
    if((typeof data.length) !== 'undefined') {
        hom = data[0].home
        pro = data[0].product
        about = data[0].aboutus
        service = data[0].services
        cert = data[0].certificate
        tea = data[0].team
        data[0].arrange.map(ar => arrange.push(ar.name))
    }

    arrange.map((an,i) => {
        switch(an) {
            case 'Product':
                navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Product1}>Product</button></li>)
                contentar.push(<div ref={product} key={i}><Product product={pro} /></div>)
                break
            case 'Services':
                navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Services1}>Services</button></li>)
                contentar.push(<div ref={services} key={i}><Service service={service} /></div>)
                break
            case 'Aboutus':
                navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Aboutus1}>About Us</button></li>)
                contentar.push(<div ref={aboutus} key={i}><Aboutus about={about} /></div>)
                break
            case 'Certificate':
                navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Certificate1}>Certificate</button></li>)
                contentar.push(<div ref={certificate} key={i}><Certificate cert={cert} /></div>)
                break
            case 'Team':
                navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Team1}>Team</button></li>)
                contentar.push(<div ref={team} key={i}><Team team={tea} /></div>)
                break
            case 'Contactus':
                navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Contactus1}>Contact Us</button></li>)
                contentar.push(<div ref={contactus} key={i}><Contactus /></div>)
                break
            default:
                console.log('Nothing')
        };
        return 0
    })


    AOS.init({
        duration: 1200,
    })

    return (
        <div>
            <div className="Home" ref={home}>
                <div className='navbar navbar-dark fixed-top navbar-expand-md'>
                    <a href="true" className='navbar-brand siz'>
                        {
                            (typeof hom.h_logo) === "undefined"
                            ?   <b>[Logo]</b>
                            :   <img src={require('../../Images/'+hom.h_logo)} className="imghome" alt="Product"/>
                        }
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsible">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsible">
                        <ul className="navbar-nav nav ml-auto">
                            <li className="nav-item"><button className="nav-link btn" onClick={Home1}>Home</button></li>
                            {
                                navar.map(n => n)
                            }
                        </ul>
                    </div>
                </div>
                <div data-aos="fade-up">
                    <div className="logo">
                        {
                            (typeof hom.h_logo) === "undefined"
                            ?   <b>[Logo]</b>
                            :   <img src={require('../../Images/'+hom.h_logo)} className="imgho" alt="Product"/>
                        }
                    </div><br/>
                    <div className="compname">{hom.h_title}</div>
                    <div className="moto">{hom.h_moto}</div>
                    <button className="btn btn-danger button" onClick={Contactus1}>Contact Us</button>
                </div>
            </div>
            {
                contentar.map(c => c)
            }
        </div>
    );
}

export default Home;