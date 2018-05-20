import React from 'react'
import './progress.less'
import '../../style/common.css'

class Progress extends React.Component {

    constructor(props) {
        super(props);
        this.changeProgress= this.changeProgress.bind(this);
    }

    changeProgress(e) {
        let progressBar = this.refs.progressBar
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth

        this.props.onChangeProgress && this.props.onChangeProgress(progress)   // 监听到progress变化抛出事件

    }

    render() {
        let barStyle = {width: `${this.props.progress}%`, background: this.props.barColor}
        return (
            <div className="component-progress"
                 ref="progressBar"
                 onClick={(this.changeProgress)}>
                <div
                    className="progress"
                     style={barStyle}>
                </div>
            </div>
        )
    }
}

export default Progress