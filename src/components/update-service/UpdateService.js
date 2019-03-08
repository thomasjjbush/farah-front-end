import React, { Component } from 'react';
import styled from 'styled-components';
import { spacing, colors } from './../../assets/style/components';

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
                description: this.props.service.description ? this.props.service.description : ""
            },
            locked: true
        })
    }
    handleChange = (key, value) => {
        if ( (parseInt(value) > 0) && (key === 'duration' || key === 'price' || key === 'promotion') ) value = Number(value)
        this.setState({
            payload: {...this.state.payload, [key]: value}
        })
    }
    handleUpdate = async () => {
        const payload = {...this.state.payload,
            category: this.props.service.category,
            subCategory: this.props.service.subCategory
        }
        this.props.handleUpdate(`services/${this.props.service._id}`, payload)
    }
    checkForUpdates = (key) => {
        return this.state.payload[key] !== this.props.service[key]
    }
    render() {
        if ( this.state.loading ) return null; 
        return (
            <Service locked={this.state.locked}>
                <Content locked={this.state.locked} data-label={`${this.state.payload.label}`}>
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
                        {!this.state.locked && 
                            <Action 
                                onClick={() => this.props.handleDel(`services/${this.props.service._id}`)}
                                disabled={this.state.locked}
                                className="icon__delete"
                            >
                                DELETE
                            </Action>
                        }
                        {Object.keys(this.state.payload).some(this.checkForUpdates) && !this.state.locked &&
                            <React.Fragment>
                                <Action 
                                    onClick={() => this.handleUpdate()}
                                    disabled={this.state.locked}
                                    className="icon__update"
                                >
                                    UPDATE
                                </Action>
                                <Action 
                                    onClick={() => this.resetPayload()}
                                    disabled={this.state.locked}
                                >
                                    CANCEL 
                                </Action>
                            </React.Fragment>
                        }
                    </Actions>
                </Content>
                <Lock 
                    className={`icon__${this.state.locked ? 'locked' : 'edit'}`} 
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
    border: solid 2px ${props => props.locked ? colors.error : colors.white};
    overflow: hidden;
    background-color: ${colors.white};
`;
const Content = styled.div`
    flex: 1;
    padding: ${spacing.small};
    position: relative;
    ${props => props.locked && `
        &:after {
            content: attr(data-label);
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            background-color: rgba(0,0,0,0.75);
            color: white;
            font-family: Arial;
            font-weight: bold;
        }
    `}
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
const Action = styled.button`
    padding: ${spacing.small};
    border-radius: 5px;
    background-color: ${colors.black};
    color: ${colors.white};
    font-size: 14px;
    &:before {
        margin-right: ${spacing.xsmall};
    }
    &:nth-of-type(1) {
        margin-right: ${spacing.small};
        background-color: ${colors.error};
    }
`;
const Lock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: ${props => props.locked ? colors.error : colors.black};
    cursor: pointer;
    color: ${colors.white};
`;
const Label = styled.label`
    display: block;
    margin-bottom: ${spacing.xsmall};
    font-size: 8px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: Arial;
`;
const Input = styled.input`
    width: 100%;
    height: 50px;
    border: 0;
    padding: 0 ${spacing.small};
    background-color: ${colors.offset};
    font-size: 14px;
    box-shadow: inset 8px 11px 20px 9px rgba(0,0,0,0.05);
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