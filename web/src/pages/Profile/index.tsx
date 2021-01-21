import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiMap,
  FiMapPin,
  FiPhoneCall,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useLoading } from '../../hooks/loading';
import { useDialogoBox } from '../../hooks/dialogBox';
import Input from '../../components/Input/index';
import Button from '../../components/Button';
import Select from '../../components/Select';
import profileImg from '../../assets/profileImage.jpg';
import notImage from '../../assets/notImage.svg';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Header, ProfilePreview } from './styles';
import InputMask from '../../components/InputMask';

interface OngFormData {
  name: string;
  email: string;
  city: string;
  uf: string;
  contact: {
    whatsapp: string;
    phone: string;
  };
}

interface Cities {
  id: number;
  nome: string;
}

interface UFs {
  id: number;
  sigla: string;
}

const Profile: React.FC = () => {
  const {
    user,
    token,
    updateOng,
    deleteOng,
    updateImageProfile,
    deleteImageProfile,
  } = useAuth();
  const { callingLoadingFunction } = useLoading();
  const { newConfirm } = useDialogoBox();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const { profile } = user;

  const [image, setImage] = useState<File>({} as File);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [cities, setCities] = useState<Cities[]>([]);
  const [ufs, setUfs] = useState<UFs[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const handleUpdateOngData = useCallback(
    async (formData: OngFormData) => {
      callingLoadingFunction(true);

      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().trim().required('O nome é obrigatório'),
          email: Yup.string()
            .trim()
            .email('Insira um formato de e-mail válido')
            .required('O e-mail é obrigatório'),
          contact: Yup.object().shape({
            whatsapp: Yup.string().test('text-name', '', function (value = '') {
              const { createError, path } = this;

              if (!value) {
                return createError({
                  path,
                  message: 'O WhatsApp é obrigatório',
                });
              }

              if (!/\(\d{2,}\) \d{4,}-\d{4}/g.test(value)) {
                return createError({
                  path,
                  message: 'Insira um número de WhatsApp válido',
                });
              }

              return true;
            }),
            phone: Yup.string().test('text-name', '', function (value) {
              const { createError, path } = this;

              if (!value) {
                return true;
              }

              if (!/\(\d{2,}\) \d{4,}-\d{4}/g.test(value)) {
                return createError({
                  path,
                  message: 'Insira um número de telefone válido',
                });
              }

              return true;
            }),
          }),
          uf: Yup.string().test('text-name', '', function (value = '') {
            const { createError, path } = this;

            if (value === 'selecione') {
              return createError({ path, message: 'O estado é obrigatório' });
            }

            return true;
          }),
          city: Yup.string()
            .trim()
            .test('text-name', '', function (value = '') {
              const { createError, path } = this;

              if (value === 'selecione') {
                return createError({ path, message: 'A cidade é obrigatória' });
              }

              return true;
            }),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        const data = new FormData();

        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('whatsapp', formData.contact.whatsapp);
        data.append('phone', formData.contact.phone);
        data.append('city', formData.city);
        data.append('uf', formData.uf);

        await updateOng(data);

        setImage({} as File);
        setImagePreview('');

        addToast({
          type: 'success',
          title: 'Cadastro atualizado com sucesso',
          description:
            'Sempre mantenha seus dados atualizados, para não perder possíveis doadores',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        } else {
          addToast({
            type: 'error',
            title: 'Não foi possível atualizar seu cadastro',
            description: err.response.data.message,
          });
        }
      }

      callingLoadingFunction(false);
    },
    [addToast, updateOng, callingLoadingFunction],
  );

  const handleDeleteOng = useCallback(async () => {
    const result = await newConfirm({
      title: 'ALERTA',
      description:
        'Você deseja realmente excluir sua conta? Essa ação não poderá ser desfeita.',
    });

    if (!result) {
      return;
    }

    callingLoadingFunction(true);

    try {
      await api.delete('ongs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      deleteOng();

      callingLoadingFunction(false);

      addToast({
        type: 'success',
        title: 'Cadastro foi excluído com sucesso',
        description: 'Sentimos muito que você tenha nos deixado 😔',
      });
    } catch (err) {
      callingLoadingFunction(false);

      addToast({
        type: 'error',
        title: 'Não foi possível excluir seu cadastro',
        description:
          'Ocorreu um erro ao tentar excluir seus dados. Por favor tente novamente mais tarde',
      });
    }
  }, [addToast, deleteOng, token, callingLoadingFunction, newConfirm]);

  const handleSelectImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.item(0)) {
        return;
      }

      const selectedImage = event.target.files.item(0) as File;

      setImage(selectedImage);

      const selectedImagePreview = URL.createObjectURL(selectedImage);

      setImagePreview(selectedImagePreview);
    },
    [],
  );

  const handleUploadImage = useCallback(async () => {
    callingLoadingFunction(true);

    try {
      const data = new FormData();

      data.append('profile', image);

      await updateImageProfile(data);

      setImagePreview('');

      callingLoadingFunction(false);

      addToast({
        type: 'success',
        title: 'Imagem enviada com sucesso',
        description: 'Sua imagem de perfil foi salva com sucesso',
      });
    } catch (err) {
      callingLoadingFunction(false);

      addToast({
        type: 'error',
        title: 'Erro ao fazer upload da image',
        description:
          'Não foi possível fazer upload da imagem, por favor tente novamente',
      });
    }
  }, [image, addToast, updateImageProfile, callingLoadingFunction]);

  const handleDeleteImageProfile = useCallback(async () => {
    const result = await newConfirm({
      title: 'ALERTA',
      description: 'Você deseja realmente excluir sua imagem de perfil?',
    });

    if (!result) {
      return;
    }

    callingLoadingFunction(true);

    await deleteImageProfile(profile);

    callingLoadingFunction(false);

    addToast({
      type: 'success',
      title: 'Imagem de perfil excluída',
      description: 'Sua imagem de perfil foi excluída com sucesso',
    });
  }, [
    callingLoadingFunction,
    deleteImageProfile,
    addToast,
    profile,
    newConfirm,
  ]);

  const handleSelectUf = useCallback(
    async (ufInitials: string) => {
      const ufFilter = ufs.find(uf => uf.sigla === ufInitials);

      const response = await api.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufFilter?.id}/municipios`,
      );

      setCities(response.data);

      setLoadingCities(false);
    },
    [ufs],
  );

  useEffect(() => {
    api
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufsData = response.data.sort((a: UFs, b: UFs) => {
          if (a.sigla > b.sigla) {
            return 1;
          }
          if (a.sigla < b.sigla) {
            return -1;
          }
          return 0;
        }) as UFs[];

        const ids = ufsData.find(uf => uf.sigla === user.uf) as UFs;

        api
          .get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ids.id}/municipios`,
          )
          .then(responseCities => {
            setCities(responseCities.data);
          });

        setUfs(ufsData);
      });
  }, [user.uf]);

  return (
    <Container src={profileImg}>
      <Header>
        {!imagePreview && !profile && (
          <ProfilePreview key={notImage} src={notImage} />
        )}

        {!imagePreview && profile && (
          <ProfilePreview key={profile} src={profile}>
            <button type="button" onClick={handleDeleteImageProfile}>
              <FiX size={20} color="#c53030" />
            </button>
          </ProfilePreview>
        )}
        {imagePreview && (
          <ProfilePreview key={imagePreview} src={imagePreview}>
            <button
              type="button"
              onClick={() => {
                setImagePreview('');
              }}
            >
              <FiX size={20} color="#c53030" />
            </button>
          </ProfilePreview>
        )}

        <div>
          <label className="select-images" htmlFor="files">
            Selecionar imagem
          </label>
          {imagePreview && (
            <button
              type="button"
              className="upload-images"
              onClick={handleUploadImage}
            >
              Fazer upload
            </button>
          )}
        </div>

        <input
          style={{ display: 'none' }}
          type="file"
          id="files"
          onChange={handleSelectImage}
        />
      </Header>

      <Form initialData={user} onSubmit={handleUpdateOngData} ref={formRef}>
        <fieldset>
          <h1>Seus dados</h1>
          <hr color="#DCDCE5" />

          <label htmlFor="name">Nome da ONG:</label>
          <Input id="name" icon={FiUser} type="text" name="name" />

          <label htmlFor="email">E-mail:</label>
          <Input id="email" icon={FiMail} type="text" name="email" />

          <label htmlFor="whatsapp">WhatsApp:</label>
          <InputMask
            id="whatsapp"
            icon={FaWhatsapp}
            type="text"
            name="contact.whatsapp"
            mask="(99) 99999-9999"
          />

          <label htmlFor="phone">Telefone Fixo:</label>
          <InputMask
            id="phone"
            icon={FiPhoneCall}
            type="text"
            name="contact.phone"
            mask="(99) 9999-9999"
          />

          <label htmlFor="uf">Estado:</label>
          <Select
            style={
              cities.length === 0 ? { color: '#a8a8b3' } : { color: '#41414d' }
            }
            isLoading={false}
            onChange={e => {
              setLoadingCities(true);
              handleSelectUf(e.target.value);
            }}
            icon={FiMap}
            name="uf"
            id="uf"
            ufs={ufs}
          />

          <label htmlFor="city">Cidade:</label>
          <Select
            style={
              cities.length === 0 ? { color: '#a8a8b3' } : { color: '#41414d' }
            }
            isLoading={loadingCities}
            icon={FiMapPin}
            name="city"
            id="city"
            cities={cities}
          />

          <div id="group-buttons">
            <Link to="/dashboard">
              <Button>Voltar para Home</Button>
            </Link>
            <Button type="submit">Salvar alterações</Button>
            <Button type="button" onClick={handleDeleteOng}>
              Excluir seu cadastro
            </Button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
};

export default Profile;
