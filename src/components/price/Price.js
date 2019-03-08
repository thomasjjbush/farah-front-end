import React from 'react';
import styled from 'styled-components';
import { spacing, colors } from './../../assets/style/components';

const Price = (props) => {
    const { price, promotion, color } = props;
    return (
        <Item color={color}>
            <Cost strike={promotion > 0}>
                {JSON.stringify(price).includes('.') ? 
                    `£${price}0` :
                    `£${price}.00`
                }
            </Cost>
            {promotion > 0 && 
                <Cost>
                    {JSON.stringify(promotion).includes('.') ? 
                        `£${promotion}0` :
                        `£${promotion}.00`
                    }
                </Cost>
            }
        </Item>
    );
}

const Item = styled.div`
    padding: 5px;
    margin-left: ${spacing.xsmall};
    background-color: ${colors.white};
    border-bottom: solid 5px ${props => props.color};
`;
const Cost = styled.h2`
    margin: 0;
    font-size: 3vmax;
    ${props => props.strike && `
        text-decoration: line-through;
        color: ${colors.error};
    `}
`;
export default Price;