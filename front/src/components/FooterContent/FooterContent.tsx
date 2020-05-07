import React from 'react'
import { Icon } from 'react-materialize'
import { faCrown, faUser } from "@fortawesome/free-solid-svg-icons"
// import {  } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default () => (
  <div>
            <h5 className="team_name">
            8팀 동물의 숲
          </h5>
          <div className="row">
            <div className="col footer-teammates">
              {/* <Icon>face</Icon> */}
              <FontAwesomeIcon className="footer_emoji" icon={faCrown} />
              <div>이경호</div>
            </div>
            <div className="col footer-teammates">
              {/* <Icon>face</Icon> */}
              <FontAwesomeIcon className="footer_emoji" icon={faUser} />
              <div>남승현</div>
            </div>
            <div className="col footer-teammates">
              {/* <Icon>face</Icon> */}
              <FontAwesomeIcon className="footer_emoji" icon={faUser} />
              <div>양혜진</div>
            </div>
            <div className="col footer-teammates">
              {/* <Icon>face</Icon> */}
              <FontAwesomeIcon className="footer_emoji" icon={faUser} />
              <div>이해인</div>
            </div>
            <div className="col footer-teammates">
              {/* <Icon>face</Icon> */}
              <FontAwesomeIcon className="footer_emoji" icon={faUser} />
              <div>박홍은</div>
            </div>
          </div>
          </div>
);
