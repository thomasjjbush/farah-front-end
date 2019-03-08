import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, spacing } from './../../assets/style/components';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rendered: true
        }
    }
    render() {
        return (
            <Background onClick={() => this.setState({ rendered: false })}>
                <Message className={`icon__${this.props.icon}`} error={this.props.error}>
                    {this.props.message}
                </Message>
            </Background>
        );
    }
}

const Background = styled.div`
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.75);
`;
const Message = styled.p`
    padding: ${spacing.medium};
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    text-align: center;
    background-color: ${colors.white};
    font-weight: bold;
    &:before {
        display: block;
        font-size: 30px;
        margin-bottom: ${spacing.small};
        color: ${colors.error};
    }
`;

export default Modal;