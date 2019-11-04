import React, { Component } from 'react'
import { ThemeProvider } from "styled-components"
import TopCard from './components/TopCard'
import ResultList from './components/ResultList'
import PageControl from './components/PageControl'

import matchSorter from 'match-sorter'
import dataArray from './components/dataArray'
import styled from 'styled-components'

const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/

// TODO: test is correct REGEX
const clearAllBlank = (str) => {
  // str = str.replace(/\r\n/g, "")
  // str = str.replace(/\n/g, "")
  // str = str.replace(/\s/g, "")
  return str.replace(/[\r\n\s]/g, '')
}

const MainDiv = styled.div`
  margin: 0px;
  padding: 0px;
  position: relative;
  width: 100%;
`;


class App extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      clear: false,
      result: [],
      maxRow: 5,
      currentPage: 0,
      maxPage: -1,
      limit: true,
      history: []
    }
  }
  updateInputText(str) {
    this.setState({ inputText: str })
  }
  handleInputChange(e) {
    // if (!zhuyin.test(clearAllBlank(event.target.value).slice(-1))) {
    //   const result = matchSorter(this.state.limit ? dataArray : dataArray, clearAllBlank(event.target.value))
    //   this.setState({
    //     result: clearAllBlank(event.target.value) === '' ? [] : result, //如果沒輸入東西則不顯示任何資料
    //     maxPage: clearAllBlank(event.target.value) === '' ? -1 : Math.floor((result.length - 1) / this.state.maxRow),
    //     currentPage: clearAllBlank(event.target.value) === '' ? this.state.currentPage : 0
    //   })
    // }
    this.setState({ inputText: e.target.value })
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
  changePage(action) {
    if (action === 'next')
      this.setState({ currentPage: this.state.currentPage + 1 })
    else
      this.setState({ currentPage: this.state.currentPage - 1 })
  }
  findArtist(artist) {
    const result = matchSorter(this.state.limit ? dataArray : dataArray, clearAllBlank(artist));
    // const result = matchSorter(this.state.limit ? jsonDataLimit : jsonData, clearAllBlank(artist), { keys: ['title', 'artist', 'volume'] });
    this.setState({
      inputText: artist,
      result: result,
      maxPage: Math.floor((result.length - 1) / this.state.maxRow),
      currentPage: 0
    })
  }
  changeLimit() {
    this.setState({
      limit: !this.state.limit,
      clear: true,
      inputText: '',
      result: [],
      maxPage: -1
    })
  }

  historySwipeTrigger() {
    this.setState({
      historyView: !this.state.historyView
    })
  }
  historyClkTrigger() {
    this.setState({
      historyView: !this.state.historyView
    })
  }
  render() {
    console.log(this.state.result)
    console.log(this.state.history)
    return (
      // <ThemeProvider>
      <MainDiv>
        <div style={{ height: '25px' }} />

        <TopCard
          inputText={this.state.inputText}
          clearInputText={() => this.clearInputText()}
          updateInputText={str => this.updateInputText(str)}
          addHistory={str => this.addHistory(str)} />



        {/* <div style={{height:'2500px'}}/> */}

        {/* {this.state.historyView ?
          <p style={{ 'margin': '10px' }}>{this.state.history.join(", ")}</p> : <div>
            <ResultList
              findArtist={this.findArtist}
              result={this.state.result.slice(this.state.maxRow * this.state.currentPage, this.state.maxRow * (this.state.currentPage + 1))}>
            </ResultList>
            <PageControl
              maxPage={this.state.maxPage}
              currentPage={this.state.currentPage}
              resultLength={this.state.result.length}
              maxRow={this.state.maxRow}
              changePage={this.changePage}
              historyTrigger={this.historyTrigger}>
            </PageControl>
          </div>} */}
      </MainDiv>
      // </ThemeProvider>
    )
  }
}

export default App
