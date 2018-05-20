import React from 'react'
import './musicItem.less'

import Pubsub from 'pubsub-js'

class MusicItem extends React.Component {
    // 选择歌曲
    selectItem(musicItem) {
        Pubsub.publish('CHOOSE_MUSIC', musicItem)
    }

    // 删除歌曲
    deleteItem(musicItem, e) {
        e.stopPropagation()
        Pubsub.publish('Delete_Item', musicItem)
    }

    render() {
        let musicItem = this.props.musicItem
        return (
            <li
                key={musicItem.key}
                className='component-musicItem row'
                onClick={this.selectItem.bind(this, musicItem)}

            >
                {this.props.focus}
                <span className={`musicItem-title -col11 ${this.props.focus ? 'focus' : ''}`}>
                 <strong>{musicItem.title}</strong> - <span className='musicItem-artist'>{musicItem.artist}</span>
             </span>
                <i
                    onClick={this.deleteItem.bind(this, musicItem)}
                    className="icon iconfont icon-shanchu delete-icon -col1">

                </i>
            </li>
        )
    }
}

export default MusicItem
