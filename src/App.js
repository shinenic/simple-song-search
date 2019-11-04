import React, { Component } from 'react'
import { ThemeProvider } from "styled-components"
import TopCard from './components/TopCard'
import Result from './components/Result'

import matchSorter from 'match-sorter'
import dataArray from './components/dataArray'
import styled from 'styled-components'

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

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText: '',
      clear: false,
      result: [["PUT YOUR HEAD  ON MY SHOULDER", "The Platters", "1", "113"], ["ONLY YOU", "The Platters", "1", "111"], ["IF YOU LOVE ME", "Brenda Lee", "1", "109"], ["I CAN'T STOP LOVING YOU", "Ray Charles", "1", "107"], ["CAN'T HELP FALLING IN LOVE", "Elvis Presley", "1", "105"], ["AM I THAT EASY TO FORGET", "Engelbert Humperdinck", "1", "103"], ["PUPPY LOVE", "Paul Anka", "1", "101"], ["MY PRAYER", "The Platters", "1", "99"], ["THE IMPOSSIBLE DREAM", "Andy Williams", "1", "97"], ["I WHO HAVE NOTHING", "C. Donida", "1", "95"], ["SAVING ALL MY LOVE FOR YOU", "XXX", "1", "93"], ["UNCHAINED MELODY", "The Righteous Brothers", "1", "91"], ["THE WEDDING", "Julie Rogers", "1", "89"], ["MEMORIES", "XXX", "1", "87"], ["SOMEWHERE MY LOVE", "Ray Conniff", "1", "85"], ["DADDY'S HOME", "Jermaine Jackson", "1", "83"], ["I LOVE HOW YOU LOVE ME", "Bobby Vinton", "1", "81"], ["WHEN I NEED YOU", "Leo Sayer", "1", "79"], ["MICHELLE", "The Beatless", "1", "77"], ["TOO YOUNG", "Net King Cole", "1", "75"], ["CLOSE TO YOU", "Carpenters", "1", "73"], ["DON'T IT MAKE MY BROWN EYES BLUE", "Crystal Gayle", "1", "71"], ["LOVE LETTERS", "Elvis Presley", "1", "69"], ["LOVE ME TENDER", "Elvis Presley", "1", "67"], ["OVER THE RAINBOW", "Judy Garland", "1", "65"], ["MONA LISA", "Net King Cole", "1", "63"], ["DANNY BOY", "Andy Williams", "1", "61"], ["AUTUMN LEAVES", "XXX", "1", "59"], ["GREEN FIELDS", "The Brother Four", "1", "57"], ["DELILAH", "Tom Jones", "1", "55"], ["MORNING HAS BROKEN", "Cat Stevens", "1", "53"], ["SUNRISE SUNSET", "Soundtracle", "1", "51"], ["THE LAST WALTZ", "Engelbert Humperdinck", "1", "49"], ["ANNIE'S SONG", "John Danver", "1", "47"], ["JEAN", "XXX", "1", "45"], ["A TIME FOR US", "Andy Williams", "1", "43"], ["THERE GOES MY EVERYTHING", "Elvis Presley", "1", "41"], ["COULD I HAVE THIS DANCE", "XXX", "1", "39"], ["YOU LIGHT UP MY LIFE", "Dabble Boone", "1", "37"], ["TRY  TO  REMEMBER", "The Brother Four", "1", "35"], ["TODAY", "XXX", "1", "33"], ["TENNESSEE WALTZ", "Patti Page", "1", "31"], ["TAMMY", "Dabbie Reynolds", "1", "29"], ["I ALWAYS GET  LUCKY  WITH  YOU", "XXX", "1", "27"]],
      maxRow: 5,
      currentPage: 0,
      maxPage: -1,
      limit: true,
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
      this.setState({ result })
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
  render() {
    // console.log(this.state)
    // console.log(dataArray.length)
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
        {/* <Result
          title={'妥朵熱賭撤'}
          artist={'到底是'}
          volume={'46'}
          page={'152'} />
        <Result
          title={'是不是這樣的夜晚你才會這樣的想起我'}
          artist={'JEOIRJV'}
          volume={'46'}
          page={'152'}  />
        <Result
          title={'是亞後雅'}
          artist={'JEOIRJV'}
          volume={'46'}
          page={'152'}  /> */}
        {this.state.result.slice(0, this.state.currentCount).map((data, index) =>
          <Result
            key={index}
            title={data[0]}
            artist={data[1]}
            volume={data[2]}
            page={data[3]} />
        )}



        {/* <div style={{ height: '1000px' }} /> */}

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
