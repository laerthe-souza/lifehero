import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1ac92c;
  color: #fff;

  div {
    max-width: 400px;
    width: 100%;

    h1 {
      margin-bottom: 20px;
      font: 700 18px Roboto, sans-serif;
    }

    p {
      font: 500 13px Roboto, sans-serif;
    }
  }
`;
