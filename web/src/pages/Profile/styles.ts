import styled from 'styled-components';

interface ProfileProps {
  src: string;
}

interface ContainerProps {
  src: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  background: url(${props => props.src}) no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  padding-bottom: 4rem;

  hr {
    margin-bottom: 2rem;
  }

  form {
    margin-top: -5rem;

    fieldset {
      max-width: 800px;
      width: 100%;
      margin: auto;
      background-color: #fff;
      border-radius: 0.8rem;
      padding: 5rem;
      border: 0;

      label {
        font: normal 2rem Roboto, sans-serif;
        color: #13131a;
      }

      > div {
        margin-top: 1rem;
        margin-bottom: 2rem;
      }

      h1 {
        font: 500 4rem Roboto, sans-serif;
        color: #13131a;
      }

      div#group-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.9rem;

        a {
          margin-right: 2rem;
        }
      }
    }
  }
`;

export const Header = styled.header`
  height: 60vh;
  background-color: #1ac92c;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;

    label.select-images {
      text-align: center;
      width: 20rem;
      margin: 1.5rem 0;
      padding: 2rem 0;
      background-color: #fff;
      color: #1ac92c;
      font: 600 1.8rem Roboto, sans-serif;
      cursor: pointer;
      border-radius: 0.8rem;

      transition: background-color 0.2s;

      &:hover {
        background-color: #fff9;
      }

      & + button {
        margin-left: 10px;
      }
    }

    button.upload-images {
      text-align: center;
      width: 20rem;
      margin: 1.5rem 0;
      padding: 2rem 0;
      background-color: #fff;
      color: #1ac92c;
      font: 600 1.8rem Roboto, sans-serif;
      cursor: pointer;
      border-radius: 0.8rem;

      transition: background-color 0.2s;

      &:hover {
        background-color: #fff9;
      }
    }
  }
`;

export const ProfilePreview = styled.div<ProfileProps>`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1ac92c;

  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  button {
    position: absolute;
    top: 8%;
    right: 5%;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    &:hover {
      width: 40px;
      height: 40px;
      right: 3%;
      transition: 0.2s;
    }
  }
`;
