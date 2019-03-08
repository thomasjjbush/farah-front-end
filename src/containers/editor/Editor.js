import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSpecificConfig } from './../../actions/configuration';
import { fetchServices } from './../../actions/services';
import Search from './../../components/search/Search';
import DropDown from './../../components/dropdown/DropDown';
import AddService from './../../components/add-service/AddService';
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
            category: Object.keys(this.props.services[this.props.service])[0] || false
        })
    }
    async componentWillReceiveProps(nextProps) { // THIS IS WHEN USER NAVIGATES TO NEW CATEGORY
        if (this.props.service !== nextProps.service) {
            this.setState({
                loading: true
            }, async () => {
                await this.props.fetchSpecificConfig(`config/${this.props.service}`);
                await this.props.fetchServices(`services/${this.props.service}`);
                this.setState({
                    loading: false,
                    category: Object.keys(this.props.services[this.props.service])[0] || false
                })
            })
        }
    }
    handleSearchBar = (key, val) => { // HANDLE SEARCH INPUT
        this.setState({ [key] : val })
    }
    render() {
        if ( this.state.loading ) return <p>Loading!</p>
        return (
            <section className="editor">
                <div className="editor__search">
                    {this.state.category &&
                        <DropDown
                            defaultValue={this.props.category}
                            options={Object.keys(this.props.services[this.props.service])}
                            onChange={this.handleSearchBar}
                            arg="category"
                        />
                    }
                    <Search 
                        disabled={!this.state.category}
                        value={this.state.search}
                        onChange={this.handleSearchBar}
                        arg="search"
                    />
                </div>
                <div className="editor__new">
                    <AddService 
                        handlePost={this.props.handlePost}
                        category={this.props.service}
                        categories={Object.keys(this.props.services[this.props.service])}
                    />
                </div>
                <div className="editor__services">
                    {Object.keys(this.props.services[this.props.service]).length > 0 &&
                        <div className="editor__services--results">
                            {this.props.services[this.props.service][this.state.category]
                                .filter(service => service.label.toLowerCase().includes(this.state.search.toLowerCase()))
                                .map((service) => {
                                return (
                                    <UpdateService
                                        key={service._id}
                                        service={service}
                                        handleUpdate={this.props.handleUpdate}
                                        handleDel={this.props.handleDel}
                                    />
                                );
                            })}
                        </div>
                    }
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