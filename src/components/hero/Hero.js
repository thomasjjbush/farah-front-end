import React from 'react';
import styled from 'styled-components';

const Hero = (props) => {
    const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 35vh;
        background-size: cover;
        background-position: center center;
        background-image: url(${require(`./../../assets/img/${props.title}.jpg`)});
        position: relative;
        &:before {
            content: "";
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            transition: opacity 0.15s linear;
            background-color: ${props.color};
            opacity: 0.5;
        }
    `;
    const Title = styled.h1`
        display: inline-block;
        position: relative;
        padding: 12px;
        margin-bottom: -35px;
        font-size: 5vmax;
        text-align: center;
        text-transform: uppercase;
        background-color: ${props.color}
    `;
    return (
        <Wrapper>
            <Title>{props.title}</Title>
        </Wrapper>
    );
}

export default Hero;