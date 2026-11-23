import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { StagesApi, type StageResponseDto } from '../api/generated';
import './FeedPage.css';

const DEFAULT_IMAGE = '/images/default-image.jpg';

export const FeedPage = () => {
  const [stage, setStage] = useState<StageResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  // Загрузка первой карточки при входе
  useEffect(() => {
    StagesApi.getFeed()
      .then((data) => setStage(data || null))
      .catch(() => setStage(null))
      .finally(() => setLoading(false));
  }, []);

  // Функция перехода к следующей карточке (запрос к серверу)
  const handleNext = async () => {
    if (!stage) return;
    setLoading(true);
    try {
      // Запрашиваем следующую карточку по ID текущей (next=true)
      const nextStage = await StagesApi.getFeed(stage.id, true);
      setStage(nextStage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Функция лайка
  const handleLike = async () => {
    if (!stage) return;
    try {
      const value = stage.isLiked ? 0 : 1;
      const res = await StagesApi.like(stage.id, value);
      
      // Обновляем только текущую карточку
      setStage({
        ...stage,
        isLiked: res.liked,
        likesCount: res.count,
      });
    } catch (e) {
      alert('Сначала нужно авторизоваться!');
    }
  };

  if (loading) return <div className="p-4 text-center">Загрузка...</div>;
  if (!stage) return <div className="p-4">Нет опубликованных услуг</div>;

  return (
    <div className="feedPage">
      {stage.videoUrl ? (
        <video className="feedVideo" src={`/media/${stage.videoUrl}`} autoPlay loop muted playsInline />
      ) : (
        <img className="feedVideo" src={stage.imageUrl ? `/media/${stage.imageUrl}` : DEFAULT_IMAGE} alt={stage.title} />
      )}

      <div className="feedOverlay">
        <h2 className="feedTitle">{stage.title}</h2>
        <p className="feedDescription">{stage.description}</p>

        <div className="feedMeta">
          <span className="feedBadge">Век: {stage.century}</span>
          <span className="feedBadge">Признак: {stage.sign}</span>
          
          {/* Кликабельный лайк */}
          <span 
            className="feedLike" 
            onClick={handleLike} 
            style={{ cursor: 'pointer', color: stage.isLiked ? '#ff3b3b' : 'white' }}
          >
            ♥ {stage.likesCount}
          </span>

          {/* Кнопка далее */}
          <Button variant="light" onClick={handleNext} className="nextBtn">▼</Button>
        </div>
      </div>
    </div>
  );
};