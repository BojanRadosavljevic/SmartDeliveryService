import { styled } from "styled-components";

export const ImageDiv = styled.div`
    display : flex;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    top : 0;
    left : 0;
    justify-content : center;
    align-items: center;
    zIndex: 9999;
`;
export const ImageValue = styled.img`
    display: flex;
    width: 85vw;
    height: 75vh;
    position : relative;
    boxShadow: 0 0 20px black;
`;