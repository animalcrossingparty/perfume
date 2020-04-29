import React from "react";
import {
  Card,
  Icon,
  CardTitle,
  Chip,
  Row,
  Col,
  MediaBox,
} from "react-materialize";
import noWc from "assets/noWc.png";
import { Link } from "react-router-dom";
import "./Cards.css";

interface EachPerfumeProps {
  field: any;
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
  price: 0,
  category: [0],
  similar: [0],
  recommended: [0],
};

export default function Cards({ field = defaultField }: EachPerfumeProps) {
  const gender_dict = {
    0: "MALE",
    1: "FEMALE",
    2: "SHARED / UNISEX",
  };

  const addDefaultSrc = (e) => {
    e.target.src = noWc;
  };

  const makeComma = (x: number) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const similar = () => {
    if (field.similar.length > 3) {
      return field.similar.substr(1, field.similar.length - 2).split(", ");
    } else {
      return "유사한 향수를 찾을 수 없습니다.";
    }
  };

  return (
    <Card
      closeIcon={<Icon>close</Icon>}
      title="show cloud"
      header={
        <Link to={`/detail/${field.id}`}>
          <CardTitle image={field.thumbnail || "no-image"} waves="light" />
        </Link>
      }
      reveal={
        <Col>
          <MediaBox
            id={field.id + "wcbox"}
            options={{
              inDuration: 275,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 200,
            }}
          >
            <img
              alt=""
              width="100%"
              onError={(e) => addDefaultSrc(e)}
              src={`http://i02b208.p.ssafy.io:8000/staticfiles/wordcloud/${field.id}-wc.webp`}
            />
          </MediaBox>
          <small>워드 클라우드</small>
          <p>클릭하여 자세히 보기</p>
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
        </Col>
      }
      revealIcon={<Icon>cloud_circle</Icon>}
    >
      <div className="title-gender-tags">
        <p className="card-c-title">{field.name}</p>
        <div className="perfume-card-badge right p-1 mr-2">
          {field.launch_date ? field.launch_date.substr(0, 4) : "(None)"}
        </div>
        <p className="rate-box">
          <Icon className="rate-box-star">star</Icon>
          {field.avg_rate.toFixed(2)}{" "}
          <small className="ml-2">({field.total_review})</small>
        </p>
        <Row className="gender-year">
          <Col className="gender-indicator">
            <span>
              {gender_dict[field.gender]} {field.category}
            </span>
            <p style={{ fontSize: "0.8rem", fontWeight: 700 }}>
              {field.brand.name}
            </p>
          </Col>
          {field.price > 1 ? (
            <h5 style={{ marginLeft: "auto", color: "#c71585" }}>
              {makeComma(field.price.toFixed(0))}
              <small>원</small>
            </h5>
          ) : (
            <h5
              style={{
                marginLeft: "auto",
                color: "#c71585",
                paddingTop: "6px",
                paddingBottom: "7px",
                fontSize: "1rem",
              }}
            >
              (가격 없음)
            </h5>
          )}
        </Row>
        <small className="mb-2">
          {field.name.substr(0, 9)}...과 유사한 향수들
        </small>
        <Row className="m-0 jcenter">
          {field.similar.length > 2 ? (
            similar().map((eid) => (
              <Link key={eid + "sim"} to={`/detail/${eid}`}>
                <img
                  src={`http://i02b208.p.ssafy.io:8000/staticfiles/images/${eid}.jpg`}
                  width="24px"
                  alt=""
                />
              </Link>
            ))
          ) : (
            <Col style={{ paddingTop: "11.5px" }}>비슷한 향수가 없어요</Col>
          )}
        </Row>
      </div>
    </Card>
  );
}
