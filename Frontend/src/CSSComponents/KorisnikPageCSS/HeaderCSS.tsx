import { styled } from "styled-components";

export const HeaderDiv = styled.div`
    background-color:rgb(117, 117, 111),
    color: white;
    height: 35px;
    width: 98vw;
    border: 3px solid white;
    border-radius: 5px;
    display: flex;
    justify-content:space-between;
    align-items: center;
   
`;

export const headerLink = {
    color: "white",
    textDecoration: "none",
    font: "15px Arial",
    marginLeft:"5px",
    marginRight: "10px",
    cursor: "pointer",
};

export const StartDiv = styled.div`
    background-color:rgb(117, 117, 111),
    color: white;
    height: 35px;
    display: flex;
    justify-content:space-between;
    align-items: center;
`;
export const HeaderPlus = styled.div`
    display: flex;
    width: 150px;
    height: 25px;
    border: 3px solid white;
    border-radius: 5px;
    border-top:none;
    align-items: center;
    margin-left:5px;
    cursor: pointer;

     &:hover {
    border-color: gray;
    background-color: #444;
  }
`;
