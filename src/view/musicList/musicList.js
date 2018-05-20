import React from 'react'
import './musicList.less'
import '../../style/grobal.css'
import MusicItem from '../../components/musicItem/musicItem'


class MusicList extends React.Component {
    render() {
        let listItem = this.props.musicList.map((item) => {
            return (
                <MusicItem
                    key={item.id}
                    musicItem={item}
                    focus={item === this.props.currentMusicItem}>
                </MusicItem>
            )
        })
        return (
            <div className='component-musicList'>
                <ul>
                    {listItem}
                </ul>
            </div>
        )
    }

}

export default MusicList
