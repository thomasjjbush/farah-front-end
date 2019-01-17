import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSpecificConfig } from './../../actions/configuration';
import { fetchServices } from './../../actions/services';
import { configuration } from './../../config/';
import Hero from './../../components/hero/Hero';
import Services from './../../components/services/Services';
import ServiceWidget from './../../components/service/ServiceWidget';
import './Service.css';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.location.pathname.split('/').pop(),
            loading: true
        }
    }
    async componentDidMount() {
        if ( !this.props.configuration[this.state.service] || !this.props.services[this.state.service] ) {
            await this.props.fetchSpecificConfig(`config/${this.state.service}`);
            await this.props.fetchServices(`services/${this.state.service}`);
            this.setState({
                loading: false
            })
        } else {
            this.setState({ loading: false }, () => {
                this.props.fetchSpecificConfig(`config/${this.state.service}`);
                this.props.fetchServices(`services/${this.state.service}`);
            })
        }
    }
    render() {
        if ( this.state.loading ) return <div>Loading!</div>
        return (
            <section className="service">
                <Hero 
                    title={this.state.service}
                    color={this.props.configuration[this.state.service].color}
                />
                <p className="service__description">{this.props.configuration[this.state.service].description}</p>
                <div className="service__services">
                    <Services 
                        services={this.props.services[this.state.service]}
                        color={this.props.configuration[this.state.service].color}
                    />
                </div>
                <div className="service__links">
                    {Object.keys(configuration).filter(route => route !== this.state.service).map((service) => {
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
                </div>
            </section>
        );
    }
}

const mapStateToProps = (store) => ({
    configuration: store.configuration,
    services: store.services
})

const mapDispatchToProps = {
    fetchSpecificConfig: fetchSpecificConfig,
    fetchServices: fetchServices
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Service));