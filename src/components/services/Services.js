import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, spacing } from './../../assets/style/components';
import DropDown from './../dropdown/DropDown';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: Object.keys(this.props.services)[0]
        }
    }
    handleSelect = (active) => {
        this.setState({ active })
    }
    render() {
        return (
            <div className="services">
                <Selector color={this.props.color}>
                    <DropDown
                        defaultValue={this.props.active}
                        options={Object.keys(this.props.services)}
                        onChange={this.handleSelect}
                    />
                </Selector>
                <div>
                    {this.props.services[this.state.active].map(({ label, promotion, price, description}) => {
                        return (
                            <ServiceItem key={label} color={this.props.color}>
                                <div>
                                    <h2>{label}</h2>
                                    {description && <Description>{description}</Description>}
                                </div>
                                <Price data-promotion={promotion ? `£${promotion}.00` : null} color={this.props.color}>£{price}.00</Price>
                            </ServiceItem>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const Selector = styled.div`
    height: ${spacing.large};
    position: relative;
    padding: 0 ${spacing.medium};
    margin-bottom: ${spacing.xsmall};
    background-color: ${props => props.color};
`;
const ServiceItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${spacing.xsmall}
    border-left: solid ${spacing.xsmall} ${props => props.color};
    margin-bottom: ${spacing.xsmall};
    background-color: ${colors.offset};
`;
const Description = styled.p`
    font-size: 14px;
    line-height: 14px;
`;
const Price = styled.h2`
    flex-direction: column;
    margin-left: ${spacing.medium};
    text-align: right;
    &[data-promotion] {
        text-decoration: line-through;
        color: ${props => props.color};
        background-color: ${colors.white};
    }
    &:after {
        content: attr(data-promotion);
        display: inline-block;
        text-decoration: none;
        color: ${colors.black};
        background-color: ${colors.white};
    }
`;

export default Service;
