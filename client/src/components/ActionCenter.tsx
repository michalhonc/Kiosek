import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const StyledActionCenter = styled.div`
    display: flex;
`;

export const ActionCenter = () => {
    const handleBuy = () => {
        
    };

    return (
        <StyledActionCenter>
            <Button onClick={handleBuy}>Koupit</Button>

        </StyledActionCenter>
    );
};
