import styled from 'styled-components';
import { shade } from 'polished';
import { animated } from 'react-spring';

interface ContainerProps {
  display: boolean;
}

export const Container = styled(animated.div)<ContainerProps>`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: ${props => (props.display ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const DialogBoxContainer = styled.div`
  position: relative;
  padding: 10px;
  width: 430px;
  min-height: 230px;
  height: auto;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 40px;
    }

    p {
      font: 500 14px Roboto, sans-serif;
    }

    button {
      border: 0;
      background: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  main {
    display: flex;
    justify-content: space-around;
    align-items: center;

    p {
      max-width: 220px;
      width: 100%;
      text-align: center;
      font: 500 16px Roboto, sans-serif;
    }

    form {
      margin: 20px;
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      button {
        margin-top: 20px;
        width: 70%;
        padding: 15px 10px;
        background-color: #1ac92c;
        border-radius: 8px;
        font-weight: 500;
        color: white;
        transition: background-color 0.2s;

        & + button {
          margin-left: 10px;
        }

        &:hover {
          background-color: ${shade(0.4, '#1ac92c')};
        }
      }
    }
  }

  footer {
    display: flex;
    justify-content: center;

    button {
      padding: 8px 15px;
      background-color: #1ac92c;
      border-radius: 8px;
      font-weight: 500;
      color: white;
      transition: background-color 0.2s;

      & + button {
        margin-left: 10px;
      }

      &:hover {
        background-color: ${shade(0.4, '#1ac92c')};
      }
    }
  }
`;
