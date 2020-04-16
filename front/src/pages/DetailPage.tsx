import React from 'react';
import { Header } from 'components/'
import { Detail } from 'containers/Detail'
import '../css/DetailPage.css'

function DetailPage() {
return (
<div className="bg-detail">
  <Header />
  <Detail />
</div>
)
}

export default DetailPage;