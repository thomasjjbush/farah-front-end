import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { fetchConfig } from './../../actions/configuration';
import { fetchServices } from './../../actions/services';
import { adminAction, adminNotification } from './../../actions/admin';
import { logout } from './../../actions/auth';
import Editor from './../editor/Editor';
import UpdateConfig from './../../components/update-config/UpdateConfig';
import { configuration } from './../../config/';
import './dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    async componentDidMount() {
        if ( this.props.user.auth ) {
            await this.props.fetchConfig('config');
            this.setState({
                loading: false
            })
        }
    }
    handleDel = async (endpoint) => {
        const res = await this.props.adminAction('delete', endpoint, this.props.user.token);
        if ( res ) this.handleSuccess();
    }
    handlePost = async (endpoint, payload) => {
        const res = await this.props.adminAction('post', endpoint, this.props.user.token, payload);
        if ( res ) this.handleSuccess();
    }
    handleUpdate = async (endpoint, payload) => {
        const res = await this.props.adminAction('update', endpoint, this.props.user.token, payload);
        if ( res ) this.handleSuccess();
    }
    handleSuccess = () => {
        this.props.fetchServices(`services/${this.props.location.pathname.split('/').pop()}`)
    }
    render() {
        if ( !this.props.user.auth ) return <Redirect to="/admin" />
        if ( this.state.loading ) return null;
        const service = this.props.location.pathname.split('/').pop();
        return (
            <section className="dashboard">
                <nav className="dashboard__nav">
                    <Link to="/" className="dashboard__nav--item">
                        <img src={require('./../../assets/img/farah.jpg')} alt="FARAH" />
                    </Link>
                    <NavLink 
                        className="dashboard__nav--item icon__update"
                        activeClassName="dashboard__nav--item--active"
                        to={`/admin/dashboard`}
                        exact
                    >
                        Configuration
                    </NavLink>
                    {Object.keys(configuration).map((route) => {
                        return (
                            <NavLink 
                                key={route}
                                className="dashboard__nav--item icon__update"
                                activeClassName="dashboard__nav--item--active"
                                to={`/admin/dashboard/${route}`}
                            >
                                {route} services
                            </NavLink>
                        );
                    })}
                    <button className="dashboard__nav--item dashboard__nav--item--logout icon__logout" onClick={() => this.props.logout()}>Logout</button>
                </nav>
                <div className="dashboard__editor">
                    {service === 'dashboard' || service === '' ? 
                        <UpdateConfig 
                            config={this.props.configuration}
                            handleUpdate={this.handleUpdate}
                        /> 
                        :
                        <Editor 
                            service={service}
                            handleDel={this.handleDel}
                            handlePost={this.handlePost}
                            handleUpdate={this.handleUpdate}
                        />
                    }
                </div>
                <div className="dashboard__notifications">
                    {this.props.admin.map(({ message, timestamp, error }) => {
                        return (
                            <div key={timestamp} className={`notification icon__${error ? 'warning' : 'tick'}`}>
                                <div className="notification__content">
                                    <p>{message}</p>
                                    <span>{timestamp}</span>
                                </div>
                                <i className="icon__cancel" onClick={() => this.props.adminNotification(timestamp)} />
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (store) => ({
    configuration: store.configuration,
    admin: store.admin,
    user: store.user
})

const mapDispatchToProps = {
    fetchConfig: fetchConfig,
    fetchServices: fetchServices,
    adminAction: adminAction,
    adminNotification: adminNotification,
    logout: logout
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);