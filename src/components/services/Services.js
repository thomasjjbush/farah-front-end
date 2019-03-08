import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, spacing } from './../../assets/style/components';
import DropDown from './../dropdown/DropDown';
import Price from './../price/Price';

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
                        client
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
                                    <Title>{label}</Title>
                                    {description && <Description>{description}</Description>}
                                </div>
                                <Price 
                                    price={price}
                                    promotion={promotion}
                                    color={this.props.color}
                                />
                            </ServiceItem>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const Selector = styled.div`
    height: 100px;
    position: relative;
    padding: 0 ${spacing.medium};
    margin-bottom: ${spacing.xsmall};
    background-color: ${props => props.color};
`;
const ServiceItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacing.xsmall}
    border-left: solid 5px ${props => props.color};
    margin-bottom: ${spacing.xsmall};
    background-color: ${colors.offset};
`;
const Title = styled.h2`
    font-size: 3vmax;
`;
const Description = styled.p`
    font-size: 16px;
    line-height: 14px;
`;

export default Service;
