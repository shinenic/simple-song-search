import React from 'react'
import styled from 'styled-components'
import { FadeIn } from '../styles/utils'

const Row = styled.div`
  display:grid;
  width:calc(100% - 2rem);
  color:${props => props.theme.text[1]};
  font-size:1.2rem;
  font-weight:bold;
  line-height:1.6rem;
  margin:2rem 1rem 3rem 1rem;
  grid-template-columns:0.6fr 0.4fr 5rem;
  grid-template-areas:"title artist position";
  opacity:0;
  animation: ${FadeIn} 0.8s 1 both ;
`;

const GridCenter = styled.div`
  display:grid;
  align-items:center;
  justify-content:center;
  padding:0;
  width:100%;
  user-select: none;
  overflow:hidden;
  cursor: pointer;
`;

const Title = styled(GridCenter)`
  justify-content:start;
  grid-area:title;
`;

const Artist = styled(GridCenter)`
  font-size:1.1rem;
  grid-area:artist;
  white-space: pre-wrap;
  text-align:center;
`;

const Position = styled(GridCenter)`
  grid-area:position;  
`;

const Result = ({ volume, page, artist, title, findArtist }) => {
  const getFieldText = () => {
    /*
     * Replace artist text with "-" if no artist data
     * Replace "/", "+" with "line break" if there are multi artist in one field
     * (by "white-space: pre-wrap;") 
    **/
    const artistText = (artist === '' || artist === 'XXX') ? '-' : artist.replace(/[/+]/ig, '\n')
    const positionText = volume === '' ? page : `${volume}/${page}`
    const titleText = title
    return { artistText, positionText, titleText }
  }
  const fieldText = getFieldText()

  return (
    <Row>
      <Title 
        onDoubleClick={() => {
          const check = window.confirm(`連結至Youtube搜尋 "${title}" `);
          if (check) {
            window.open('https://www.youtube.com/results?search_query='
              + `${title}+${artist.replace(/[/+]/ig, '+')}`, '_blank').focus()
          }
        }}
      >
        {fieldText.titleText}
      </Title>
      <Artist onDoubleClick={() => findArtist()}>{fieldText.artistText}</Artist>
      <Position>{fieldText.positionText}</Position>
    </Row>
  )
}

export default Result
