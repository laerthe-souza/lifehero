import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiType,
  FiMessageCircle,
  FiDollarSign,
  FiPlus,
  FiX,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import newIncidentImage from '../../assets/newIncidentImage.jpg';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import Textarea from '../../components/Textarea';
import BackgroundImage from '../../components/BackgroundImage';

import { Content, ContainerText, ImagesContainer, Image } from './styles';
import { useLoading } from '../../hooks/loading';

interface IncidentFormData {
  title: string;
  description: string;
  value: number;
}

interface ImagePreviewProps {
  id: string;
  url: string;
}

interface ImageProps {
  id: string;
  image: File;
}

const NewIncident: React.FC = () => {
  const { token } = useAuth();
  const { addToast } = useToast();
  const { callingLoadingFunction } = useLoading();

  const [previewImages, setPreviewImages] = useState<ImagePreviewProps[]>([]);
  const [images, setImages] = useState<ImageProps[]>([]);

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleRegisterNewIncident = useCallback(
    async (formData: IncidentFormData) => {
      if (images.length === 0) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar novo incidente',
          description:
            'Por favor, insira no mínimo uma imagem sobre o incidente',
        });

        return;
      }

      callingLoadingFunction(true);
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          title: Yup.string().trim().required('O título do caso é obrigatório'),
          description: Yup.string()
            .trim()
            .required('A descrição do caso é obrigatória'),
          value: Yup.number()
            .positive()
            .moreThan(0)
            .required('O valor do caso é obrigatório'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        const data = new FormData();

        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('value', String(formData.value));

        images.forEach(image => {
          data.append('images', image.image);
        });

        await api.post('incidents', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        history.push('/dashboard');

        callingLoadingFunction(false);

        addToast({
          type: 'success',
          title: 'Cadastro concluído',
          description: 'Caso/incidente cadastrado com sucesso',
        });
      } catch (err) {
        callingLoadingFunction(false);

        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar novo incidente',
            description: err.response.data.message,
          });
        }
      }
    },
    [history, token, addToast, callingLoadingFunction, images],
  );

  const handleSelectImages = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      if (event.target.files.length > 5) {
        event.target.value = '';

        addToast({
          type: 'error',
          title: 'Limite de arquivos excedido',
          description: 'Só é permitido o envio de 5 arquivos de imagens',
        });

        return;
      }

      const selectedImages = Array.from(event.target.files);

      const selectedImagesPreview = selectedImages.map(image => ({
        id: uuid(),
        url: URL.createObjectURL(image),
      }));

      selectedImagesPreview.push(...previewImages);

      if (selectedImagesPreview.length > 5) {
        event.target.value = '';

        addToast({
          type: 'error',
          title: 'Limite de arquivos excedido',
          description: 'Só é permitido o envio de 5 arquivos de imagens',
        });

        return;
      }

      let index = -1;

      const imgs = selectedImages.map(image => {
        index += 1;

        return {
          id: selectedImagesPreview[index].id,
          image,
        };
      });

      imgs.push(...images);

      setImages(imgs);

      setPreviewImages(selectedImagesPreview);

      event.target.value = '';
    },
    [previewImages, images, addToast],
  );

  return (
    <BackgroundImage src={newIncidentImage}>
      <Content>
        <ContainerText>
          <img src={logoImg} alt="Life Hero" />

          <h1>Cadastrar novo caso</h1>

          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/dashboard">
            <button type="button">
              <FiArrowLeft size={20} color="1AC92C" />
              Voltar para home
            </button>
          </Link>
        </ContainerText>
        <Form ref={formRef} onSubmit={handleRegisterNewIncident}>
          <Input
            icon={FiType}
            type="text"
            name="title"
            placeholder="Título do caso"
          />
          <Textarea
            icon={FiMessageCircle}
            maxLength={200}
            name="description"
            placeholder="Descrição"
          />

          <Input
            icon={FiDollarSign}
            type="text"
            name="value"
            placeholder="Valor do caso"
          />

          <ImagesContainer>
            {previewImages.map(image => (
              <Image key={image.id} src={image.url}>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImages(oldImages =>
                      oldImages.filter(oldImage => oldImage.id !== image.id),
                    );
                    setImages(oldImages =>
                      oldImages.filter(oldImage => oldImage.id !== image.id),
                    );
                  }}
                >
                  <FiX size={20} color="#c53030" />
                </button>
              </Image>
            ))}

            {previewImages.length !== 5 && (
              <label htmlFor="images[]" className="image">
                <FiPlus size={24} color="#1ac92c" />
                <p>Fotos</p>
              </label>
            )}

            <input
              style={{ display: 'none' }}
              type="file"
              name="images"
              id="images[]"
              multiple
              onChange={handleSelectImages}
            />
          </ImagesContainer>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </BackgroundImage>
  );
};

export default NewIncident;
