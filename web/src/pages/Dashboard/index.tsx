import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import notImage from '../../assets/notImage.svg';
import logoImg from '../../assets/logo.svg';
import dashboardImg from '../../assets/dashboardImage.jpg';

import api from '../../services/api';
import Button from '../../components/Button';
import { useLoading } from '../../hooks/loading';
import { useDialogoBox } from '../../hooks/dialogBox';

import { Container, Content, Header, List } from './styles';
import BackgroundImage from '../../components/BackgroundImage';
import { useToast } from '../../hooks/toast';

interface IncidentData {
  id: string;
  title: string;
  description: string;
  value: number;
  views: number;
  images: Array<{
    id: string;
    key: string;
    url: string;
  }>;
}

const Dashboard: React.FC = () => {
  const { signOut, token, user } = useAuth();
  const { callingLoadingFunction } = useLoading();
  const { newConfirm } = useDialogoBox();
  const { addToast } = useToast();
  const { name, profile } = user;

  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteIncident = useCallback(
    async (incidentId: string) => {
      const result = await newConfirm({
        title: 'ALERTA',
        description:
          'Você deseja realmente excluir esse caso? Essa ação não poderá ser desfeita.',
      });

      if (!result) {
        return;
      }

      setIsDeleted(false);

      try {
        await api.delete(`incidents/${incidentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        incidents.splice(incidents.indexOf(incidentId as never), 1);

        setIsDeleted(true);
      } catch (err) {
        console.log(err.response.data);
      }
    },
    [token, incidents, newConfirm],
  );

  useEffect(() => {
    callingLoadingFunction(true);

    api
      .get('incidents/ong', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const incidentsData = response.data;

        setIncidents(incidentsData);

        callingLoadingFunction(false);
      })
      .catch(err => {
        callingLoadingFunction(false);

        addToast({
          type: 'error',
          title: 'Faça seu logon novamente',
          description: err.response.data.message,
        });

        signOut();
      });
  }, [token, isDeleted, callingLoadingFunction, addToast, signOut]);

  return (
    <>
      <BackgroundImage src={dashboardImg} />

      <Container>
        <Content>
          <Header>
            <div>
              <img src={logoImg} alt="Life Hero" />

              <h3>{`Bem vinda, ${name}`}</h3>
            </div>

            <div>
              <Link to="/incidents/create">
                <Button type="button">Cadastar novo caso</Button>
              </Link>

              <Link to="/account">
                <img src={profile || notImage} alt="Foto de perfil" />
              </Link>

              <button type="button" onClick={signOut}>
                <FiPower size={20} color="#fff" />
              </button>
            </div>
          </Header>

          <h1>Casos cadastrados</h1>

          <List>
            {incidents &&
              incidents.map(incident => {
                return (
                  <li key={incident.id}>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteIncident(incident.id);
                      }}
                    >
                      <FiTrash2 size={20} />
                    </button>
                    <Link to={`/incidents/update/${incident.id}`}>
                      <button type="button">
                        <FiEdit size={20} />
                      </button>
                    </Link>

                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>
                      {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(incident.value)}
                    </p>

                    <strong>VISUALIZAÇÕES:</strong>
                    <p>{incident.views}</p>

                    <strong>FOTOS:</strong>
                    <div className="imagesContainer">
                      {incident.images.map(image => (
                        <img
                          key={image.id}
                          src={image.url}
                          alt="Fotos do caso"
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
          </List>
        </Content>
      </Container>
    </>
  );
};
export default Dashboard;
