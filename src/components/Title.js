import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSwipeEvents from 'react-swipe-events'

const TitleText = styled.span`
  font-size:20px;
  font-family:"Helvetica";
  font-weight:bold;
  color:rgb(79,129,189);
`;
const VersionText = styled.span`
  font-size:15px;
  font-family:"Helvetica";
  font-weight:bold;
  color:rgb(79,129,189);
  margin-left:5px;
`;
const TitleTextCenter = styled.div`
  text-align:center;
  height:20px;
  line-height:100%;
  padding-top:10px;
  padding-bottom:10px;

  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`;
class Title extends Component {
  constructor() {
    super();
    this.flag = false;
    this.x = 0;
    this.TitleWidth = 0;
  }
  componentDidMount() {
    this.TitleWidth = window.innerWidth;
  }
  handleSwipe(e, originalX, originalY, endX, endY, deltaX, deltaY) {
    if (Math.abs(endY - originalY) < 50) {
      if ((endX - originalX) > (this.TitleWidth * 7 / 8)) {
        this.props.historySwipeTrigger();
      }
      if ((originalX - endX) > (this.TitleWidth * 7 / 8)) {
        this.props.changeLimit();
      }
    }
  }
  render() {
    return (
      //網頁版中double click可觸發 手機則是左右滑動

      <ReactSwipeEvents onSwiped={this.handleSwipe.bind(this)}>
        <TitleTextCenter>
          <TitleText
            onDoubleClick={() => this.props.historyClkTrigger('right')}
            style={this.props.historyView ? { 'color': 'red' } : {}}>Song Search  </TitleText >
          <VersionText onDoubleClick={() => this.props.changeLimit()} style={this.props.limit ? {} : { 'color': 'red' }}>ver.5.6</VersionText>
        </TitleTextCenter>
      </ReactSwipeEvents>);
  }
}

export default Title;
