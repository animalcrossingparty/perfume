import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import { Header } from '../components'
import 'materialize-css';
import '../css/TestPage.css'

function TestPage() {
return (
<div>
  <Header />
  <div className="center test_center">
      {/* <SearchBar /> */}

    {/* banner */}
    <div className="test_banner">
      <div className="test_border_box">
        <div className="test_font">
          <div className="test_underlines">
            <div className="font_start">
              TEST
            </div>
          </div>
          <div className="test_context">
            " This is TestPage ! <br />
            Have a good time :) "
          </div>
        </div>
      </div>

      {/* content */}
      <div className="content_box">
        <div className="deco_box">
          <div className="left_box_">
            <img src="https://user-images.githubusercontent.com/52684457/78364153-f5d57380-75f7-11ea-8a7b-ec33f2acb971.png" 
            alt=""
            width="140px;"/>
            <img src="https://user-images.githubusercontent.com/52684457/78364154-f66e0a00-75f7-11ea-8bdf-696c60f88508.png" 
            alt=""
            width="230px;"/>
            <img src="https://user-images.githubusercontent.com/52684457/78364149-f4a44680-75f7-11ea-807e-058782006beb.png" 
            alt=""
            width="140px;"/>
          </div>
        </div>

        <div className="test_collapsible">
          <Collapsible accordion popout>
            <CollapsibleItem expanded={false} header="`` 향수에도 부작용이 있다는 사실! 아시나요? ``" node="div"
              >
              소량 사용 후, 알레르기와 같은 반응이 없는지 확인하세요.
              특히 농도가 높은 화학물질은 신경계에 영향을 줘서 어지럼증, 두통, 피부·호흡기 알레르기 같은 반응을 더 많이 일으킬 수 있습니다.
              반응이 있을 경우에는 사용부위 세척을 하고 가까운 병원을 내원하시길 바랍니다.
            </CollapsibleItem>
            <CollapsibleItem expanded={false} header="`` 가정 내 어린아이와 반려동물이 있나요? ``" node="div"
              >
              입에 넣거나 눈에 들어갈 위험이 발생할 수 있습니다. 어린아이와 반려동물 손에 닿지 않는곳에 보관하세요.
              실수로 입에 넣거나 눈에 들어갔을 경우에는 흐르는 물에 씻은 후 가까운 병원을 내원하시길 바랍니다.
              특히나 반려동물에게는 향수가 극심한 독성 작용을 할 수 있으니 주의해서 사시길 바랍니다.
            </CollapsibleItem>
            {/* <CollapsibleItem expanded={false} header="`` 유통기한이 지난 향수는 어떻게 처분하는지 아시나요? ``" icon={<Icon>delete_forever
              </Icon>}
              node="div"
              > */}
            <CollapsibleItem expanded={false} header="`` 유통기한이 지난 향수는 어떻게 처분하는지 아시나요? ``" node="div"
              >
              유통기한이 지난 향수는 직접 피부에 닿을 시, 알레르기와 피부 질환을 유발합니다.
              디퓨저로 재활용하여 집을 향기롭게 꾸며보세요!
            </CollapsibleItem>
          </Collapsible>
        </div>
      </div>

    </div>


  </div>
</div>
)
}


export default TestPage;