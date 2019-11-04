import React, { Component } from 'react'
import styled from 'styled-components'

import Menu from "../img/menu.svg"
import Cross from "../img/cross.svg"
import Search from "../img/search.svg"

const TopCard = styled.div`
  width:100% ;
  height:4rem;
  background: rgb(32,33,36);
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
  transition:filter 0.5s;
  filter:invert(0.6);
  cursor: pointer; 
`;
const CrossImg = styled(Icon)`
  content:url(${Cross});
  filter:invert(0.9);
`;
const SearchImg = styled(Icon)`
  content:url(${Search});
`;
const MenuImg = styled(Icon)`
  content:url(${Menu});
`;

const Input = styled.input`
  width: calc(100% - 2rem);
  height: 100%;
  margin: 0 auto;
  padding:0 4rem;
  border-radius: 5px;
  border: 3px solid transparent;
  letter-spacing: 0.1ex;
  font-size: 1.4rem;
  color: rgb(234,236,235);
  background: rgb(66,67,71);
  display:block;
  color:white;
  transition:0.5s;
  &:focus{
    border: 3px solid #999;
    outline: none;
    /* 選擇輸入框的 ICON */
    & ~ div > img{
      filter:invert(0.9);
    }
  }
  &::placeholder { 
    font-size: 1.25rem;
    letter-spacing: 0.15ex;
    color: rgb(137,140,145);
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
          <MenuImg onClick={() => this.input.focus()}/>
        </IconContainer>
        <IconContainer dir='right'>
          <CrossImg
            onClick={() => this.props.clearInputText()}
            className={`${this.props.isCleaned && 'hide'}`} />
          <SearchImg
            className={`${!this.props.isCleaned && 'hide'}`}
            onClick={() => this.input.focus()} />
        </IconContainer>
      </TopCard>

    );
  }
}

export default SearchInput;
