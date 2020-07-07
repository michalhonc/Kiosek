import React from 'react';
import styled from 'styled-components';

import { ISnack } from './SnackList';

interface ITransactionProps {
    snack: ISnack;
    index: number;
    setSnacks: (snacks: (item: ISnack[]) => ISnack[]) => void;
}

interface ITransactionListProps {
    snacks: ISnack[];
    setSnacks: (snacks: (item: ISnack[]) => ISnack[]) => void;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 4rem 2rem;
    margin: -2rem 0;
    max-height: calc(100vh - 4rem);
    overflow: auto;
`;

const ListItem = styled.li`
    display: flex;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 0.4rem 1rem;
    font-size: 1.6rem;
    margin: 1rem 0;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.8rem;
}
`;

const UnorderedList = styled.ul`
`;

const H3 = styled.h3`
    font-weight: bold;
    font-size: 2rem;
`;

const Button = styled.button`
    & > svg {
        width: 2.4rem;
        height: 2.4rem;
        fill: #c00;
    }
`;

const Transaction = ({ snack, setSnacks, index }: ITransactionProps) => {
    return (
        <ListItem>
            <img
                src={`http://localhost:4001/snacks/${snack.imgId}.jpg`}
                width="56"
                height="56"
                alt={snack.name}
            />
            <span>{snack.price} Kč</span>
            <Button onClick={() => setSnacks((prev) => {
                const next = [...prev];
                next.splice(index, 1);
                return next;
            })}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.439941 21.8575L21.8575 0.439941L24 2.58245L2.58245 24L0.439941 21.8575Z" />
                <path d="M24 21.8575L2.58245 0.439941L0.439941 2.58245L21.8575 24L24 21.8575V21.8575Z" />
            </svg>
            </Button>
        </ListItem>
    );
};

export const TransactionList = ({ setSnacks, snacks }: ITransactionListProps) => {
    return (
        <Wrapper>
            <H3>Košík</H3>
            <UnorderedList>
                {snacks.map((snack, i) => (
                    <Transaction
                        key={i}
                        setSnacks={setSnacks}
                        snack={snack}
                        index={i}
                    />
                ))}
            </UnorderedList>
        </Wrapper>
    );
};
