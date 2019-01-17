import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ServiceWidget = (props) => {
    const Wrapper = styled(Link)`
        flex: 1;  
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background-image: url(${require(`./../../assets/img/${props.path}.jpg`)});
        background-size: cover;
        background-position: center;
        &:before {
            content: "";
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            transition: opacity 0.15s linear;
            background-color: ${props.color};
            opacity: 0.5;
        }
        &:hover {
            opacity: 0.85;
        }
    `;
    const Title = styled.h1`
        text-transform: uppercase;
    `;
    return (
        <Wrapper to={`/service/${props.path}`}>
            <Title>{props.path}</Title>
        </Wrapper>
    );
}

export default ServiceWidget;