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
    margin: 2rem;
`;

const ListItem = styled.li`
    display: flex;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 0.4rem 1rem;
    font-size: 1.6rem;
    margin: 0.6rem 0;
    align-items: center;
    width: 100%;
    justify-content: space-between;
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
            <span>{snack.name}</span>
            <Button onClick={() => setSnacks((prev) => {
                const next = [...prev];
                next.splice(index, 1);
                return next;
            })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g className="color"><path d="M.44 28.73L28.73.44l2.83 2.83L3.27 31.56.44 28.73z"/><path d="M31.56 28.73L3.27.44.44 3.27l28.29 28.29 2.83-2.83z"/></g></svg>
            </Button>
        </ListItem>
    );
};

export const TransactionList = ({ setSnacks, snacks }: ITransactionListProps) => {
    return (
        <Wrapper>
            <H3>Kosik</H3>
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
