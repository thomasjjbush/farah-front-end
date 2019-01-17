import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from './../../assets/style/components';

const Action = (props) => {
    return (
        <Button 
            type={props.type}
            disabled={props.disabled} 
            onClick={() => props.onClick()}
        >
            <P className={`icon__${props.type}`}>{props.type}</P>
        </Button>
    );
}

const Button = styled.button`
    padding: ${spacing.small};
    border: solid 2px;
    border-radius: ${spacing.xsmall};
    cursor: pointer;
    background: transparent;
    ${props => props.type === 'delete' && `
        border-color: ${colors.error};
        color: ${colors.error};
        &:hover {
            background-color: ${colors.error};
        }
    `}
    ${props => props.type === 'cancel' && `
        border-color: ${colors.deep};
        color: ${colors.deep};
        &:hover {
            background-color: ${colors.deep};
        }
    `}
    ${props => props.type === 'update' && `
        border-color: ${colors.update};
        color: ${colors.update};
        &:hover {
            background-color: ${colors.update};
        }
    `}
    &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }
    &:hover {
        color: ${colors.white};
    }
`;
const P = styled.p`
    display:flex;
    flex-direction: row-reverse;
    text-transform: uppercase;
    &:before {
        margin-left: ${spacing.xsmall};
    }
`;

export default Action;