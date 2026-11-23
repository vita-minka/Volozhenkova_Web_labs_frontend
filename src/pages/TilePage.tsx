import { useEffect } from 'react';
import { Card, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// Добавляем type
import type { AppDispatch, RootState } from '../store';
import { fetchStages, setFilterCentury } from '../store/slices/stagesSlice';
import { StagesApi } from '../api/generated';
import './TilePage.css';

const DEFAULT_IMAGE = '/images/default-image.jpg';

export const TilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, filterCentury, loading } = useSelector((state: RootState) => state.stages);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchStages(filterCentury ? Number(filterCentury) : undefined));
  }, [dispatch, filterCentury]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить?')) {
      await StagesApi.deleteStage(id);
      dispatch(fetchStages(filterCentury ? Number(filterCentury) : undefined));
    }
  };

  return (
    <div className="tilePage">
      <h1 className="pageTitle">Плитка</h1>
      
      {loading && <div className="text-center my-3"><Spinner animation="border" /></div>}

      <Form.Select
        className="filterSelect mb-3"
        value={filterCentury}
        onChange={(e) => dispatch(setFilterCentury(e.target.value))}
      >
        <option value="">Все века</option>
        <option value="11">XI век</option>
        <option value="14">XIV век</option>
      </Form.Select>

      <div className="tileGrid">
        {list.map((stage) => (
          <Card key={stage.id} className="tileCard">
            <Card.Img variant="top" src={stage.imageUrl ? `/media/${stage.imageUrl}` : DEFAULT_IMAGE} className="tileImage" />
            <Card.Body className="tileBody">
              <div className="tileTitle">{stage.title}</div>
              <div className="tileBottom">
                <span 
  className="tileLike" 
  style={{ cursor: 'pointer', color: stage.isLiked ? '#ff3b3b' : 'black' }}
  onClick={async (e) => {
    e.stopPropagation(); // чтобы не срабатывал переход на ленту при клике
    try {
      const res = await StagesApi.like(stage.id, stage.isLiked ? 0 : 1);
      dispatch(fetchStages(filterCentury ? Number(filterCentury) : undefined));
    } catch (err) {
      alert('Авторизуйтесь, чтобы ставить лайки');
    }
  }}
>
  ♥ {stage.likesCount}
</span>
                {stage.isMine && user && (
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(stage.id)}>Удалить</button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};