import React from 'react'
import './Members.css'
import { Chip } from "react-materialize";
import m1 from 'assets/member/1.png'
import m2 from 'assets/member/2.png'
import m3 from 'assets/member/3.png'
import m4 from 'assets/member/4.png'
import m5 from 'assets/member/5.png'

export default () => (
<div className="mem_bg">
  <div className="member_titles">
    Members
  </div>
  <div className="members">
    <div className="mem">
      <img src={m1} alt={"m1"} />
      <div className="about_mem">
        <div className="mem_name">
          이경호
        </div>
        <div className="mem_email">
          <a href="mailto:lkh151515@gmail.com">lkh151515@gmail.com</a>
        </div>
        <div className="role">
          <Chip>
            Full Stack
          </Chip>
          <Chip>
            Project Manager
          </Chip>
        </div>
        <div className="nutshell_1">
          "잠을 자고 싶어요"
        </div>
      </div>
    </div>
    <div className="mem">
      <img src={m2} alt={"m2"} />
      <div className="about_mem">
        <div className="mem_name">
          양혜진
        </div>
        <div className="mem_email">
          <a href="mailto:yang94lol@naver.com">yang94lol@naver.com</a>
        </div>
        <div className="role">
          <Chip>
            Back-end
          </Chip>
          <Chip>
            Data Analysis
          </Chip>
        </div>
        <div className="nutshell_2">
          "Covid-19 때문에 프로젝트 기간 내내 재택 근무였지만, 
          아침에 눈떠서 잠들 때까지 zoom을 켜놓고 해서 그런지 외로움을 느낄 새 없이 재미있게 개발했어요. 
          다음 프로젝트도 화이팅합시다!"
        </div>
      </div>
    </div>
    <div className="mem">
      <img src={m3} alt={"m3"} />
      <div className="about_mem">
        <div className="mem_name">
          박홍은
        </div>
        <div className="mem_email">
          <a href="mailto:박홍은@gmail.com">toohong5@gmail.com</a>
        </div>
        <div className="role">
          <Chip>
            Back-end
          </Chip>
          <Chip>
            Data Analysis
          </Chip>
        </div>
        <div className="nutshell_3">
          "제티 먹고싶다"
        </div>
      </div>
    </div>
    <div className="mem">
      <img src={m4} alt={"m4"} />
      <div className="about_mem">
        <div className="mem_name">
          이해인
        </div>
        <div className="mem_email">
          <a href="mailto:seasign10@gmail.com">seasign10@gmail.com</a>
        </div>
        <div className="role">
          <Chip>
            Front-end
          </Chip>
          <Chip>
            Designer
          </Chip>
        </div>
        <div className="nutshell_4">
          <b>" 꽥꽥 "</b>
        </div>
      </div>
    </div>
    <div className="mem">
      <img src={m5} alt={"m5"} />
      <div className="about_mem">
        <div className="mem_name">
          남승현
        </div>
        <div className="mem_email">
          <a href="mailto:남승현@gmail.com">gtsmell@gmail.com</a>
        </div>
        <div className="role">
          <Chip>
            Back-end
          </Chip>
          <Chip>
            Data Analysis
          </Chip>
        </div>
        <div className="nutshell_5">
          "배고파요"
        </div>
      </div>
    </div>
  </div>
</div>
)