import React from 'react';
import styled from 'styled-components';
import { colors } from './../../assets/style/components';

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
                placeholder="Search by service name"
            />
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
    border: 0;
`;
const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: ${colors.black};
    color: ${colors.white};
`;

export default Search;