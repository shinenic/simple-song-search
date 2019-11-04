import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.div`
  text-align:left;
  font-size:17px;
  color:rgb(26,13,189);
  font-weight:bold;
  width:50%;
  float:left;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
`;
const Artist = styled.div`
  text-align:center;
  font-size:14px;
  font-weight:bold;
  width:30%;
  float:left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;
const Position = styled.div`
  text-align:right;
  font-size:17px;
  font-weight:bold;
  width:20%;
  float:left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ResultDiv = styled.div`
  display: table-row;
`;


class Result extends Component {
  copyToClipboard(copyText) {
    var textField = document.createElement('textarea');
    textField.innerText = copyText;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }
  render() {
    const MultiArtist = {
      'line-height': '8px'
    }
    const Over104 = {
      color: 'red'
    }
    const IsMultiArtist = this.props.artist.indexOf('/') !== -1 ? true : false;
    const NewArtistText = this.props.artist.split("/").map((item, i) => <p key={i}>{item}</p>);
    const positionText = this.props.volume ? parseInt(this.props.volume) + "/" + parseInt(this.props.page) : "" + parseInt(this.props.page);
    //判斷是否需要換行
    const EngRegExp = /^[\d|a-zA-Z1-9]+$/;
    let flag = 0;
    for (let i = 0; i < this.props.title.toString().length; i++) {
      if (EngRegExp.test(this.props.title.toString().slice(i, i + 1)))
        flag += 0.5;
      else
        flag += 1;
    }
    const TitleBreakLine = flag > 9 ? true : false;
    return (
      <ResultDiv>
        {/* onClick={console.log(this.props.title)} */}
        <Title
          style={TitleBreakLine ? { 'line-height': '27px', 'margin-bottom': '14px' } : {}}
        >{this.props.title}</Title>
        <Artist
          style={IsMultiArtist ? MultiArtist : {}}
          onDoubleClick={() => this.props.artistClick(this.props.artist)}>
          {IsMultiArtist ? NewArtistText : (this.props.artist ? this.props.artist : "-")}
        </Artist>
        <Position
          style={parseInt(this.props.volume) > 104 ? Over104 : {}}>{positionText}</Position>
      </ResultDiv>
    );
  }
}

export default Result;
