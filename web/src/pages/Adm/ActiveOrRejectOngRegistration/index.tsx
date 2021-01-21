import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { cnpj } from 'cpf-cnpj-validator';
import { isUuid } from 'uuidv4';

import { useLoading } from '../../../hooks/loading';
import api from '../../../services/api';

import { Container } from './styles';
import { useToast } from '../../../hooks/toast';
import { useDialogoBox } from '../../../hooks/dialogBox';

interface Ong {
  name: string;
  email: string;
  cnpj: string;
  city: string;
  uf: string;
  contact: {
    whatsapp: string;
    phone: string;
  };
}

interface RouteParams {
  id: string;
}

const OngData: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const { addToast } = useToast();
  const { callingLoadingFunction } = useLoading();
  const { newPrompt } = useDialogoBox();
  const history = useHistory();

  const [permission, setPermission] = useState(false);
  const [ong, setOng] = useState<Ong>();

  const acceptOng = useCallback(async () => {
    callingLoadingFunction(true);

    await api.patch(`ongs/activeOng/${id}`);

    callingLoadingFunction(false);

    setPermission(false);

    addToast({
      type: 'success',
      title: 'Sucesso ao aceitar pedido',
      description: 'Um e-mail foi enviado para ONG, confirmando a ativação',
    });
  }, [id, callingLoadingFunction, addToast]);

  const rejectOng = useCallback(async () => {
    callingLoadingFunction(true);

    await api.patch(`ongs/rejectOng/${id}`);

    callingLoadingFunction(false);

    setPermission(false);

    addToast({
      type: 'success',
      title: 'Sucesso ao recusar pedido',
      description:
        'Um e-mail foi enviado para ONG, confirmando que a mesma foi recusada',
    });
  }, [id, callingLoadingFunction, addToast]);

  useEffect(() => {
    if (!isUuid(id)) {
      history.push('/');
      return;
    }

    if (!permission) {
      newPrompt({ title: 'INFORME SEUS DADOS', to: 'activeOrRejectOng' }).then(
        result => {
          setPermission(result);
        },
      );
    }

    if (permission) {
      callingLoadingFunction(true);

      api.get(`ongs/${id}`).then(response => {
        const ongData = response.data;

        callingLoadingFunction(false);

        setOng(ongData);
      });
    }
  }, [id, callingLoadingFunction, permission, newPrompt, history]);

  if (!permission) {
    return <></>;
  }

  if (!ong) {
    return (
      <Container>
        <main>
          <h1>404 NOT FOUND</h1>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <main>
        <h1>Dados</h1>
        <hr color="#000" />

        <h3>Nome da ONG:</h3>
        <p>{ong.name}</p>

        <h3>E-mail da ONG:</h3>
        <p>{ong.email}</p>

        <h3>CNPJ da ONG:</h3>
        <p>{cnpj.format(ong.cnpj)}</p>

        <h3>WhatsApp da ONG:</h3>
        <p>{ong.contact.whatsapp}</p>

        <h3>Telefone da ONG:</h3>
        <p>{ong.contact.phone}</p>

        <h3>Cidade da ONG:</h3>
        <p>{ong.city}</p>

        <h3>Estado da ONG:</h3>
        <p>{ong.uf}</p>

        <div>
          <button type="button" onClick={acceptOng}>
            Aceitar pedido
          </button>
          <button type="button" onClick={rejectOng}>
            Recusar pedido
          </button>
        </div>
      </main>
    </Container>
  );
};
export default OngData;
