import React from "react";
import {
  Card,
  Icon,
  CardTitle,
  Chip,
  Badge,
  Row,
  Col,
} from "react-materialize";
import { Link } from "react-router-dom";
import "./Cards.css";

interface EachPerfumeProps {
  field: {
    name: string;
    launch_date: string;
    thumbnail: string;
    gender: number;
    availibility: string;
    brand_id: string;
    id: number;
    image: string;
    top_notes: Array<any>;
    heart_notes: Array<object>;
    base_notes: Array<object>;
    avg_rate: number;
    total_review: number;
  };
}

const defaultField = {
  name: "string",
  launch_date: "string",
  thumbnail: "string",
  id: 1,
  gender: 1,
  availibility: "string",
  brand_id: "string",
  image: "null",
  top_notes: [{ name: "floral" }],
  heart_notes: [{ name: "floral" }],
  base_notes: [{ name: "floral" }],
  avg_rate: 0,
  total_review: 0,
};

export default function Cards({ field = defaultField }: EachPerfumeProps) {
  const gender_dict = {
    0: "MALE",
    1: "FEMALE",
    2: "SHARED / UNISEX",
  };

  return (
    <Card
      closeIcon={<Icon>close</Icon>}
      header={
        <CardTitle height="260" image={field.thumbnail || "no-image"} reveal waves="light" />
      }
      reveal={<p>워드클라우드가 들어갈 자리입니다</p>}
      revealIcon={<Icon className="hidden">home</Icon>}
    >
      <div>
        <div className="title-gender-tags">
        <Row>
          <Col s={9}>
            <p className="card-title">{field.name}</p>
          </Col>
          <Col s={3}>
            <p className="rate-box right"><Icon className="rate-box-star">star</Icon>{field.avg_rate.toFixed(2)}</p>
          </Col>
        </Row>
        <Row className="mx-2 gender-year">
          <Col className="gender-indicator">
            <Icon>wc</Icon>
            <span>{gender_dict[field.gender]}</span>
          </Col>
          <Badge className="perfume-card-badge right">
            {field.launch_date
              ? field.launch_date.substr(0, 4)
              : "(None)"}
            년 출시
          </Badge>
        </Row>
        <Row className="note-tags">
          {field.top_notes.length > 0 ? (
            field.top_notes.slice(0, 3).map((note, note_id) => (
              <Chip
                close={false}
                options={null}
                key={note_id}
                className={`chip-color-${note_id % 10}`}
              >
                {note.kor_name || note.name}
              </Chip>
            ))
          ) : (
            <Chip close={false}>노트정보없음</Chip>
          )}
        </Row>
        </div>
        <Link to={`/detail/${field.id}`}>
          <Row className="goto-detail-row">
            <p>보러가기</p>
            <p className="mx-2">
              <Icon>insert_comment</Icon>
            </p>
            <p>리뷰 ({field.total_review})</p>
          </Row>
        </Link>
      </div>
    </Card>
  );
}
