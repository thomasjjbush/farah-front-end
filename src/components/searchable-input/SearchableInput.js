import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, spacing } from './../../assets/style/components';

class SearchableInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: "",
        };
    }
    handleSelect = (value) => {
        this.setState({
            open: false,
            value
        }, () => {
            this.props.onSelect(this.state.value)
        })
    }
    render() {
        return (
            <Wrapper open={this.state.open}>
                <Input 
                    value={this.state.value}
                    placeholder="Add category"
                    onChange={(e) => this.setState({ value: e.target.value })}
                    onFocus={() => this.setState({ open: true })}
                />
                <Icon 
                    open={this.state.open}
                    onClick={() => this.setState(prevState =>({ open: !prevState.open }))}
                />
                {this.state.open &&
                    <Options>
                        {this.state.value.length > 0 && 
                            <Option onClick={() => this.handleSelect(this.state.value)}>
                                {this.state.value}
                            </Option>
                        }
                        {this.props.options.map((option) => {
                            if ( this.state.value === option ) return null;
                            return (
                                <Option 
                                    key={option}
                                    onClick={() => this.handleSelect(option)}
                                >
                                    {option}
                                </Option>
                            );
                        })}
                    </Options>
                }
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    position: relative;
    margin-bottom: ${spacing.xsmall};
    background-color: ${colors.white};
    font-family: Arial;
    border: solid 2px ${colors.black};
    border-radius: 5px;
    box-sizing: border-box;
    i {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        cursor: pointer;
        font-size: 12px;
    }
    ${props => props.open && `
        border-bottom: 0;
    `}
`;
const Input = styled.input`
    flex: 1;
    height: ${spacing.large};
    padding: 0 ${spacing.xsmall};
    border: 0;
    font-size: 14px;
`;
const Options = styled.ul`
    position: absolute;
    top: calc(100% - 3px);
    left: -2px;
    right: -2px;
    padding: ${spacing.xsmall};
    background-color: ${colors.white};
    list-style-type: none;
    border: solid 2px ${colors.black};
    border-top: 0;
    box-sizing: border-box;
`;
const Option = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: ${spacing.medium};
    padding:0 ${spacing.xsmall};
    border-radius: 3px;
    margin-bottom: 2px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        background-color: ${colors.offset};
    }
    &:last-of-type {
        margin-bottom: 0;
    }
`;
const Icon = styled.i`
    background: transparent url(${require('./../../assets/img/dropdown.png')}) no-repeat right 10px center;
    background-size: 10px 5px;
    ${props => props.open && `transform: rotate(180deg);`}
`;
export default SearchableInput;