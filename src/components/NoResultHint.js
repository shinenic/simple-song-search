import React from 'react'
import styled from 'styled-components'
import { FadeIn } from '../styles/utils'

const MainDiv = styled.div`
  height:23rem;
  width:100%;
  color:${props => props.theme.text[2]};
  font-size: 1.25rem;
  line-height:23rem;
  text-align:center;
  opacity:0;
  transform:translateY(10px);
  animation: ${FadeIn} 0.8s 1 both ;
`

const NoResultHint = ({displayMode}) => {
  const getText = mode => {
    switch(mode){
      case 'NO_RESULT':
        return 'Nothing Found.'
      default:
        return 'Please Enter Something to Search.'
    }
  }

  return (
    <MainDiv>
      {getText(displayMode)}
    </MainDiv>
  )
}

export default NoResultHint
