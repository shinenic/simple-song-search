import React, { Component } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display:grid;
  /* padding:0 1rem; */
  width:calc(100% - 2rem);
  color:rgb(247,246,248);
  font-size:1.1rem;
  line-height:1.6rem;
  margin:2rem 1rem;
  grid-template-columns:0.6fr 0.4fr 5rem;
  grid-template-areas:"title artist position";
`;
const GridCenter = styled.div`
  display:grid;
  align-items:center;
  justify-content:center;
  /* border:1px solid white; */
  padding:0;
`;
const Title = styled(GridCenter)`
  justify-content:start;
  grid-area:title;
  width:100%;
`;
const Artist = styled(GridCenter)`
  grid-area:artist;
  white-space: pre-wrap;
  text-align:center;
  width:100%;
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
    // 取代歌手中的 "/", "+"，改為換行記號 (需要配合 white-space: pre-wrap;)
    const artistText = this.props.artist.replace(/[\/\+]/ig, '\n');
    return (
      <Row>
        <Title><span>{this.props.title}</span></Title>
        {/* <Title><div>{this.props.title}</div></Title> */}
        <Artist className="artist">{artistText}</Artist>
        <Position>{positionText}</Position>
      </Row>
    )
  }
}

export default Result
