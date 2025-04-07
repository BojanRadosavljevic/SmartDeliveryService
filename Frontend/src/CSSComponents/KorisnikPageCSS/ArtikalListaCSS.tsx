import { styled } from "styled-components";

export const ListaArtikala = styled.div`
    display: flex;
    height: 80vh;
    width: 95vw;
    border: 2px solid white;
    flex-direction: column;
    overflow: auto;
`;
export const ArtikalUListi = styled.div`
    display: flex;
    height: 25vh;
    width: 90vw;
    border-bottom: 2px solid white;
    padding: 10px 10px;
`;
export const TestualniDeo = styled.div`
    display: flex;
    flex-direction: column;
    width: 45vw;
    justify-content: space-between;
`;
export const ButtonDeo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;

`;
export const ItemsDeo = styled.div`
    display: flex;
    border: 2px solid white;
    width: 15vw;
    justify-content: center;
    border-radius: 5px;
    font: 20px Arial;
`;