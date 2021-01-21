import styled from 'styled-components';

export const Content = styled.div`
  width: 80%;
  height: 85%;
  padding: 8rem;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: opacity 0.7s;

  form {
    width: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;

    section.first {
      display: flex;

      > div {
        margin-top: 0.8rem;
      }

      div:nth-child(1) {
        width: 50%;
        margin-right: 0.8rem;

        > input {
          width: 100%;
        }
      }

      div:nth-child(2) {
        flex: 1;

        > input {
          width: 100%;
        }
      }

      & + div {
        margin-top: 1rem;
      }
    }

    section.second {
      display: flex;

      > div {
        margin-top: 0.8rem;
      }

      div:nth-child(1) {
        flex: 1;
        margin-right: 0.8rem;

        > select {
          width: 100%;
        }
      }

      div:nth-child(2) {
        width: 65%;

        > select {
          width: 100%;
        }
      }
    }
  }
`;

export const ContainerText = styled.div`
  width: 100%;
  max-width: 380px;

  img {
    width: 200px;
  }

  h1 {
    margin: 4rem 0;
    font: bold 4rem Roboto, sans-serif;
    color: #13131a;
  }

  p {
    font: normal 1.8rem Roboto, sans-serif;
    color: #737380;
  }

  a button {
    margin-top: 4rem;
    float: left;
    background: 0;
    outline: 0;
    border: 0;

    display: flex;
    align-items: center;

    font: bold 1.8rem Roboto, sans-serif;
    color: #41414d;

    svg {
      margin-right: 1rem;
    }
  }
`;
