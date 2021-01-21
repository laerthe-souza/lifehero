import React from 'react';
import { BounceLoader } from 'react-spinners';

import { Container } from './styles';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading = false }) => {
  return (
    <Container style={isLoading ? { display: 'flex' } : { display: 'none' }}>
      <BounceLoader loading={isLoading} color="#1ac92c" size={100} />
      <h1>Carregando...</h1>
    </Container>
  );
};

export default Loading;
