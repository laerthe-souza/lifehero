import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1ac92c;

  main {
    width: 30%;
    padding: 30px;
    background-color: #fff;
    border-radius: 0.8rem;

    form {
      text-align: center;

      h1 {
        font: 700 3rem Roboto, sans-serif;
        color: #13131a;
        margin-bottom: 1.5rem;
      }

      button {
        margin-top: 20px;
        width: 70%;
        padding: 15px 10px;
        background-color: #1ac92c;
        border-radius: 8px;
        font-weight: 500;
        color: #fff;
        transition: background-color 0.2s;

        &:hover {
          background-color: ${shade(0.4, '#1ac92c')};
        }
      }
    }
  }
`;
