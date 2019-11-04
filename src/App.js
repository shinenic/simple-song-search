import React, { Component } from 'react'
import { ThemeProvider } from "styled-components"
import TopCard from './components/TopCard'
import Result from './components/Result'

import matchSorter from 'match-sorter'
import dataArray from './components/dataArray'
import styled, { keyframes } from 'styled-components'

const INIT_RESULT_COUNT = 14
const ADD_RESULT_COUNT = 14
const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/
// TODO: 當資料改變時，滑動滾輪到最上方
// TODO: test is correct REGEX
const clearAllBlank = (str) => {
  return str.replace(/[\r\n\s]/g, '')
}

const MainDiv = styled.div`
  margin: 0px;
  padding: 0px;
  position: relative;
  width: 100%;
`;
const FadeIn = keyframes`
 from{
    opacity:0;
    transform:translateY(10px);
    }
  to{
    opacity:1;
    transform:translateY(0);
  }
`;
const NoResultHint = styled.div`
  height:300px;
  width:100%;
  color:rgb(177,180,185);
  font-size: 1.25rem;
  line-height:300px;
  text-align:center;
  opacity:0;
  transform:translateY(10px);
  animation: ${FadeIn} 0.4s 1 both ;
`;

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText: '',
      // result: [["PUT YOUR HEAD  ON MY SHOULDER", "The Platters", "1", "113"], ["ONLY YOU", "The Platters", "1", "111"], ["IF YOU LOVE ME", "Brenda Lee", "1", "109"], ["I CAN'T STOP LOVING YOU", "Ray Charles", "1", "107"]],
      result: [],
      history: [],
      // 卷軸設計
      currentCount: INIT_RESULT_COUNT
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', () => this.handleScroll())
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll())
  }
  // TODO: 卷軸捲到低於 XXX 時，顯示一個可以移動到 TOP 的圖標 
  handleScroll() {
    if ((window.innerHeight + window.pageYOffset)
      >= document.body.offsetHeight - 50) {
      // TODO: 確認有沒有遺漏資料 (最後一個)
      if (this.state.currentCount !== this.state.result.length) {
        this.setState({
          currentCount: this.state.currentCount + ADD_RESULT_COUNT > this.state.result.length
            ? this.state.result.length
            : this.state.currentCount + ADD_RESULT_COUNT
        })
      }
    }
  }
  updateInputText(str) {
    this.setState({ inputText: str })
  }
  search(str) {
    const content = clearAllBlank(str)
    // 最後輸入不為注音且字串不為空
    if (!zhuyin.test(content.slice(-1)) && content !== '') {
      const result = matchSorter(dataArray, content)
      this.setState({
        result,
        currentCount: INIT_RESULT_COUNT
      })
      // 如果資料有變動，移動到最上方 (平滑的)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  addHistory(str) {
    const content = clearAllBlank(str)
    // 取代空白後，最後輸入不為注音
    if (!zhuyin.test(content.slice(-1))) {
      // 是否為空字串 OR 尚未有重複紀錄
      if (content !== '' && (this.state.history.length === 0 || str !== this.state.history[0])) {
        this.setState({
          history: [content, ...this.state.history]
        })
      }
    }
  }
  clearInputText() {
    // 僅更新 inputText, result 不會更新到
    this.setState({ inputText: '' })
  }
  findArtist(artist) {
    this.search(artist)
    this.updateInputText(artist)
    this.addHistory(artist)
  }
  render() {
    return (
      // <ThemeProvider>
      <MainDiv className="main">
        <div style={{ height: '25px' }} />
        <TopCard
          inputText={this.state.inputText}
          clearInputText={() => this.clearInputText()}
          updateInputText={str => this.updateInputText(str)}
          search={str => this.search(str)}
          addHistory={str => this.addHistory(str)} />
        {this.state.result.slice(0, this.state.currentCount).map((data, index) =>
          <Result
            key={index}
            title={data[0]}
            artist={data[1]}
            volume={data[2]}
            page={data[3]}
            findArtist={() => this.findArtist(data[1])} />
        )}
        {this.state.result.length === 0 &&
          (this.state.inputText !== '' && !zhuyin.test(clearAllBlank(this.state.inputText).slice(-1))
            ? <NoResultHint>
              Nothing Found.
            </NoResultHint>
            : <NoResultHint>
              Please Enter Something to Search.
          </NoResultHint>)}
      </MainDiv>
      // </ThemeProvider>
    )
  }
}

export default App
