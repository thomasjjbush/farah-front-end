import React, { Component } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { spacing, colors } from './../../assets/style/components';

export default class UpdateConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: this.props.config,
            locked: {   
                hair: true,
                beauty: true,
                specialist: true
            }
        }
    }
    handleUpdate = async (key) => {
        const payload = { type: key, ...this.state.config[key] }
        this.props.handleUpdate(`config/${key}`, payload)
    }
    render() {
        return (
            <Wrapper>
                {Object.keys(this.props.config).map((key, i) => {
                    return (
                        <Item key={key} i={i} service={key} color={this.state.config[key].color}>
                            <Content>
                                <Title>{key}</Title>
                                {!this.state.locked[key] &&
                                    <React.Fragment>
                                        <Picker
                                            disableAlpha
                                            color={this.state.config[key].color}
                                            onChange={(e) => this.setState({ config: {...this.state.config, [key]: {...this.state.config[key], color: e.hex}} })}
                                        />
                                        <TextArea
                                            rows="5"
                                            value={this.state.config[key].description}
                                            onChange={(e) => this.setState({ config: {...this.state.config, [key]: {...this.state.config[key], description: e.target.value}} })}
                                        />
                                    </React.Fragment>
                                }
                            </Content>
                            {this.state.config[key] !== this.props.config[key] && !this.state.locked[key] &&
                                <Actions>
                                    <Button className="icon__update" onClick={() => this.handleUpdate(key)}>Save changes</Button>
                                    <Button 
                                        onClick={() => this.setState({ 
                                            config: {...this.state.config, [key]: this.props.config[key]},
                                            locked: {...this.state.locked, [key]: true}
                                        })}
                                    >
                                        Cancel
                                    </Button>
                                </Actions>   
                            }
                            <Lock 
                                className={`icon__${this.state.locked[key] ? 'locked' : 'edit'}`}
                                onClick={() => this.setState(prevState => ({ locked: {...this.state.locked, [key]: !prevState.locked[key]} }))}
                            />
                        </Item>
                    );
                })}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
`;
const Item = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-size: cover;
    position: relative;
    ${props => (`background: url(${require(`./../../assets/img/${props.service}.jpg`)}) center`)}
    &:before {
        content: "";
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        background-color: ${props => props.color};
        opacity: 0.5;
    }
`;
const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: ${spacing.medium};
    z-index: 100;
`;
const Title = styled.h1`
    margin-bottom: ${spacing.small};
    font-size: 50px;
    color: #fff;
`;
const Picker = styled(ChromePicker)`
    width: 100% !important;
    margin-bottom: ${spacing.small};
    
`;
const TextArea = styled.textarea`
    flex: 1;
    display: block;
    width: 100%;
    padding: ${spacing.small};
    border: none;
    resize: none;
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
`;
const Actions = styled.div`
    positon: relative;
    z-index: 100;
    padding: 0 ${spacing.medium} ${spacing.medium} ${spacing.medium};
`;
const Button = styled.button`
    padding: ${spacing.small};
    border-radius: 5px;
    background-color: ${colors.black};
    color: ${colors.white};
    font-size: 14px;
    &:before {
        margin-right: ${spacing.xsmall};
    }
    &:nth-of-type(2) {
        margin-left: ${spacing.small};
        background-color: ${colors.error};
    }
`;
const Lock = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${spacing.medium}; right: ${spacing.medium};
    paddinG: ${spacing.small};
    z-index: 100;
    background-color: #000;
    font-size: 20px;
    color: #fff;
`;