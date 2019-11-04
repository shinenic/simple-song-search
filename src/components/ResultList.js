import React, { Component } from 'react';
import Result from './Result';
import styled from 'styled-components';

const ResultCard = styled.div`
  background: #fff;
  /* font-size=17 */
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
  /* transition: all 0.3s cubic-bezier(.25,.8,.25,1); */
  border-radius: 8px;
  /* border:1px solid rgb(218,220,224); */
  min-height:50px;
  line-height:50px;
  width: 91%;
  margin-left:2%;
  margin-top:17px;
  padding-left:10px;
  padding-right:10px;
  display: table;
`;
class ResultList extends Component {
  constructor() {
    super();
    this.artistClick = this.artistClick.bind(this);
  }
  artistClick(artist) {
    this.props.findArtist(artist);
  }
  render() {
    const resultArray = this.props.result;
    return (
      <div>
        {/* {resultArray.map((obj, index) => {
          return (
            <ResultCard key={index}>
              <Result
                key={index}
                title={obj.title}
                artist={obj.artist}
                volume={obj.volume}
                page={obj.page}
                artistClick={this.artistClick} />
            </ResultCard>
          );
        })} */}
        {resultArray.map((Arr, index) => {
          return (
            <ResultCard key={index}>
              <Result
                key={index}
                title={Arr[0]}
                artist={Arr[1]}
                volume={Arr[2]}
                page={Arr[3]}
                artistClick={this.artistClick} />
            </ResultCard>
          );
        })}
      </div>
    );
  }
}

export default ResultList;
