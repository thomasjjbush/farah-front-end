import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update } from './../../helpers/fetch';
import { fetchSpecificConfig } from './../../actions/configuration';
import { fetchServices } from './../../actions/services';
import UpdateConfig from './../../components/update-config/UpdateConfig';
import Search from './../../components/search/Search';
import DropDown from './../../components/dropdown/DropDown';
import UpdateService from './../../components/update-service/UpdateService';
import './editor.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            search: ""
        }
    }
    async componentDidMount() { 
        await this.props.fetchSpecificConfig(`config/${this.props.service}`);
        await this.props.fetchServices(`services/${this.props.service}`);
        this.setState({
            loading: false,
            category: Object.keys(this.props.services[this.props.service])[0]
        })
    }
    async componentWillReceiveProps(nextProps) {
        if (this.props.service !== nextProps.service) {
            this.setState({
                loading: true
            }, async () => {
                await this.props.fetchSpecificConfig(`config/${this.props.service}`);
                await this.props.fetchServices(`services/${this.props.service}`);
                this.setState({
                    loading: false,
                    category: Object.keys(this.props.services[this.props.service])[0]
                })
            })
        }
    }
    handleSearchBar = (key, val) => {
        this.setState({ [key] : val })
    }
    render() {
        if ( this.props.service === 'dashboard' || this.state.loading ) return <p>Loading!</p>
        return (
            <section className="editor">
                {/* <UpdateConfig
                    service={this.props.service}
                    description={description}
                    color={color}
                    onUpdate={1}
                /> */}
                <div className="editor__search">
                    <DropDown
                        defaultValue={this.props.category}
                        options={Object.keys(this.props.services[this.props.service])}
                        onChange={this.handleSearchBar}
                        arg="category"
                    />
                    <Search 
                        value={this.state.search}
                        onChange={this.handleSearchBar}
                        arg="search"
                    />
                </div>
                <div className="editor__services">
                    <div className="editor__services--results">
                        {this.props.services[this.props.service][this.state.category].filter(service => service.label.includes(this.state.search)).map((service) => {
                            return (
                                <UpdateService
                                    key={service._id}
                                    service={service}
                                    handleUpdate={this.handleUpdate}
                                />
                            );
                        })}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor);