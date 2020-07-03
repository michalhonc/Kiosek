import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.6);
`;

const Loader = styled.span`
    display: inline-block;
    pointer-events: none;
    background-image: url('/loading.svg');
    background-position: center;
    background-repeat: no-repeat;
    height: 2.2rem;
    width: 100%;
`;

export const Loading = () => {
    return (
        <LoaderWrapper>
            <Loader />
        </LoaderWrapper>
    );
}
