import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { post } from './../../helpers/fetch';
import { social, contactFields } from './../../config/';
import './Contact.css';
import { throws } from 'assert';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                name: "",
                email: "",
                message: ""
            }
        }
    }
    handleSubmit = () => {
        this.setState({ loading: true }, async () => {
            try {
                const res = await post('email', this.state.payload)
                if (!res) throw Error;
                this.setState({
                    success: true,
                    loading: false
                })
            }
            catch(err) {
                this.setState({
                    success: false,
                    loading: false
                })
            }
        })
    }
    handleButtonText = (location) => {
        if ( location === "" ) location = 'home';
        return `Return to ${location}`;
    }
    render() {
        return (
            <footer className={`contact ${this.props.open && `contact--open`}`}>
                <div className="contact__tab">
                    <Link 
                        to={this.props.open ? this.props.pathname : `#contact`}
                        className="open"
                    >
                        {this.props.open ? 
                            this.handleButtonText(this.props.pathname.split('/').pop()) :
                            'Contact us'
                        }
                        
                    </Link>
                    <div>
                        {social.map(({ icon, href }, i) => {
                            return (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    className={`social ${icon}`}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="contact__content">
                    <div>
                        {contactFields.map(({ label, type, required }, i) => {
                            return (
                                <input 
                                    key={i}
                                    type={type}
                                    required={required}
                                    placeholder={`Your ${label}`}
                                    value={this.state.payload[label]}
                                    onChange={(e) => this.setState({
                                        payload: {...this.state.payload, [label]: e.target.value}
                                    })}
                                />
                            );
                        })}
                        <button onClick={() => this.handleSubmit()}>Submit</button>
                        {this.state.loading && <span>loading</span>}
                        {this.state.success && <span>Success! woo</span>}
                    </div>
                </div>
            </footer>
        );
    }
}

export default Contact;