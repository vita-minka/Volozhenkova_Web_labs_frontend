import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Button } from 'react-bootstrap';
import { STAGES_MOCK } from '../mock/stages';
import type { Stage } from '../mock/stages';
import './FeedPage.css';

const DEFAULT_IMAGE = '/images/default-image.jpg';

export const FeedPage: FC = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setStages(STAGES_MOCK);
  }, []);

  if (!stages.length) return <div>Загрузка...</div>;

  const stage = stages[currentIndex];

  const handleNext = () => {
    if (currentIndex < stages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="feedPage">
      {stage.videoUrl ? (
        <video className="feedVideo" src={stage.videoUrl} autoPlay loop muted playsInline />
      ) : (
        <img className="feedVideo" src={stage.imageUrl || DEFAULT_IMAGE} alt={stage.title} />
      )}

      <div className="feedOverlay">
        <h2 className="feedTitle">{stage.title}</h2>
        <p className="feedDescription">{stage.description}</p>

        <div className="feedMeta">
          <span className="feedBadge">Век: {stage.century}</span>
          <span className="feedBadge">Признак: {stage.sign}</span>
          <span className="feedLike">♥ {stage.likesCount}</span>
          <Button variant="light" onClick={handleNext} className="nextBtn">▼</Button>
        </div>
      </div>
    </div>
  );
};