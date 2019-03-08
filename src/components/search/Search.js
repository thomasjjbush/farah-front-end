import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from './../../assets/style/components';

const Search = (props) => {
    const onSearch = (e) => {
        if ( props.arg ) return props.onChange(props.arg, e);
        props.onChange(e)
    }
    return (
        <SearchBar>
            <Input
                type="text"
                value={props.value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={props.disabled ? 'No services available' : 'Search by service name'}
                disabled={props.disabled}
            />
            {props.value.length > 0 &&
                <Icon 
                    cancel
                    className="icon__cancel" 
                    onClick={() => onSearch("")} 
                />
            }
            <Icon className="icon__search" />
        </SearchBar>
    );
}

const SearchBar = styled.div`
    flex: 1;
    display: flex;
`;
const Input = styled.input`
    flex: 1;
    padding: ${spacing.xsmall};
    border: 0;
    &[disabled] {
        cursor: not-allowed;
        &::placeholder {
            color: ${colors.error};
        }
    }
`;
const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: ${colors.black};
    color: ${colors.white};
    ${props => props.cancel && `
        font-size: 12px;
        cursor: pointer;
    `}
`;

export default Search;