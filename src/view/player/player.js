import React from 'react'
import $ from 'jquery'
import 'jplayer'

// css
import '../../style/grobal.css';
import './player.less';

import {Link} from 'react-router-dom';


// component
import Progress from '../../components/progress/progress'
import Cover from '../../components/Cover/cover'

import Pubsub from 'pubsub-js'


let duration = null //音乐播放时间初始值


class Player extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            progress: 0,
            volume: 0,
            isPlay: true,
            leaveTime: 0
        };

    }

    componentDidMount() {
        // 绑定事件
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration // 音乐播放时间总长
            this.setState({
                volume: e.jPlayer.options.volume * 100, //获取音量
                progress: e.jPlayer.status.currentPercentAbsolute, //进度条百分比
                leaveTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
                //音乐播放剩余时间
            })
        })

    }

    // 解绑事件
    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    // 改变进度值
    progressChangeHander(progress) {
        //播放时间总产长*进度百分比
        $('#player').jPlayer('play', duration * progress)
    }

    // 改变音量
    changevVolumeHander(progress) {
        $('#player').jPlayer('volume', progress)
    }

    //播放 && 暂停
    changePlay() {
        this.state.isPlay ? $('#player').jPlayer('pause') : $('#player').jPlayer('play')

        // 改变状态值
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    // 上一曲
    preMusic() {
        Pubsub.publish('preMusic')
    }

    // 下一曲

    nextMusic() {
        Pubsub.publish('nextMusic')
    }

    // 播放状态：循环、单曲、列表、重复
    onceClick() {
        Pubsub.publish('onceClick')
    }


    // 格式化时间
    formatTime(time) {
        let minute = Math.floor(time / 60)
        let seconds = Math.floor(time % 60)
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `-${minute} : ${seconds}s`
    }

    // 播放状态:单曲循环、顺序播放、随机播放 默认顺序播放
    playModel(model) {
        switch (model){
            case 'loop':
                return 'icon-danquxunhuan'

            case 'order' :
                return 'icon-shunxubofang'

            case 'random' :
                return 'icon-suijibofang'
            default:
                return 'icon-shunxubofang'
        }
    }

    render() {
        return (
            <div>
                <Cover bg={this.props.currentMusicItem.cover}/>
                <div className="player-wrap row">
                    <div id='player'>
                    </div>
                    <div className='-col7 play-left'>
                        <p className='play-mine'><Link to='/list'>我的私人音乐坊 ></Link></p>
                        <p className='play-title'>{this.props.currentMusicItem.title}</p>
                        <p className='play-article'>{this.props.currentMusicItem.artist}</p>
                        <div className='play-sound'>
                            <div className='play-icon'>
                                <i
                                    className="icon iconfont icon-icon-">

                                </i>
                            </div>
                            <div>

                            </div>
                            <div className='play-volume'>
                                <Progress
                                    progress={this.state.volume}
                                    onChangeProgress={this.changevVolumeHander}
                                    barColor='red'
                                />
                            </div>
                        </div>
                        <div className='play-progress'>
                            <Progress
                                progress={this.state.progress}
                                onChangeProgress={this.progressChangeHander}
                                barColor='red'
                            />
                        </div>
                        <div>{this.state.leaveTime}</div>
                        <div className='play-control'>
                            <i
                                onClick={this.preMusic.bind(this)}
                                className="icon iconfont icon-shangyiqu101">
                            </i>
                            <i
                                className={`icon iconfont ${this.state.isPlay ? 'icon-suspend_icon' : 'icon-zanting'}`}
                                onClick={this.changePlay.bind(this)}>
                            </i>
                            <i
                                onClick={this.nextMusic.bind(this)}
                                className="icon iconfont icon-xiayiqu101">

                            </i>
                            <i
                                onClick={this.onceClick.bind(this)}
                                className={`icon iconfont ${this.playModel(this.props.playModel)}`}>
                            </i>
                        </div>
                    </div>
                    <div className='-col2 play-images'>
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player
