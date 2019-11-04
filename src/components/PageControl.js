import React, { Component } from 'react';
import styled from 'styled-components';
import arrow from "../img/arrow.png";
import arrowDisable from "../img/arrow-disable.png";

const BottomCard = styled.div`
  position:absolute;
  width:100%;
  bottom:0;
  left:0;
  padding-bottom:30px;

  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`;
const ArrowIcon = styled.img`
  height: 23px;
  width: 23px;
  display:block;
  margin:auto;
  cursor: pointer;
`;
const Next = styled(ArrowIcon)`
  content:url(${arrow});
 `;
const Previous = styled(Next)`
  transform: rotate(180deg);
`;
const NextDisable = styled(ArrowIcon)`
  content:url(${arrowDisable});
 `;
const PreviousDisable = styled(NextDisable)`
 transform: rotate(180deg);
`;
const ArrowDiv = styled.div`
  float:left;
  width:30%;
`;
const ResultText = styled.div`
  text-align:center;
  float:left;
  width:40%;
  line-height:23px;
`;


class PageControl extends Component {
  render() {
    const startData = this.props.currentPage * this.props.maxRow + 1;
    const endtData = this.props.currentPage === this.props.maxPage ? this.props.resultLength : startData + this.props.maxRow - 1;
    const text = startData + "-" + endtData + " of " + this.props.resultLength + " result";
    return (
      <BottomCard style={{ display: this.props.maxPage !== -1 ? 'block' : 'none' }}>
        <ArrowDiv>
          {this.props.currentPage !== 0 ?
            <Previous onClick={() => this.props.changePage('prev')} /> :
            <PreviousDisable />}
        </ArrowDiv>
        <ResultText>
          {text}
        </ResultText>
        <ArrowDiv>
          {this.props.currentPage !== this.props.maxPage ?
            <Next onClick={() => this.props.changePage('next')} /> :
            <NextDisable />}
        </ArrowDiv>
      </BottomCard>

    );
  }
}

export default PageControl;
