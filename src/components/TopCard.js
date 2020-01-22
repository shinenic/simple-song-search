import React, { Component } from 'react'
import styled from 'styled-components'

import Menu from "../img/half.svg"
import Cross from "../img/cross.svg"
import Search from "../img/search.svg"

const WAITING_FOR_ADD_HISTORY_TIMEOUT = 1000

const getIconPositionStyles = ({ position }) => ({
  left: position === 'left' ? '1rem' : 'unset',
  right: position === 'right' ? '1rem' : 'unset'
})

const TopCard = styled.div`
  width:100%;
  height:4rem;
  background:${props => props.theme.main[0]};
  opacity:0.8;
  z-index:10;
  position: sticky;
  top:10px;
`

const IconContainer = styled.div`
  position: absolute;
  height:4rem;
  width:4rem;
  ${getIconPositionStyles};
  top:0;
  display:flex;
  align-items:center;
  justify-content:center;
`

const Icon = styled.img`
  max-height: 1.6rem;
  transition:filter 0.3s;
  filter:${props => props.theme.iconColor[0]};
  cursor: pointer; 
`

const CrossImg = styled(Icon)`
  content:url(${Cross});
  filter:${props => props.theme.iconColor[1]};
`

const SearchImg = styled(Icon)`
  content:url(${Search});
`

const MenuImg = styled(Icon)`
  content:url(${Menu});
  filter:${props => props.theme.iconColor[0]};
  transition: transform 0.3s;
  transform:${props => props.theme.iconDir[0]};
`

const Input = styled.input`
  width: calc(100% - 2rem);
  height: 100%;
  margin: 0 auto;
  padding:0 4rem;
  border-radius: 5px;
  border: 2px solid transparent;
  letter-spacing: 0.1ex;
  font-size: 1.4rem;
  background:${props => props.theme.main[1]};
  display:block;
  color:${props => props.theme.text[0]};
  transition:border 0.3s;
  &:focus{
    border: 2px solid ${props => props.theme.border};
    outline: none;
    /* Icon inside input box (after focus) */
    & ~ div > img{
      filter:${props => props.theme.iconColor[1]};
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
    // Clean setTimeout after a second
    clearTimeout(this.timeOutHistory)
    this.timeOutHistory = setTimeout(() => {
      this.props.addHistory(this.props.inputText)
    }, WAITING_FOR_ADD_HISTORY_TIMEOUT)
  }

  render() {
    const { inputText, isCleaned, toggleTheme, clearInputText } = this.props
    return (
      <TopCard>
        <Input
          type="text"
          placeholder="Title / Artist / Volume"
          value={inputText}
          onChange={e => this.handleChange(e)}
          onKeyUp={() => this.handleKeyUp()}
          onBlur={() => this.handleBlur()}
          ref={(ref) => { this.input = ref }} />
        <IconContainer position='left'>
          <MenuImg onClick={() => toggleTheme()} />
        </IconContainer>
        <IconContainer position='right'>
          <CrossImg
            className={isCleaned ? 'hide' : null}
            onClick={() => clearInputText()} />
          <SearchImg
            className={isCleaned ? null : 'hide'}
            onClick={() => this.input.focus()} />
        </IconContainer>
      </TopCard>
    );
  }
}

export default SearchInput;
