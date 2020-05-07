import React, { Component } from "react";
import { Header } from "../components";
import { Collapsible, CollapsibleItem, Icon, Button } from "react-materialize";
import "../css/InfoPage.css";
import hongsi from "assets/member/3.png";
import buhyang from "assets/info/buhyang.webp";
import citrus from "assets/info/citrus.webp"
import perfume_case from "assets/info/perfume_case.webp"
import floral from "assets/info/floral.webp"
import green from "assets/info/green.webp"
import musk from "assets/info/musk.webp"
import spicy from "assets/info/spicy.webp"
import sweets from "assets/info/sweets.webp"
import wood from "assets/info/wood.webp" 
import aldehyde from "assets/info/aldehyde.webp"
import balsam from "assets/info/balsam.webp"
import beverage from "assets/info/beverage.webp"
import fruity from "assets/info/fruity.webp"
import wFlower from "assets/info/white-flower.webp"
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import icon_l from '../assets/images/icon.png'
import notes from "assets/info/notes.webp";
class InfoPage extends Component<{}> {
  toTopBtn = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  render() {
    return (
      <section style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", overflow:'hidden' }}>
        <Header />

        <Button
          className="red"
          fab={{
            direction: "left",
            hoverEnabled: false,
          }}
          icon={<Icon>vertical_align_top</Icon>}
          floating
          large
          onClick={this.toTopBtn}
          node="button"
        />
        <div className="survey_chatbot_title">
          <div className="chatbot_start">
            <img src={icon_l} alt="" style={{ width: "30px" }} />
            PERFUME INFORMATION
          </div>
          <div className="chatbot_end">
            <Link to="/">
              <CloseIcon />
            </Link>
          </div>
        </div>
        <div className="survey_box" style={{overflowY:'auto'}}>
          <section className="article-container">
            <Collapsible accordion={false}>
              <CollapsibleItem
                expanded={false}
                header={
                  <div className="info-collap-header">
                    <div>
                      <img src={hongsi} alt="" />
                      <p>HONGSI</p>
                    </div>
                    <div>
                      <div>
                        <h1>퍼퓸? 뚜알레? 무슨 말일까요?? </h1>
                        <p>부향율로 구분하는 향수의 종류</p>
                      </div>
                    </div>
                  </div>
                }
                node="div"
              >
                <div className="info-contents">
                  <img src={buhyang} alt="" />
                  <h3>부향률</h3>
                  <p>
                    향수의 원액과 알콜의 비율로 지속시간을 나타냅니다.
                    오른쪽으로 갈 수록 더 진한 향수에요.
                  </p>
                  <h3>퍼퓸</h3>
                  <p>
                    농도가 가장 진하며 향이 지속시간은 6~7시간 정도로 가장오래
                    지속됩니다. - 지속시간 : 6~7시간{" "}
                  </p>
                  <h3>오 드 퍼품</h3>
                  <p>퍼퓸보다 연한 농도로 5~6시간 정도 지속됩니다.</p>
                  <h3>오 드 뜨왈렛</h3>
                  <p>
                    가장 대중적인 농도로 3~5시간 정도 지속됩니다.
                    <h3>오 드 코롱</h3>
                    <p>
                      {" "}
                      가장 연한 농도로 부담없이 편하게 사용하기에 적절하며
                      지속시간은 1~2시간 정도 입니다.
                    </p>
                  </p>
                </div>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={false}
                header={
                  <div className="info-collap-header">
                    <div>
                      <img src={hongsi} alt="" />
                      <p>HONGSI</p>
                    </div>
                    <div>
                      <div>
                        <h1>노트(notes)란? </h1>
                        <p>향수의 아이덴티티, 노트에 대해서</p>
                      </div>
                    </div>
                  </div>
                }
                node="div"
              >
                <div className="info-contents">
                  <img src={notes} alt="" />
                  <h3>노트 NOTES</h3>
                  <p>
                    로르 리시를 이용하시다 보면 참 많이 만나게 되는 단어가
                    노트인데요.
                  </p>
                  <p>
                    향수는 뿌린 후(발향) 시간이 지날때마다 향기가 조금씩
                    변하는데, 노트는 향수가 가지고 있는 향 그 자체를 시간대에
                    따라 나눈 것이랍니다.
                  </p>
                  <p>탑노트 미들노트 베이스노트로 구분하고 있으며 각각 </p>
                  <ul>
                    <li>
                      <h1 style={{ textAlign: "center" }}>
                        탑 노트(Top note) > 발향의 시작과 동시에 맡을 수 있는 향
                      </h1>
                    </li>
                    <li>
                      <h1 style={{ textAlign: "center" }}>
                        미들 노트(Middle Note) > 뿌린 후 30 분에서 1 시간 정도
                        지난 뒤 시작되는 향
                      </h1>
                    </li>
                    <li>
                      <h1 style={{ textAlign: "center" }}>
                        베이스 노트(Base Note) > 향이 사라지기 전까지 남아있는
                        ‘잔향’
                      </h1>
                    </li>
                  </ul>
                  <p>으로 구분되어 있습니다.</p>
                  <p>하나씩 살펴보자면, </p>
                  <h3>탑노트</h3>
                  <p>
                    헤드노트(head note)라는 또다른 명칭을 가지고 있습니다.
                    탑노트는 향수를 시향지 또는 피부에 뿌린 후 발향이 될 때 느낄
                    수 있는 향이에요. 보통 탑노트를 맡고 구매를 하려 하는데
                    탑노트는 지속시간이 30분 밖에 되지 않기 때문에 구매시 좀 더
                    고려할 필요가 있답니다. 보통 상쾌한 시트러스 계열이나
                    네츄럴한 느낌의 그린 계열이 많이 선호되고 있어요.
                  </p>
                  <h3>미들노트</h3>
                  <p>
                    미들노트는 향수의 ‘브랜드 아이덴티티’ 입니다. 하트노트(heart
                    note), 소울노트(soul note)라고도 불리는데 그만큼 가장
                    핵심적인 단계입니다. 조향사가 의도한 향이 발향되는 단계로
                    탑노트가 끝남과 동시에 1 시간 정도 지속됩니다. 우리가
                    누군가를 만나거나 스쳐 지나갈 때 자극하는 향들은 대부분
                    미들노트라고 생각하시면 됩니다. 스파이시 계열이나 플로랄
                    계열과 같이 이미지와 컨셉이 명확한 향료들이 많이 사용됩니다.
                  </p>
                  <h3>베이스노트</h3>
                  <p>
                    향수의 베이스노트는 라스트노트(last note) 또는 '잔향' 으로
                    불립니다. 향수 종류에 따라 남은 시간 동안 은은하게 남습니다.
                    조향사에 따라 다르긴 하지만 대부분 대중적이고 저자극적이며
                    성질이 약한 향들이 많이 쓰입니다.
                  </p>
                </div>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={false}
                header={
                  <div className="info-collap-header">
                    <div>
                      <img src={hongsi} alt="" />
                      <p>HONGSI</p>
                    </div>
                    <div>
                      <div>
                        <h1>홍시가 알려주는 향수 사용 및 보관방법 </h1>
                        <p>TOP SECRET</p>
                      </div>
                    </div>
                  </div>
                }
                node="div"
              >
                <div className="info-contents">
                  <img src={perfume_case} alt="" />
                  <h3>향수 사용 및 보관 방법</h3>
                  <p>
                    1. 향수는 손목 또는 목의 맥박이 뛰는 부분에 직접 뿌리는 것이
                    좋아요.
                  </p>
                  <p style={{ padding: 12 }}>
                    향수는 피부로 부터 발산되는 체온 또는 체취와 섞여서 발산하기
                    때문이라고 합니다. 옷에 향수를 직접 뿌리게 되면 얼룩도 생길
                    수 있고, 향도 잘 퍼지지 않겠죠?
                  </p>
                  <p>
                    2. 향수는 햇빛이 닿으면 변질될 수 있어요. 따라서 직사광선이
                    닿지 않는 서랍이나 어두운 곳에 보관해주세요.
                  </p>
                  <p>
                    3. 향수를 사용한 후에는 꼭! 마개를 닫아서 향기가 빠져나가지
                    않도록 해야해요.
                  </p>
                  <h3>향수 유통기한</h3>
                  <p>
                    {" "}
                    향수의 유통기한은 보통 개봉전 3~5년, 개봉후 1~3년
                    정도입니다.
                  </p>
                  <p>
                    유통기한이 지난 향수는 향이 변하거나 향수 액이 변질했을
                    위험이 있으니 인체에 뿌리기 보다는 디퓨저 등으로
                    사용하는것이 좋겠죠.
                  </p>
                </div>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={false}
                header={
                  <div className="info-collap-header">
                    <div>
                      <img src={hongsi} alt="" />
                      <p>HONGSI</p>
                    </div>
                    <div>
                      <div>
                        <h1>로르리시의 열두가지 카테고리를 소개합니다 </h1>
                        <p>#향수분류 #과일향 #원하는향수찾기</p>
                      </div>
                    </div>
                  </div>
                }
                node="div"
              >
                <div className="info-contents">
                  
                  <h3>카테고리별 향의 특징</h3> 
                  <hr/>
                  <img src={citrus} alt="" />
                  <h3>1. 시트러스</h3>
                  <p>감귤류 특유의 시원함과 상큼함이 특징이며 향의 휘발성과 확산성이 뛰어나 탑노트에 주로 사용되거나 코롱계열의 향수에 주로 사용됩니다.</p>
                  <p>대표적인 향수로는 캘빈클라인의 Ck one이 있습니다.</p>
                  <img src={fruity} alt=""/>
                  <h3>2. 프루티</h3>
                  <p>시트러스계열을 제외한 나머지 과일향들을 표현한 향입니다.</p>
                  <p>복숭아, 딸기, 메론, 파인애플 등 과일을 이용한 향으로 상큼하고 달콤한 향을 느낄 수 있습니다.</p>
                  <p>대표적으로 록시땅 피치블라썸이 있습니다.</p>
                  <img src={floral} alt=""/>
                  <h3>3. 플로럴</h3>
                  <p>가장 많이 사용되는 계열로 꽃이 발산하는 향이며 모든 향수에 포함됩니다</p>
                  <img src={wFlower} alt=""/>
                  <h3>4. 화이트 플로럴</h3>
                  <p>플로럴의 하위 계열이지만 화이트 플로럴은 특유의 고혹적이면서도 청초한 우아함을 지닌 향입니다.</p>
                  <img src={green} alt=""/>
                  <h3>5. 그린, 허브</h3>
                  <p>막 베어낸 풀이나 나뭇잎을 비빌 때 느껴지는 풋내, 허브의 향긋함, 자연을 연상시키는 신선한 향이 특징입니다.</p>
                  <p>피에르 발망의 방베르가 대표적인 그린향수 입니다.</p>
                  <img src={spicy} alt=""/>
                  <h3>6. 스파이시</h3>
                  <p>향수 전체 베이스가 되기 보다는 다른 향을 돋보이거나 첫 인상을 강하게 주고자 할 때 사용됩니다. 향신료들이 지니는 자극적인 향을 지녔으며 특유의 톡 쏘는 향으로 첫 느낌을 강하게 줄 수 있습니다.</p>
                  <img src={sweets} alt=""/>
                  <h3>7. 스위츠(구르망)</h3>
                  <p>잘 익은 과일이나 벌꿀, 초콜릿, 바닐라, 계피 등의 식품을 연상시키는 후각적 느낌의 향입니다.</p>
                  <img src={wood} alt=""/>
                  <h3>8. 우디</h3>
                  <p>나무의 껍질이나 향목을 연상시키는 은은한 향이 특징입니다. 우디 계열이라는 향수는 적지만 대부분의 향수가 우디 향을 포함하고 있습니다. 안정적이고 중후한 느낌을 지녀 베이스 노트에 주로 사용됩니다.</p>
                  <p>대표적인 향수로는 조말론의 154가 있습니다.</p>
                  <img src={balsam} alt=""/>
                  <h3>9. 발삼</h3>
                  <p>발삼이라는 방향성 수지가 가지는 향입니다.</p>
                  <p>오리엔탈 계열의 기초가 되며 지속성이 좋고 자극적이며 개성이 강합니다.</p>
                  <img src={musk} alt=""/>
                  <h3>10. 머스크</h3>
                  <p>사향노루의 생식선 분비물인 머스크 혹은 그와 유사한 향을 말합니다.</p>
                  <p>따뜻함, 달콤함, 분내음 등으로 표현되며 시트러스나 플로럴에 비해 묵직하며 포근하게 감싸는 느낌을 줍니다.</p>
                  <p>휘발성이 적어 베이스 노트에 주로 사용되며 여성스러움을 강조하는 향수에 많이 사용됩니다.</p>
                  <img src={beverage} alt=""/>
                  <h3>11. 음료</h3>
                  <p> 코카콜라, 커피 등 인기 있는 음료의 향기를 재현한 향입니다. 주어진 음료에 대한 레시피의 일부를 구성하는 성분을 활용하거나 합성분자를 이용합니다. 스위츠(구르망) 계열과 함께 블랜드 되어 식욕을 돋구기도 합니다.</p>
                  <p>대표적인 향수로는 키엘의 오리지널 머스크 블랜드 No.1 이 있습니다.</p>
                  <img src={aldehyde} alt=""/>
                  <h3>12. 알데하이드</h3>
                  <p>알데하이드 계열은 천연 또는 인공 원료로 부터 얻어진 탄소, 수소, 산소 등을 포함해 만든 유기 화합물 입니다.</p>
                  <p>플로럴 계열을 베이스로 하여 모던 플로럴이라 부르기도 합니다.</p>
                  <p>알데하이드 계열의 특징은 확산력이 뛰어나고 노트가 매우 풍부하고 진하며 고급스럽다는 것입니다.</p>
                  <p>대표적인 알데하이드 계열 향수로는 샤넬의 No.5가 있습니다.</p>
                </div>
              </CollapsibleItem>
            </Collapsible>
          </section>
        </div>
      </section>
    );
  }
}

export default InfoPage;
