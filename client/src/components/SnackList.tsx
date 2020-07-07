import React from 'react';
import styled from 'styled-components';

const UnorderedList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    flex: 2;
    padding: 4rem 2rem;
    margin: -2rem 0;
    overflow: auto;
    height: calc(100vh - 4rem);
`;

const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.8rem;

    & > img {
        object-fit: cover;
    }
`;

const Img = styled.img`
    object-fit: cover;
`;
const Name = styled.span`
    font-size: 1.6rem;
`;
const Price = styled.span`
    font-size: 1.8rem;
    font-weight: bold;
`;

export interface ISnack {
    name: string;
    quantity: number;
    price: number;
    imgId: string;
    extra?: string;
}

interface ISnackProps {
    snack: any;
    setSnacks: (snacks: (item: ISnack[]) => ISnack[]) => void;
}

interface ISnackListProps {
    setSnacks: (snacks: (item: ISnack[]) => ISnack[]) => void;
    data: {
        snacks: ISnack[];
    };
}

const Snack = ({ snack, setSnacks }: ISnackProps) => (
    <ListItem onClick={() => {
        setSnacks((prevSnacks: ISnack[]) => {
            const numberOfOccurences = prevSnacks.filter(s => s.imgId === snack.imgId).length;
            if (numberOfOccurences < snack.quantity) {
                return [...prevSnacks, snack];
            }
            return [...prevSnacks];
        });
    }}>
        <Img src={`http://localhost:4001/snacks/${snack.imgId}.jpg`} width="100" height="100" alt={snack.name} />
        <Name>{snack.name}</Name>
        <Price>{snack.price} Kč</Price>
    </ListItem>
);


export const SnackList = ({ setSnacks, data }: ISnackListProps) => {
    return (
        <UnorderedList>
            {data && data.snacks.map((snack, i) => (
                <Snack key={i} snack={snack} setSnacks={setSnacks} />
            ))}
        </UnorderedList>
    );
};
