import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchConfig } from './../../actions/configuration';
import Editor from './../editor/Editor';
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
        await this.props.fetchConfig('config');
        this.setState({
            loading: false
        })
    }
    render() {
        if ( this.state.loading ) return null; // return loading
        const service = this.props.location.pathname.split('/').pop()
        return (
            <section className="dashboard">
                <nav className="dashboard__nav">
                    <Link to="/" className="dashboard__nav--item">FARAH</Link>
                    {Object.keys(configuration).map((route) => {
                        return (
                            <NavLink 
                                key={route}
                                className="dashboard__nav--item"
                                activeClassName="dashboard__nav--item--active"
                                to={`/admin/dashboard/${route}`}
                            >
                                {route}
                            </NavLink>
                        );
                    })}
                    <button className="dashboard__nav--item dashboard__nav--item--logout">Logout</button>
                </nav>
                <div className="dashboard__editor">
                    <Editor service={service} />
                </div>
            </section>
        );
    }
}

const mapStateToProps = (store) => ({
    configuration: store.configuration
})

const mapDispatchToProps = {
    fetchConfig: fetchConfig
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);