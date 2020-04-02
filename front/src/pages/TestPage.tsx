import React from 'react';
import './TestPage.css'
import { Header } from '../components'

function TestPage() {
  return (
    <div>
      <Header />
      <div className="center">
        <div className="banner">
          <div className="border_box">
            <div className="test_font">
              <div className="underlines">
                <div className="font_start">
                  TEST
                </div>
              </div>
              <div className="content">
                " This is TestPage ! <br/>
                Have a good time :) "
              </div>
            </div>
          </div>
        </div>
        
        <h1>CONTEXT</h1>
        
        </div>
      </div>
  )
}


export default TestPage;