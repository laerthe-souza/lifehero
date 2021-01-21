import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #1ac92c, #33ff33);

  main {
    padding: 20px 60px;
    background-color: white;
    border-radius: 12px;

    h1 {
      font: 700 30px Roboto;
      text-align: center;
    }

    hr {
      margin-bottom: 30px;
    }

    h3 {
      font: 500 20px Roboto;
      color: #41414d;
    }

    p {
      font: normal 18px Roboto;
      color: #737380;

      & + h3 {
        margin-top: 20px;
      }
    }

    div {
      margin-top: 30px;
      display: flex;
      justify-content: center;

      button {
        padding: 12px 15px;
        background-color: #1ac92c;
        outline: 0;
        border: 0;
        border-radius: 8px;
        font: 600 14px Roboto;
        color: #fff;
        transition: background-color 0.2s;

        & + button {
          margin-left: 10px;
        }

        &:hover {
          background-color: ${shade(0.2, '#1ac92c')};
        }
      }
    }
  }
`;
