import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { FaceAPI } from '../components/FaceAPI';
import { TransactionList } from '../components/TransactionList';
import { ISnack, SnackList } from '../components/SnackList';

const USERS_SNACKS = gql`
{
    users {
        name
        email
        imgId
    }
    snacks {
        name
        quantity
        price
        imgId
        extra
    }
}
`;

const Wrapper = styled.div`
    display: flex;
`;

const Name = styled.span`
    font-size: 1.6rem;
    margin: 0.8rem 0;
`;

const Price = styled.span`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0.8rem 0;
`;

const Header = styled.div`
    flex: 1;
    display: flex;
    margin: 2rem;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    height: calc(100vh - 4rem);
`;

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const H1 = styled.h1`
    font-family: 'kiosekpicus', Arial;
    font-size: 2rem;
    margin-bottom: 2rem;

    &::first-letter {
        font-size: 2.2rem;
        color: #c00;
    }
`;

export const Index = () => {
    const { loading, error, data } = useQuery(USERS_SNACKS);
    const [name, setName] = useState<string>('');
    const [snacks, setSnacks] = useState<ISnack[]>([]);

    return (
        <Wrapper>
            <Header>
                <HeaderLeft>
                    <H1>Kiosek u Krastyho</H1>
                    <Name>Strávník: {name}</Name>
                    <Price>Suma v košíku: {snacks.reduce((a, b) => a + b.price, 0)} Kč</Price>
                </HeaderLeft>
                <FaceAPI
                    setName={setName}
                    data={data}
                />
            </Header>

            <TransactionList
                setSnacks={setSnacks}
                snacks={snacks}
            />

            <SnackList
                setSnacks={setSnacks}
                data={data}
            />
        </Wrapper>
    );
};
