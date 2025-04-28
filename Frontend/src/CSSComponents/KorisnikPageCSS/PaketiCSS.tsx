import { styled } from "styled-components";

export const NaslovniDiv = styled.div`
    display : flex;
    width : 100vw;
    height : 10vh;
    justify-content : center;
    align-items : center;
    font : 35px Arial;
`;
export const ButtonPozadinaDiv = styled.div`
    display : flex;
    width : 100vw;
    height : 10vh;
    justify-content : space-evenly;
    align-items : center;
`;
export const ButtonDiv = styled.div`
    font : 25px Arial;
    color : white;
    border : 3px solid white;
    padding : 5px;
    border-radius : 20px;
    cursor : pointer;

    &&:hover{
        opacity : 0.6;
    }
`;
export const SelectedButtonDiv = styled.div`
    font : 25px Arial;
    color : black;
    border : 3px solid black;
    padding : 5px;
    border-radius : 20px;
    cursor : pointer;
    
    &&:hover{
        opacity : 0.6;
    }
`;
export const ItemDiv = styled.div`
    display : flex;
    width : 100vw;
    height : 6vh;
    border : 2px solid white;
`;
export const SlikaDiv = styled.img`
    display : flex;
    width : 10vw;
    height : 6vh;
`;
