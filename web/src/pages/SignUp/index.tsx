import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiLock,
  FiPhoneCall,
  FiMapPin,
  FiMap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { MdGroup } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { cnpj } from 'cpf-cnpj-validator';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useLoading } from '../../hooks/loading';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import signUpImg from '../../assets/signUpImage.jpg';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import BackgroundImage from '../../components/BackgroundImage';
import Select from '../../components/Select';

import { Content, ContainerText } from './styles';
import InputMask from '../../components/InputMask';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  phone: string;
  cnpj: string;
  city: string;
  uf: string;
}

interface UFs {
  id: number;
  sigla: string;
}

interface Cities {
  id: number;
  nome: string;
}

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const { addToast } = useToast();
  const { callingLoadingFunction } = useLoading();
  const history = useHistory();
  const [ufs, setUfs] = useState<UFs[]>([]);
  const [cities, setCities] = useState<Cities[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback(
    async (formData: SignUpFormData) => {
      callingLoadingFunction(true);

      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().trim().required('O nome é obrigatório'),
          email: Yup.string()
            .trim()
            .email('Insira um formato de e-mail válido')
            .required('O e-mail é obrigatório'),
          cnpj: Yup.string().test('text-name', '', function (value = '') {
            const { path, createError } = this;

            if (!value) {
              return createError({ path, message: 'O CNPJ é obrigatório' });
            }

            if (!cnpj.isValid(value)) {
              return createError({ path, message: 'Insira um CNPJ válido!' });
            }

            return true;
          }),
          password: Yup.string().test('text-name', '', function (value = '') {
            const { createError, path } = this;

            if (!value) {
              return createError({ path, message: 'A senha é obrigatória' });
            }

            if (/\s/g.test(value)) {
              return createError({
                path,
                message: 'Não são permitidos espaços em brancos!',
              });
            }

            if (value.length < 8) {
              return createError({
                path,
                message: 'Digite no mínimo 8 caracteres',
              });
            }

            return true;
          }),
          confirmPassword: Yup.string().test('text-name', '', function (
            value = '',
          ) {
            const { createError, path } = this;

            if (!value) {
              return createError({ path, message: 'Este campo é obrigatório' });
            }

            if (value !== formData.password) {
              return createError({
                path,
                message: 'As senhas não coincidem',
              });
            }

            return true;
          }),
          whatsapp: Yup.string().test('text-name', '', function (value = '') {
            const { createError, path } = this;

            if (!value) {
              return createError({ path, message: 'O WhatsApp é obrigatório' });
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

        await signUp(formData);

        callingLoadingFunction(false);

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description:
            'Vamos verificar os seus dados e te enviaremos um e-mail confirmando seu cadastro. Por favor aguarde o prazo máximo de até 24 horas.',
        });

        history.push('/');
      } catch (err) {
        callingLoadingFunction(false);

        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        } else {
          addToast({
            type: 'error',
            title: 'Não foi possível realizar seu cadastro',
            description: err.response.data.message,
          });
        }
      }
    },
    [signUp, callingLoadingFunction, addToast, history],
  );

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
        });

        setUfs(ufsData);
      });
  }, []);

  return (
    <BackgroundImage src={signUpImg}>
      <Content>
        <ContainerText>
          <img src={logoImg} alt="Life Hero" />

          <h1>Cadastro</h1>

          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link to="/">
            <button type="button">
              <FiArrowLeft size={20} color="1AC92C" />
              Voltar para o logon
            </button>
          </Link>
        </ContainerText>
        <Form ref={formRef} onSubmit={handleSignUp}>
          <Input
            icon={FiUser}
            type="text"
            name="name"
            placeholder="Nome da ONG"
          />

          <Input icon={FiMail} type="text" name="email" placeholder="E-mail" />
          <InputMask
            icon={MdGroup}
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            mask="99.999.999/9999-99"
          />

          <section className="first">
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Senha"
            />
            <Input
              icon={FiLock}
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
            />
          </section>

          <section className="first">
            <InputMask
              icon={FaWhatsapp}
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              mask="(99) 99999-9999"
            />
            <InputMask
              icon={FiPhoneCall}
              type="text"
              name="phone"
              placeholder="Telefone Fixo(Opcional)"
              mask="(99) 9999-9999"
            />
          </section>

          <section className="second">
            <Select
              style={
                cities.length === 0
                  ? { color: '#a8a8b3' }
                  : { color: '#41414d' }
              }
              isLoading={false}
              onChange={e => {
                setLoadingCities(true);
                handleSelectUf(e.target.value);
              }}
              icon={FiMap}
              name="uf"
              ufs={ufs}
            >
              <option value="selecione">Estado...</option>
            </Select>

            <Select
              style={
                cities.length === 0
                  ? { color: '#a8a8b3' }
                  : { color: '#41414d' }
              }
              isLoading={loadingCities}
              icon={FiMapPin}
              name="city"
              cities={cities}
            >
              {cities.length === 0 && (
                <option value="selecione">
                  Selecione um estado primeiro...
                </option>
              )}
            </Select>
          </section>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </BackgroundImage>
  );
};

export default SignUp;
