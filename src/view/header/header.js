import React from 'react'
import './header.less'
import logo from '../../assets/images/logo.png'
import '../../style/common.css'
class Header extends React.Component {
    render() {
        return (
            <div className="conponent-header">
              <div className='flt'>
                  <img className="header-img" src={logo} alt=""/>
              </div>
               <div className='flt header-title'>我喜欢的音乐</div>
            </div>
        )
    }
}

export default Header