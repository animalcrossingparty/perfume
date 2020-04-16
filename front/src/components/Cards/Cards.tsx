import React from 'react';
import { Card, Icon, CardTitle } from 'react-materialize'
import { Link } from 'react-router-dom'
import './Cards.css'

interface EachPerfumeProps {
  field: {
    name: string,
    launch_date: string,
    thumbnail: string,
    gender: number,
    availibility: string,
    brand_id: string,
  },
  id: number
}

const defaultField = {
  name: 'string',
  launch_date: 'string',
  thumbnail: 'string',
  gender: 1,
  availibility: 'string',
  brand_id: 'string',
}

export default function Cards({field = defaultField, id = 1}: EachPerfumeProps) {
  return (
    <Card
      closeIcon={<Icon>close</Icon>}
      header={<CardTitle image={field.thumbnail} reveal waves="light"/>}
      reveal={<p>워드클라우드가 들어갈 자리입니다</p>}
      revealIcon={<Icon>more_vert</Icon>}
      title={field.name}
      >
        <p>
          <p>{field.launch_date || '(출시일 정보 없음)'}</p>
          <p>For {field.gender}</p>
          <Link to={`/detail/${id}`}>
            {field.name} 더 보기
          </Link>
        </p>
      </Card>
);
}
