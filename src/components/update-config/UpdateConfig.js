import React, { Component } from 'react';
import styled from 'styled-components';
import { spacing } from './../../assets/style/components';

export default class UpdateConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            description: this.props.description
        }
    }
    render() {
        return (
            <Wrapper>
                
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: ${spacing.medium};
    box-shadow: 0px 0px 35px -1px rgba(0,0,0,0.25);
`;