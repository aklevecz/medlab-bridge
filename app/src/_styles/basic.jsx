import styled from "styled-components";

export const Attento = styled.span`
  color: red;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-row-gap: 2rem;
  margin-bottom: 1rem;
`;

export const Heading = styled.div`
  text-align: center;
  font-size: 8rem;
  grid-column: 2;
  font-weight: 800;
  border-bottom: 1rem white solid;
  width: 53%;
`;

export const ProfileContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-row-gap: 7rem;
  margin: 2rem;

  /* grid-template-columns: 0% 90% 0%; */
`;

export const Header = styled.h1`
  font-size: 4rem;
  grid-column: 2;
  background: #110d0d;
  text-align: center;
  padding: 2rem;
  border: 2px white solid;
  text-shadow: 9px 10px 10px red;
  box-shadow: 10px 8px 20px red;
  margin-bottom: -3rem;
`;

export const Liner = styled.div`
  font-size: 2rem;
  grid-column: 1/2;
  font-weight: 500;
  border-bottom: 0.3rem white dashed;
  padding: 1rem;
  &:first-of-type {
    font-size: 4rem;
  }
  &:last-of-type {
    color: red;
    border-bottom: 0.7rem white dashed;
  }
`;

export const Paragraph = styled.div`
  /* font-size: 2rem;
  font-weight: 600;
  grid-column: 2;
  border-bottom: 1rem white dashed;
  padding-bottom: 1rem; */
  font-size: 1.4rem;
  font-weight: 600;
  grid-column: 2;
  border-bottom: 0.3rem white dashed;
  padding-bottom: 0.6rem;
`;

export const MRow = styled.div`
  grid-column: 2;
`;

export const WhiteButton = styled.div`
  background: white;
  height: 12rem;
  color: black;
  line-height: 12rem;
  text-align: center;
  border-radius: 6rem;
  font-weight: bold;
  font-size: 4rem;
  width: 12rem;
  margin: auto;
  cursor: pointer;
  &:hover {
    background: red;
  }
`;
