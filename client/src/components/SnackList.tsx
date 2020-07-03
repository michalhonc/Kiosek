import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SNACKS = gql`
{
    snacks {
        name
        price
        quantity
        imgId
        extra
    }
}
`;

const Wrapper = styled.ul`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Snack = ({ snack }: { snack: any }) => (
    <li>
        <img src={snack.imgId} width="56" height="56" />
        <span>{snack.name}</span>
        <span>{snack.price}</span>
    </li>
);

export const SnackList = () => {
    const { loading, error, data } = useQuery(SNACKS);

    return (
        <Wrapper>
            {data && data.snacks.map((snack: any) => (
                <Snack snack={snack} />
            ))}
        </Wrapper>
    );
};
