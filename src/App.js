import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import TopCard from './components/TopCard'
import Result from './components/Result'
import matchSorter from 'match-sorter'

import dataArray from './components/dataArray'
import styled, { keyframes, createGlobalStyle, ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './styles/AppTheme'

const INIT_RESULT_COUNT = 20
const ADD_RESULT_COUNT = 50

// TODO: Apply HOC

const clearAllBlank = str => {
  return str.replace(/[\r\n\s]/g, '')
}

const isZhuyin = str => {
  const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/
  return zhuyin.test(str)
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
    // Set scroll event listener
    const { s: searchParam } = this.getUrlParams()
    if (searchParam) {
      this.search(searchParam)
      this.updateInputText(searchParam)
    }
    window.addEventListener('scroll', () => this.handleScroll())
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll())
  }

  // Return a object of url's params
  getUrlParams() {
    const queries = decodeURI(window.location.href).split('?')[1]
    return queries
      ? queries.split('&').reduce((acc, value) => {
        acc[value.split('=')[0]] = value.split('=')[1]
        return acc
      }, {})
      : {}
  }

  // TODO: When scroll down to specific position, it will show a icon and auto scroll to top after clicked
  handleScroll() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 60
      && this.state.currentCount !== this.state.result.length) {
      this.setState({
        currentCount: this.state.currentCount + ADD_RESULT_COUNT > this.state.result.length
          ? this.state.result.length + 1
          : this.state.currentCount + ADD_RESULT_COUNT
      })
    }
  }

  updateInputText(str) {
    this.setState({ inputText: str })
  }

  search(str) {
    const content = clearAllBlank(str)
    // If the input(removed all blank) is not empty and the last character is not Zhuyin
    if (!isZhuyin(content.slice(-1)) && content !== '') {
      const result = matchSorter(dataArray, content)
      this.setState({
        result,
        isCleaned: false,
        currentCount: INIT_RESULT_COUNT
      })
      // Scroll to top if result has been changed
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  saveToDatabase(dbUrl, content) {
    axios.post(dbUrl, { "content": content }).catch(err => console.error(err))
  }

  addHistory(str) {
    const content = clearAllBlank(str)
    const { incognito } = this.getUrlParams()
    const { history } = this.state
    const incognitoParam = incognito ? '&incognito=true' : ''
    // If the input(removed all blank) is not empty
    // , the last character is not Zhuyin and have no duplicated history
    if (!isZhuyin(content.slice(-1)) && content !== '' && (history.length === 0 || str !== history[0])) {
      this.setState({ history: [content, ...history] })
      this.props.history.push(encodeURI(`search?s=${content}${incognitoParam}`))
      !incognito && this.saveToDatabase('https://songsearch.kadenzwei.com/api/ss', content)
    }
  }

  // TODO: Add plyfill for smooth scrollTop
  clearInputText() {
    const { incognito } = this.getUrlParams()
    if (this.state.inputText !== '') {
      // It will update inputText only but result
      this.setState({ inputText: '' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      this.setState({ result: [], isCleaned: true })
    }
    this.props.history.push(incognito ? '?incognito=true' : '')
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
            (this.state.inputText !== '' && !isZhuyin(clearAllBlank(this.state.inputText).slice(-1))
              ? <NoResultHint>
                Nothing Found.
            </NoResultHint>
              : <NoResultHint>
                Please Enter Something to Search...
          </NoResultHint>)}
        </MainDiv>
      </ThemeProvider >
    )
  }
}

export default withRouter(App)
