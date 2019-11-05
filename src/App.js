import React, { Component } from 'react'
import TopCard from './components/TopCard'
import Result from './components/Result'
import matchSorter from 'match-sorter'
import { withRouter } from 'react-router-dom'
import dataArray from './components/dataArray'
import styled, { keyframes, createGlobalStyle, ThemeProvider } from 'styled-components'
import axios from 'axios'

const INIT_RESULT_COUNT = 20
const ADD_RESULT_COUNT = 50
const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/

// TODO: 拆出 HOC
// TODO: test is correct REGEX
const clearAllBlank = (str) => {
  return str.replace(/[\r\n\s]/g, '')
}

const GlobalStyle = createGlobalStyle`
  html {
    background:${props => props.theme.main[0]};
  }
`
const MainDiv = styled.div`
  margin: 0px;
  padding: 0px;
  position: relative;
  width: 100%;
`;
const FadeIn = keyframes`
 from{
    opacity:0;
    transform:translateY(20px);
    }
  to{
    opacity:1;
    transform:translateY(0);
  }
`;
const NoResultHint = styled.div`
  height:23rem;
  width:100%;
  color:${props => props.theme.text[2]};
  font-size: 1.25rem;
  line-height:23rem;
  text-align:center;
  opacity:0;
  transform:translateY(10px);
  animation: ${FadeIn} 0.8s 1 both ;
`;
const lightTheme = {
  // main-white, second-white
  main: ['rgb(237, 236, 238)', 'rgb(207, 210, 215)'],
  // input-text(還要考慮透明度), result-text, no-data-text, placehoder-text
  text: ['black', 'rgb(9, 7, 10)', 'rgb(49, 46, 37)', 'rgb(59, 56, 50)'],
  // icon-regular, icon-active
  icon: ['invert(0.2)', 'invert(0)'],
  // input-border
  border: 'rgb(153, 153, 153)'
};
const darkTheme = {
  // main-black, second-black
  main: ['rgb(32, 33, 36)', 'rgb(66, 67, 71)'],
  // input-text(還要考慮透明度), result-text, no-data-text, placehoder-text
  text: ['white', 'rgb(247, 246, 248)', 'rgb(207, 210, 215)', 'rgb(197, 200, 205)'],
  // icon-regular, icon-active
  icon: ['invert(0.6)', 'invert(0.9)'],
  // input-border
  border: 'rgb(153, 153, 153)'
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText: '',
      result: [],
      history: [],
      isCleaned: true,
      currentCount: INIT_RESULT_COUNT,
      theme: 'INIT'
    }
  }
  componentDidMount() {
    // 初始化時讀取 url query string (decode utf-8) & 設定 scroll 事件
    const query = decodeURI(window.location.href).split('=')
    if (query.length === 2) {
      this.search(query[1])
      this.updateInputText(query[1])
    }
    window.addEventListener('scroll', () => this.handleScroll())
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll())
  }
  // TODO: 卷軸捲到低於 XXX 時，顯示一個可以移動到 TOP 的圖標 
  handleScroll() {
    if ((window.innerHeight + window.pageYOffset)
      >= document.body.offsetHeight - 60) {
      if (this.state.currentCount !== this.state.result.length) {
        this.setState({
          currentCount: this.state.currentCount + ADD_RESULT_COUNT > this.state.result.length
            ? this.state.result.length + 1
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
        isCleaned: false,
        currentCount: INIT_RESULT_COUNT
      })
      // 如果資料有變動，移動到最上方
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
        // 利用 url 存取上一次的搜尋紀錄
        this.props.history.push(encodeURI(`search?s=${content}`))
        // 將資料存入 database (ss)
        axios.post(`https://songsearch.kadenzwei.com/api/ss`, { "content": content })
          .then(res => { console.log('res=>', res); })
      }
    }
  }
  clearInputText() {
    if (this.state.inputText !== '') {
      this.setState({ inputText: '' }) // 僅更新 inputText, result 不會更新到
      // 建立 smooth 的 polyfill
      window.scrollTo({ top: 0, behavior: 'smooth' }) // 移動到最上方
    } else {
      this.setState({ result: [], isCleaned: true })
    }
    this.props.history.push('')
  }
  findArtist(artist) {
    this.search(artist)
    this.updateInputText(artist)
    this.addHistory(artist)
  }
  toggleTheme() {
    this.setState({ theme: !this.state.theme })
  }
  render() {
    return (
      <ThemeProvider theme={this.state.theme ? darkTheme : lightTheme}>
        <MainDiv className="main">
          <GlobalStyle />
          <div style={{ height: '35px' }} />
          <TopCard
            inputText={this.state.inputText}
            isCleaned={this.state.isCleaned}
            clearInputText={() => this.clearInputText()}
            toggleTheme={() => this.toggleTheme()}
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
      </ThemeProvider >
    )
  }
}

export default withRouter(App)
