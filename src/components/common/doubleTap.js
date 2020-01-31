import React, { Component } from 'react'

const SINGLE_TAP_TIME_OUT = 450

class DoubleTap extends Component {
  constructor() {
    super()
    this.timeout = null
    this.lastTapTime = 0
  }

  // ref: http://jsfiddle.net/brettwp/J4djY/
  handleDoubleTapEvent(event) {
    const { doubleTapEvent } = this.props
    const currentTime = new Date().getTime()
    const tapLengthOfTime = currentTime - this.lastTapTime
    clearTimeout(this.timeout)

    if (tapLengthOfTime > 0 && tapLengthOfTime < SINGLE_TAP_TIME_OUT) {
      doubleTapEvent()
      event.preventDefault()
    } else {
      this.timeout = setTimeout(() => { clearTimeout(this.timeout) }, SINGLE_TAP_TIME_OUT)
    }
    this.lastTapTime = currentTime
  }

  render() {
    const { content, className, doubleTapEvent } = this.props
    return (
      /* Align broswer behavior on both PC and mobile */
      <div
        className={className}
        onTouchEnd={e => this.handleDoubleTapEvent(e)}
        onDoubleClick={doubleTapEvent}>
        { content }
      </div>
    )
  }
}

export default DoubleTap
