import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from './../../actions/auth';
import { loginFields } from './../../config/';
import Logo from './../../assets/img/farah.jpg';
import './admin.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    render() {
        if ( this.props.user.auth ) return <Redirect to="/admin/dashboard" />
        return (
            <section className="admin">
                <div className={`admin__login admin__login--${this.props.user.error && 'error'}`}>
                    <img src={Logo} alt="FARAH" />
                    {loginFields.map(({ label, type, required }, i) => {
                        return (
                            <input
                                key={i}
                                type={type}
                                placeholder={label}
                                required={required}
                                value={this.state[label]}
                                onChange={(e) => this.setState({ [label]: e.target.value })}
                            />
                        );
                    })}
                    <button 
                        disabled={this.state.username.length === 0 || this.state.password.length === 0}
                        onClick={() => this.props.login(this.state)}
                    >
                        Login
                    </button>
                    {this.props.user.error && 
                        <p className="icon__warning">Incorrect username or password</p>
                    }
                </div>
            </section>
        );
    }
}

const mapStateToProps = (store) => ({
    user: store.user
})

const mapDispatchToProps = {
    login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);