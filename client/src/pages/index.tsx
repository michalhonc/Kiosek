import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { FaceAPI } from '../components/FaceAPI';
import { SnackList } from '../components/SnackList';

const USERS = gql`
{
    users {
        name
        email
        imgId
    }
}
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Name = styled.span`
    font-size: 1.6rem;
`;

const Header = styled.div`
    display: flex;
    height: 22rem;
    margin: 2rem;
    justify-content: space-between;
    align-items: flex-start;
`;

const H1 = styled.h1`
    @font-face {
        font-family: 'kiosekpicus';
        src: URL('/public/kiosekpicus.otf') format('truetype');
    }

    font-family: 'kiosekpicus';
    font-size: 2.2rem;
`;

const HR = styled.hr`
    margin: 2rem;
    border: 1px solid #eee;
`;

export const Index = () => {
    const { loading, error, data } = useQuery(USERS);
    const [name, setName] = useState<string>('');
    const [snacks, setSnacks] = useState<string[]>([]);

    return (
        <Wrapper>

            <Header>
                <div>
                    <H1>Kiosek u Krastyho</H1>
                    <Name>Nakupujici: {name}</Name>
                    {snacks.length > 0 && (
                        <ul>
                            {snacks.map(snack => <li>{snack}</li>)}
                        </ul>
                    )}
                </div>
                <FaceAPI setName={setName} data={data} />
            </Header>

            <HR />

            <SnackList setSnacks={setSnacks} />
        </Wrapper>
    );
};
