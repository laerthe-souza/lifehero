import styled from 'styled-components';

interface BackgroundProps {
  src: string;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: flex-start;
`;

export const Content = styled.div`
  position: absolute;
  background: linear-gradient(to right, #f0f5f5 50%, transparent);
  max-width: 90rem;
  width: 100%;
  height: 100%;
  padding: 0 7rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  div#container-content {
    max-width: 47rem;
  }

  img {
    width: 200px;
  }

  footer {
    width: 90%;
    display: flex;
    justify-content: space-between;

    button.helpers {
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
  }

  form {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    h1 {
      margin: 2rem 0;
      font: 500 4rem Roboto, sans-serif;
      color: '#13131A';
    }
  }
`;

export const Background = styled.div<BackgroundProps>`
  margin-left: 250px;
  flex: 1;
  background: url(${props => props.src}) no-repeat;
  background-position: 50% 50%;
  background-size: cover;
`;
