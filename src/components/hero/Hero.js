import React from 'react';
import Farah from './../../assets/img/farah.jpg';
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
            opacity: 0.25;
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
    const Logo = styled.img`
        display: block;
        width: 130px;
        position: absolute;
        top: 20px; right: 20px;
        padding: 20px;
        background-color: white;
    `;
    return (
        <Wrapper>
            <Title>{props.title}</Title>
            <Logo src={Farah} alt="Farah" />
        </Wrapper>
    );
}

export default Hero;