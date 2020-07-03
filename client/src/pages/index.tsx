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

export const Index = () => {
    const { loading, error, data } = useQuery(USERS);
    const [name, setName] = useState<string>('');

    return (
        <Wrapper>
            <FaceAPI setName={setName} data={data} />
            {name && (
                <>
                    <Name>{name}</Name>
                    <SnackList />
                </>
            )}
        </Wrapper>
    );
};
