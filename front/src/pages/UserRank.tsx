import React from 'react'
import { Header } from '../components'
import { Pagination, Icon, Table } from 'react-materialize'
import '../css/UserRank.css'

function UserRank () {
return (
<div className="bg-detail">
  <Header />
  <div className="center user_r">
    <h1>User Rank</h1>
    <div className="rank_box">
      <div className="user_rank">
        <Table centered hoverable striped>
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
                Admin
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
                Staff
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
                Staff
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
                Best User
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
                User
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
                Guest
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
                Guest
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
                Guest
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
                Guest
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
                Guest
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