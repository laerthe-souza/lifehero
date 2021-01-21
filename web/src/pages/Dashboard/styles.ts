import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

export const Content = styled.main`
  position: relative;
  width: 100vw;
  max-width: 120.8rem;
  padding: 3.2rem 3rem;
  margin: 0rem auto;

  h1 {
    margin: 3rem 0;
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 100px;
    margin-right: 3rem;
  }

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    font: normal 2rem Roboto, sans-serif;
    color: #13131a;
  }

  div a {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
      border: 2px solid transparent;
      border-radius: 50%;
      margin: 0 0 0 2rem;
      object-fit: cover;
      transition: border 0.4s;

      &:hover {
        border: 2px solid #1ac92c;
      }
    }
  }

  div a:nth-child(1) button {
    margin: 0;
    padding: 0 8rem;
    height: 7rem;
  }

  div > button {
    margin-left: 2rem;
    width: 7rem;
    height: 7rem;
    border-radius: 0.8rem;
    background-color: #1ac92c;
    transition: background-color 0.4s;

    &:hover {
      background-color: ${shade(0.2, '#1ac92c')};
    }
  }
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2.4rem;
  list-style: none;

  li {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 2.4rem;
    border-radius: 0.8rem;
    position: relative;

    button {
      position: absolute;
      right: 2.4rem;
      top: 2.4rem;
      border: 0;
      color: #737380;
      background: none;
      transition: color 0.2s;

      & + a button {
        right: 7rem;
      }

      &:hover {
        color: #1ac92c;
      }
    }

    p {
      color: #737380;
      line-height: 2.1rem;
      font: normal 1.8rem Roboto, sans-serif;
    }

    p + strong {
      margin-top: 3.2rem;
    }

    strong {
      display: block;
      margin-bottom: 1.6rem;
      font: bold 1.6rem Roboto, sans-serif;
      color: #41414d;
    }

    div.imagesContainer {
      position: relative;
      height: 10rem;
      display: grid;
      grid-gap: 5px;
      grid-template-columns: repeat(5, 1fr);

      img {
        width: 100%;
        height: 10rem;
        object-fit: cover;
        border-radius: 1rem;
      }
    }
  }
`;
