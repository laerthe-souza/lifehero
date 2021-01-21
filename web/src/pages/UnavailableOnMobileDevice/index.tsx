import React from 'react';

import { Container } from './styles';

const UnavailableOnMobileDevice: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Este site está indisponível em dispositivos móveis.</h1>

        <p>
          Sentimos muito por isso, ainda estamos em processo de implementação e
          não disponibilizamos a aplicação na versão mobile. Pedimos que acessem
          pelo seu Computador.
        </p>
      </div>
    </Container>
  );
};

export default UnavailableOnMobileDevice;
