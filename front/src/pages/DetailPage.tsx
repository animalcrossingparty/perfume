import React from 'react';
import { Header } from 'components/'
import { Detail } from 'containers/Detail'
import '../css/DetailPage.css'
import ban from 'assets/ban.webp'

function DetailPage() {
return (
<div>
  <Header />
  {/* <div className="img-banner-laureRichis">
    <img src={ban} alt=""/>
  </div> */}
  <Detail />
</div>
)
}

export default DetailPage;