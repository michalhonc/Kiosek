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
    text-align: center;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 2rem;
`;

const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    width: 20rem;
    height: 20rem;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border-radius: 1.6rem;

    & > span {
        font-size: 1.8rem;
    }
`;

interface ISnackProps {
    snack: any;
    setSnacks: (snacks: (item: string[]) => string[]) => void;
}

const Snack = ({ snack, setSnacks }: ISnackProps) => (
    <ListItem onClick={() => {
        setSnacks((prevSnacks: string[]) => [ ...prevSnacks, snack.name]);
    }}>
        <img src={`http://localhost:4001/snacks/${snack.imgId}.jpg`} width="120" height="120" />
        <span>{snack.name}</span>
        {/*<span>{snack.price}</span>*/}
    </ListItem>
);

interface ISnackListProps {
    setSnacks: (snacks: (item: string[]) => string[]) => void;
}

export const SnackList = ({ setSnacks }: ISnackListProps) => {
    const { loading, error, data } = useQuery(SNACKS);

    return (
        <Wrapper>
            {data && data.snacks.map((snack: any) => (
                <Snack key={snack.imgId} snack={snack} setSnacks={setSnacks} />
            ))}
        </Wrapper>
    );
};
