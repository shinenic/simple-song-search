import React, { Component } from 'react'
import styled from 'styled-components'
import { FadeIn } from '../styles/utils'

const SINGLE_TAP_TIME_OUT = 450

const Row = styled.div`
  display:grid;
  width:calc(100% - 2rem);
  color:${props => props.theme.text[1]};
  font-size:1.2rem;
  font-weight:bold;
  line-height:1.6rem;
  margin:2rem 1rem 3rem 1rem;
  grid-template-columns:0.6fr 0.4fr 5rem;
  grid-template-areas:"title artist position";
  opacity:0;
  animation: ${FadeIn} 0.8s 1 both ;
`;

const GridCenter = styled.div`
  display:grid;
  align-items:center;
  justify-content:center;
  padding:0;
  width:100%;
  user-select: none;
  overflow:hidden;
  cursor: pointer;
`;

const Title = styled(GridCenter)`
  justify-content:start;
  grid-area:title;
`;

const Artist = styled(GridCenter)`
  font-size:1.1rem;
  grid-area:artist;
  white-space: pre-wrap;
  text-align:center;
`;

const Position = styled(GridCenter)`
  grid-area:position;  
`;

class Result extends Component {
  constructor() {
    super()
    this.timeout = null
    this.lastTapTime = 0
  }

  // ref: http://jsfiddle.net/brettwp/J4djY/
  handleDoubleTapEvent(event, doubleTapEvent) {
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

  getFieldText() {
    /*
     * Replace artist text with "-" if no artist data
     * Replace "/", "+" with "line break" if there are multi artist in one field
     * (by "white-space: pre-wrap;") 
    **/
    const { title, artist, volume, page } = this.props
    const artistText = (artist === '' || artist === 'XXX') ? '-' : artist.replace(/[/+]/ig, '\n')
    const positionText = volume === '' ? page : `${volume}/${page}`
    const titleText = title
    return { artistText, positionText, titleText }
  }

  connectToYoutube() {
    const { title, artist } = this.props
    const check = window.confirm(`連結至Youtube搜尋 "${title}" `);
    if (check) {
      window.open('https://www.youtube.com/results?search_query='
        + `${title}+${artist.replace(/[/+]/ig, '+')}`, '_blank').focus()
    }
  }

  render() {
    const fieldText = this.getFieldText()
    const { findArtist } = this.props
    return (
      <Row>
        <Title onTouchEnd={e =>
          this.handleDoubleTapEvent(e, () => this.connectToYoutube())}>
          {fieldText.titleText}
        </Title>
        <Artist onTouchEnd={e =>
          this.handleDoubleTapEvent(e, () => findArtist())}>
          {fieldText.artistText}
        </Artist>
        <Position>{fieldText.positionText}</Position>
      </Row>
    )
  }
}

export default Result
