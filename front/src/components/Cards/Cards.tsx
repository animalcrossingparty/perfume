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
  }
}

const defaultField = {
  name: 'string',
  launch_date: 'string',
  thumbnail: 'string',
  gender: 1,
  availibility: 'string',
  brand_id: 'string'
}

export default function Cards({field = defaultField}: EachPerfumeProps) {
  return (
    <Card
      closeIcon={<Icon>close</Icon>}
      header={<CardTitle image={field.thumbnail} reveal waves="light"/>}
      reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}
      revealIcon={<Icon>more_vert</Icon>}
      title={field.name}
      >
        <p>
          <p>{field.launch_date || '(출시일 정보 없음)'}</p>
          <p>For {field.gender}</p>
          <Link to="/">
            {field.name} 더 보기
          </Link>
        </p>
      </Card>
);
}
