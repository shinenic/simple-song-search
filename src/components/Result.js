import React, { Component } from 'react'
import styled from 'styled-components'
import { FadeIn } from '../styles/utils'

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
  render() {
    const positionText
      = this.props.volume === ''
        ? this.props.page
        : `${this.props.volume}/${this.props.page}`

    let artistText    
    if(this.props.artist === '' || this.props.artist === 'XXX'){
      // Replace artist's data fields with "-"
      artistText = '-'
    } else {
      // Replace "/", "+" in artist's data fields with line break (by "white-space: pre-wrap;")
      artistText = this.props.artist.replace(/[/+]/ig, '\n')
    }

    return (
      <Row>
        <Title onDoubleClick={() => {
          const check = window.confirm(`連結至Youtube搜尋 "${this.props.title}" `);
          if (check) {
            window.open('https://www.youtube.com/results?search_query='
              + `${this.props.title}+${this.props.artist.replace(/[/+]/ig, '+')}`, '_blank').focus()
          }
        }}>{this.props.title}</Title>
        <Artist onDoubleClick={() => this.props.findArtist()}>{artistText}</Artist>
        <Position>{positionText}</Position>
      </Row>
    )
  }
}

export default Result
