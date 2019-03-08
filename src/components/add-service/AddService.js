import React, { Component } from 'react';
import styled from 'styled-components';
import SearchableInput from './../searchable-input/SearchableInput';
import Notification from './../notification/Notify';
import { servicePayload } from './../../config/';
import { colors, spacing } from './../../assets/style/components';

class AddService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            payload: {
                subCategory: "",
                label: "",
                duration: "",
                price: false,
                promotion: false,
                description: ""
            },
            success: false
        }
    }
    handleCategory = (category) => {
        this.setState({
            payload: {...this.state.payload, subCategory: category}
        })
    }
    handleValid = () => {
        const { subCategory, label, duration, price } = this.state.payload
        if ( 
            subCategory.length > 0 &&
            label.length > 0 &&
            duration.length > 0 &&
            price.length > 0
        ) return false;
        return true;
    }
    handlePost = () => {
        this.props.handlePost('services', {...this.state.payload, category: this.props.category})
    }
    render() {
        return (
            <Wrapper open={this.state.open}>
                {this.state.open && (
                    <React.Fragment>
                        <Close 
                            className="icon__cancel" 
                            onClick={() => this.setState({ open: false })}
                        />
                        {servicePayload.map(({ label, type, required }, i) => {
                            if ( label === 'category' ) return (
                                <SearchableInput 
                                    key={label}
                                    options={this.props.categories}
                                    onSelect={this.handleCategory}
                                />
                            );
                            return (
                                <Input 
                                    key={i}
                                    type={type}
                                    required={required}
                                    placeholder={`Add ${label} ${required ? '(REQUIRED)' : ''}`}
                                    value={this.state[label]}
                                    onChange={(e) => this.setState({ payload: {...this.state.payload, [label]: e.target.value }})}
                                />
                            );
                        })}
                    </React.Fragment>
                )}
                <Button 
                    open={this.state.open}
                    onClick={() => this.state.open ? 
                        this.handlePost() :
                        this.setState({ open: true })
                    }
                    disabled={this.state.open && this.handleValid()}
                >
                    ADD NEW SERVICE
                </Button>
                {this.state.success && 
                    <Notification
                        label={this.state.success}
                        action="uploaded"
                    />
                }
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    position: relative;
    border: dashed 2px ${colors.success};
    border-radius: 5px;
    margin-bottom: ${spacing.small};
    background-color: ${colors.white};
    ${props => props.open && `padding: 40px 20px 20px;`}
`;
const Input = styled.input`
    display: block;
    width: 100%;
    height: ${spacing.large};
    padding: 0 ${spacing.xsmall};
    border: 0;
    margin-bottom: ${spacing.xsmall};
    background-color: ${colors.offset};
    font-size: 14px;
    box-shadow: inset 8px 11px 20px 9px rgba(0,0,0,0.05);
`;
const Button = styled.button`
    width: 100%;
    height: ${spacing.large};
    font-weight: bold;
    ${props => props.open && `
        color: ${colors.white};
        background-color: ${colors.success};
    `}
    &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Close = styled.i`
    position: absolute;
    top: 15px; right: 20px;
    font-size: 12px;
    cursor: pointer;
`;

export default AddService;