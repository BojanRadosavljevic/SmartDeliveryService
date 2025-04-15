import { styled } from "styled-components";

export const PocetniDiv = styled.div`
    display: flex;
    flex-direction:column;
    height: 70vh;
    width: 85vw;
    border: 2px solid white;
    overflow: auto;
`;
export const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 60vh;
    justify-content: space-evenly;
`;
export const UnosDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 10px; 
    margin-right: 10px; 
`;
export const ButtonDeo = styled.button`
    width: 100px;
    height: 30px;
    cursor: pointer;
`;