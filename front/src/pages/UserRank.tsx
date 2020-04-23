import React from 'react'
import { Header } from '../components'
import { Pagination, Icon, Table } from 'react-materialize'
import '../css/UserRank.css'

function UserRank () {
return (
<div className="bg-detail">
  <Header />
  <div className="center user_r">
    <h1>User Page</h1>
    <div className="admin_box">
      <div className="admins">
        <Table centered striped>
          <thead>
            <tr>
              <th data-field="grade">  
                Management level
              </th>
              <th data-field="user">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992592-aabfc980-84ee-11ea-8cdf-38f19f9d7305.png"
                    alt="" />
                  <div className="admin_bedge">
                    Admin
                  </div>
                </div>
              </td>
              <td>
                이경호
              </td>
            </tr>
            <tr>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992597-abf0f680-84ee-11ea-956b-6d22c0eb09b7.png"
                    alt="" />
                  <div className="staff_bedge">
                    Staff
                  </div>
                </div>
              </td>
              <td>
                양혜진
              </td>
            </tr>
            <tr>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992597-abf0f680-84ee-11ea-956b-6d22c0eb09b7.png"
                    alt="" />
                  <div className="staff_bedge">
                    Staff
                  </div>
                </div>
              </td>
              <td>
                박홍은
              </td>
            </tr>
            <tr>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992597-abf0f680-84ee-11ea-956b-6d22c0eb09b7.png"
                    alt="" />
                  <div className="staff_bedge">
                    Staff
                  </div>
                </div>
              </td>
              <td>
                이해인
              </td>
            </tr>
            <tr>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992597-abf0f680-84ee-11ea-956b-6d22c0eb09b7.png"
                    alt="" />
                  <div className="staff_bedge">
                    Staff
                  </div>
                </div>
              </td>
              <td>
                남승현
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
    <div className="rank_box">
      <div className="user_rank">
        <Table centered hoverable>
          <thead>
            <tr>
              <th data-field="rank">
                Rank
              </th>
              <th data-field="user">
                User
              </th>
              <th data-field="grade">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                1
              </td>
              <td>
                이경호
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992607-adbaba00-84ee-11ea-98c4-5f844400a294.png"
                    alt="" />
                  <div className="top_bedge">
                    Top Flower
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                2
              </td>
              <td>
                양혜진
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992607-adbaba00-84ee-11ea-98c4-5f844400a294.png"
                    alt="" />
                  <div className="top_bedge">
                    Top Flower
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                3
              </td>
              <td>
                박홍은
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992607-adbaba00-84ee-11ea-98c4-5f844400a294.png"
                    alt="" />
                  <div className="top_bedge">
                    Top Flower
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                4
              </td>
              <td>
                이해인
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992606-adbaba00-84ee-11ea-9669-d75c690f4066.png"
                    alt="" />
                  <div className="flower_bedge">
                    Flower
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                5
              </td>
              <td>
                남승현
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992606-adbaba00-84ee-11ea-9669-d75c690f4066.png"
                    alt="" />
                  <div className="flower_bedge">
                    Flower
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                6
              </td>
              <td>
                몽땅
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992604-ad222380-84ee-11ea-8029-15226d41ed43.png"
                    alt="" />
                  <div className="flowerBud_bedge">
                    Flower bud
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                7
              </td>
              <td>
                홍시
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992604-ad222380-84ee-11ea-8029-15226d41ed43.png"
                    alt="" />
                  <div className="flowerBud_bedge">
                    Flower bud
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                8
              </td>
              <td>
                야통이
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992604-ad222380-84ee-11ea-8029-15226d41ed43.png"
                    alt="" />
                  <div className="flowerBud_bedge">
                    Flower bud
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                9
              </td>
              <td>
                뜌뤼
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992601-ac898d00-84ee-11ea-8cac-af6b8541fe25.png"
                    alt="" />
                  <div className="bud_bedge">
                    Bud
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                10
              </td>
              <td>
                얌얌긋
              </td>
              <td>
                <div className="bedge">
                  <img
                    src="https://user-images.githubusercontent.com/52684457/79992598-ac898d00-84ee-11ea-94e4-13e79be2b8e4.png"
                    alt="" />
                  <div className="sprout_bedge">
                    Sprout
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Pagination activePage={1} items={10} leftBtn={<Icon>chevron_left</Icon>}
        maxButtons={8}
        rightBtn={<Icon>chevron_right</Icon>}
        />
    </div>
  </div>
</div>
);
}

export default UserRank;