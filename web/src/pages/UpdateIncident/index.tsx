import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FiArrowLeft,
  FiDollarSign,
  FiMessageCircle,
  FiPlus,
  FiType,
  FiX,
} from 'react-icons/fi';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button/index';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import BackgroundImage from '../../components/BackgroundImage';
import updateIncidentImage from '../../assets/updateIncidentImage.jpg';
import { useToast } from '../../hooks/toast';

import { Content, ContainerText, Image, ImagesContainer } from './styles';
import { useLoading } from '../../hooks/loading';

interface Id {
  incidentId: string;
}

interface IncidentFormData {
  id: string;
  title: string;
  description: string;
  value: number;
  images: Array<{
    id: string;
    key: string;
    url: string;
  }>;
}

interface ImagePreviewProps {
  id: string;
  key?: string;
  url: string;
}

interface ImageProps {
  id: string;
  image: File;
}

const UpdateIncident: React.FC = () => {
  const { incidentId }: Id = useParams();
  const { token } = useAuth();
  const { addToast } = useToast();
  const { callingLoadingFunction } = useLoading();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [incident, setIncident] = useState<IncidentFormData>(
    {} as IncidentFormData,
  );
  const [previewImages, setPreviewImages] = useState<ImagePreviewProps[]>([]);
  const [images, setImages] = useState<ImageProps[]>([]);

  const handleUpdateIncident = useCallback(
    async (formData: IncidentFormData) => {
      formRef.current?.setErrors({});
      callingLoadingFunction(true);
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

        data.append('id', formData.id);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('value', String(formData.value));

        images.forEach(image => {
          data.append('images', image.image);
        });

        previewImages.forEach(preview => {
          data.append('previews', preview.url);
        });

        const response = await api.put('incidents', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        callingLoadingFunction(false);

        addToast({
          type: 'success',
          title: 'Caso atualizado',
          description: response.data.message,
        });

        history.push('/dashboard');
      } catch (err) {
        callingLoadingFunction(false);

        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        } else {
          console.log(err.response.data);
        }
      }
    },
    [history, token, images, previewImages, addToast, callingLoadingFunction],
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

  useEffect(() => {
    api
      .get(`incidents/${incidentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const incidentData = response.data;

        setPreviewImages(incidentData.images);
        setIncident(incidentData);
      });
  }, [incidentId, token]);

  return (
    <BackgroundImage src={updateIncidentImage}>
      <Content>
        <ContainerText>
          <img src={logoImg} alt="Life Hero" />

          <h1>Atualizar o caso</h1>

          <p>
            Nunca deixe de atualizar os casos, para que o herói (doador) consiga
            fazer contato corretamente com a sua ONG.
          </p>

          <Link to="/dashboard">
            <button type="button">
              <FiArrowLeft size={20} color="1AC92C" />
              Voltar para home
            </button>
          </Link>
        </ContainerText>
        <Form
          initialData={incident}
          ref={formRef}
          onSubmit={handleUpdateIncident}
        >
          <Input type="text" name="id" />
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
                      oldImages.filter(oldImage => oldImage.url !== image.url),
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

          <Button type="submit">Atualizar</Button>
        </Form>
      </Content>
    </BackgroundImage>
  );
};

export default UpdateIncident;
