import styled from 'styled-components';

interface ImageProps {
  src: string;
}

export const Content = styled.div`
  width: 80%;
  height: 80%;
  padding: 8rem;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    width: 100%;
    max-width: 450px;

    display: flex;
    flex-direction: column;

    > input {
      display: block;
      height: 7rem;
      border: 1px solid #dcdce6;
      border-radius: 0.8rem;
      padding: 0 2.4rem;
      font: normal 1.8rem Roboto, sans-serif;
      color: #41414d;

      & + textarea {
        margin-top: 0.8rem;
      }

      &::placeholder {
        font: normal 1.8rem Roboto, sans-serif;
        color: #a8a8b3;
      }
    }

    > div:nth-child(1) {
      display: none;
    }
  }
`;

export const ImagesContainer = styled.div`
  position: relative;
  height: 10rem;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, 1fr);

  label.image {
    border: 1px dashed #dcdce6;
    border-radius: 1rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
      border-color: #1ac92c;
    }

    p {
      font: 500 1.8rem Roboto;
      color: #a8a8b3;
    }
  }
`;

export const Image = styled.div<ImageProps>`
  position: relative;
  background: url(${props => props.src}) no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 1rem;

  button {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 54% 21% 0% 55% / 0% 0% 61% 55%;
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
