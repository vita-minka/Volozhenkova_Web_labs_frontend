import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StagesApi } from '../api/generated';
import { useSelector } from 'react-redux';
// Добавляем type
import type { RootState } from '../store';

export const AddPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [draft, setDraft] = useState<any>(null);
  const [msg, setMsg] = useState('');
  
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    StagesApi.getDraft().then(setDraft).catch(() => setDraft(null));
  }, [user, navigate]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    if (image) fd.append('image', image);
    if (video) fd.append('video', video);
    try {
      const res = await StagesApi.createDraft(fd);
      setDraft(res);
      setMsg('Черновик создан!');
    } catch (e) {
      setMsg('Ошибка при создании');
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await StagesApi.publish({ title: draft.title, description: 'Описание', century: 11, sign: 'Ять' });
      navigate('/');
    } catch (e) {
      setMsg('Ошибка публикации');
    }
  };

  return (
    <div className="p-4">
      <h2>Добавление</h2>
      {msg && <Alert variant="info">{msg}</Alert>}
      
      {!draft ? (
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Фото</Form.Label>
            <Form.Control type="file" onChange={(e: any) => setImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Видео</Form.Label>
            <Form.Control type="file" onChange={(e: any) => setVideo(e.target.files[0])} />
          </Form.Group>
          <Button type="submit" variant="dark">Далее</Button>
        </Form>
      ) : (
        <Form onSubmit={handlePublish}>
          <p>Черновик: {draft.title}</p>
          <Button type="submit" variant="success">Опубликовать</Button>
        </Form>
      )}
    </div>
  );
};