import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from './../../assets/style/components';

const DropDown = (props) => {
    const onSelect = (e) => {
        if ( props.arg ) return props.onChange(props.arg, e);
        props.onChange(e)
    }
    return (
        <Select 
            onChange={(e) => onSelect(e.target.value)} 
            defaultValue={props.defaultValue}
        >
            {props.options.map((option) => {
                return (
                    <Option key={option} value={option}>{option}</Option>
                );
            })}
        </Select>
    );
}
const Select = styled.select`
    height: 100%;
    padding: ${spacing.xsmall} 30px ${spacing.xsmall} ${spacing.xsmall};
    border: 0;
    border-radius: 0;
    appearance: none;
    background: ${colors.white} url(${require('./../../assets/img/dropdown.png')}) no-repeat right 10px center;
    background-size: 10px 5px;
    font-weight: bold;
    text-transform: uppercase;
`;
const Option = styled.option``;

export default DropDown;