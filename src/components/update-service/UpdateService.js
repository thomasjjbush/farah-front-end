import React, { Component } from 'react';
import styled from 'styled-components';
import { spacing, colors } from './../../assets/style/components';
import Action from './../action/Action';

class UpdateService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locked: true,
            edit: false,
            loading: true
        }
    }
    async componentWillMount() {
        await this.resetPayload();
        this.setState({
            loading: false
        })
    }
    resetPayload = async () => { // add valid key
        this.setState({
            payload: {
                label: this.props.service.label,
                duration: this.props.service.duration,
                price: this.props.service.price,
                promotion: this.props.service.promotion,
                description: this.props.service.description ? this.props.service.description : undefined
            }
        })
    }
    handleChange = (key, value) => {
        if ( (parseInt(value) > 0) && (key === 'duration' || key === 'price' || key === 'promotion') ) value = Number(value)
        if ( key === 'description' && value === '' ) value = undefined
        this.setState({
            payload: {...this.state.payload, [key]: value}
        })
    }
    checkForUpdates = (key) => {
        return this.state.payload[key] !== this.props.service[key]
    }
    render() {
        if ( this.state.loading ) return null; 
        return (
            <Service>
                <Content>
                    <Data>
                        {Object.keys(this.state.payload).map((key) => {
                            return (
                                <div key={key}>
                                    <Label>{key}</Label>
                                    <Input
                                        value={this.state.payload[key] ? this.state.payload[key] : ""}
                                        onChange={(e) => this.handleChange(key, e.target.value)}
                                        type={key === 'label' || key === 'description' ? "text" : "number"}
                                        disabled={this.state.locked}
                                    />
                                </div>
                            );
                        })}
                    </Data>
                    <Actions>
                        <Action 
                            type='delete'
                            onClick={1}
                            disabled={this.state.locked}
                        />
                        {Object.keys(this.state.payload).some(this.checkForUpdates) &&
                            <React.Fragment>
                                <Action 
                                    type='update'
                                    onClick={1}
                                    disabled={this.state.locked} // check if 
                                />
                                <Action 
                                    type='cancel'
                                    onClick={this.resetPayload}
                                    disabled={this.state.locked}
                                />
                            </React.Fragment>
                        }
                    </Actions>
                </Content>
                <Lock 
                    className="icon__locked" 
                    locked={this.state.locked}
                    onClick={() => this.setState(prevState => ({ locked: !prevState.locked }))}
                />
            </Service>
        );   
    }
}

const Service = styled.div`
    flex: 1;
    display: flex;
    border-radius: ${spacing.xsmall};
    overflow: hidden;
    background-color: ${colors.offset};
`;
const Content = styled.div`
    flex: 1;
    padding: ${spacing.small};
`;
const Data = styled.div`
    display: flex;
    flex-wrap: wrap;
    & > div {
        margin-left: ${spacing.xsmall};
        &:nth-of-type(1) {
            flex: 1;
            margin-left: 0;
        }
        &:nth-of-type(5) {
            width: 100%;
            margin-top: ${spacing.xsmall};
            margin-left: 0;
        }
    }
`;
const Actions = styled.div`
    display: flex;
    margin-top: ${spacing.small};
    & > button {
        margin-right: ${spacing.small};
    }
`;
const Lock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: ${props => props.locked ? colors.error : colors.success};
    cursor: pointer;
`;
const Label = styled.label`
    display: block;
    margin-bottom: ${spacing.xsmall};
    font-size: 8px;
    font-weight: bold;
    text-transform: uppercase;
`;
const Input = styled.input`
    width: 100%;
    height: 50px;
    border: 0;
    padding: 0 ${spacing.small};
    &[type="number"] {
        width: ${spacing.large};
        padding: 0;
        text-align: center;
    }
    ${props => props.invalid && `
        border: solid 1px ${colors.error};
        color: ${colors.error};
    `}
`;

export default UpdateService;