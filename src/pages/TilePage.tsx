import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Card, Form } from 'react-bootstrap';
import { STAGES_MOCK } from '../mock/stages';
import type { Stage } from '../mock/stages';
import './TilePage.css';

const DEFAULT_IMAGE = '/images/default-image.jpg';

export const TilePage: FC = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [century, setCentury] = useState<string>('');

  useEffect(() => {
    setStages(STAGES_MOCK);
  }, []);

  const filtered = useMemo(() => {
    const num = Number(century);
    if (!century || isNaN(num)) return stages;
    return stages.filter((s) => s.century === num);
  }, [stages, century]);

  return (
    <div className="tilePage">
      <h1 className="pageTitle">Плитка</h1>

      <Form.Select
        className="filterSelect"
        value={century}
        onChange={(e) => setCentury(e.target.value)}
      >
        <option value="">Все века</option>
        <option value="11">XI век</option>
        <option value="14">XIV век</option>
      </Form.Select>

      <div className="tileGrid">
        {filtered.map((stage) => (
          <Card key={stage.id} className="tileCard">
            <Card.Img
              variant="top"
              src={stage.imageUrl || DEFAULT_IMAGE}
              className="tileImage"
            />
            <Card.Body className="tileBody">
              <div className="tileTitle">{stage.title}</div>
              <div className="tileBottom">
                <span className="tileLike">♥ {stage.likesCount}</span>
                <span className="tileArrow">→</span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};