import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 2rem;
    flex: 2;
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
        setSnacks((prevSnacks: ISnack[]) => [ ...prevSnacks, snack]);
    }}>
        <img src={`http://localhost:4001/snacks/${snack.imgId}.jpg`} width="120" height="120" alt={snack.name} />
        <span>{snack.name}</span>
        {/*<span>{snack.price}</span>*/}
    </ListItem>
);


export const SnackList = ({ setSnacks, data }: ISnackListProps) => {

    return (
        <Wrapper>
            {data && data.snacks.map((snack: any, i) => (
                <Snack key={i} snack={snack} setSnacks={setSnacks} />
            ))}
        </Wrapper>
    );
};
