import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConfig } from './../../actions/configuration';
import { configuration } from './../../config/';
import ServiceWidget from './../../components/service/ServiceWidget';
import './home.css';

class Home extends Component {
    componentDidMount() {
        this.props.fetchConfig('config');
    }
    render() {
        return (
            <section className="home">
                <Link className="home__link" to="/">
                    <img 
                        className="home__link--logo"
                        src={require('./../../assets/img/farah.jpg')}
                        alt="FARAH"
                    />
                </Link>
                {Object.keys(configuration).map((service) => {
                    return (
                        <ServiceWidget
                            key={service}
                            path={service}
                            color={
                                this.props.configuration[service] ?
                                this.props.configuration[service].color :
                                service.color
                            }
                        />
                    );
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);