import React, { Component } from 'react'
import styled from 'styled-components'

import Menu from "../img/half.svg"
import Cross from "../img/cross.svg"
import Search from "../img/search.svg"

const TopCard = styled.div`
  width:100% ;
  height:4rem;
  background:${props => props.theme.main[0]};
  opacity:0.8;
  z-index:10;
  position: sticky;
  top:10px;
`;
const IconContainer = styled.div`
  position: absolute;
  height:4rem;
  width:4rem;
  left:${props => props.dir === 'left' ? '1rem' : 'unset'};
  right:${props => props.dir === 'right' ? '1rem' : 'unset'};
  top:0;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const Icon = styled.img`
  max-height: 1.6rem;
  transition:filter 0.3s;
  filter:${props => props.theme.icon[0]};
  cursor: pointer; 
`;
const CrossImg = styled(Icon)`
  content:url(${Cross});
  filter:${props => props.theme.icon[1]};
`;
const SearchImg = styled(Icon)`
  content:url(${Search});
`;
const MenuImg = styled(Icon)`
  content:url(${Menu});
  filter:${props => props.theme.icon[0]};
`;

const Input = styled.input`
  width: calc(100% - 2rem);
  height: 100%;
  margin: 0 auto;
  padding:0 4rem;
  border-radius: 5px;
  border: 1.9px solid transparent;
  letter-spacing: 0.1ex;
  font-size: 1.4rem;
  background:${props => props.theme.main[1]};
  display:block;
  color:${props => props.theme.text[0]};
  transition:border 0.3s;
  &:focus{
    border: 1.9px solid ${props => props.theme.border};
    outline: none;
    /* 選擇輸入框的 ICON */
    & ~ div > img{
      filter:${props => props.theme.icon[1]};
    }
  }
  &::placeholder { 
    font-size: 1.25rem;
    letter-spacing: 0.15ex;
    color:${props => props.theme.text[3]};
    opacity: 1; /* For Firefox */
  }
`
class SearchInput extends Component {
  constructor() {
    super()
    this.timeOutHistory = null
  }
  handleChange(e) {
    this.props.updateInputText(e.target.value)
    this.props.search(e.target.value)
  }
  handleBlur() {
    this.props.addHistory(this.props.inputText)
  }
  handleKeyUp() {
    // 設定時間內未輸入自動更新紀錄
    clearTimeout(this.timeOutHistory)
    this.timeOutHistory = setTimeout(() => {
      this.props.addHistory(this.props.inputText)
    }, 1000)
  }
  render() {
    return (
      <TopCard>
        <Input
          type="text"
          placeholder="Title / Artist / Volume"
          value={this.props.inputText}
          onChange={e => this.handleChange(e)}
          onKeyUp={() => this.handleKeyUp()}
          onBlur={() => this.handleBlur()}
          ref={(ref) => { this.input = ref }} />
        <IconContainer dir='left'>
          <MenuImg
            // onClick={() => this.input.focus()} 
            onClick={() => this.props.toggleTheme()} />
        </IconContainer>
        <IconContainer dir='right'>
          <CrossImg
            className={`${this.props.isCleaned && 'hide'}`}
            onClick={() => this.props.clearInputText()} />
          <SearchImg
            className={`${!this.props.isCleaned && 'hide'}`}
            onClick={() => this.input.focus()} />
        </IconContainer>
      </TopCard>

    );
  }
}

export default SearchInput;
