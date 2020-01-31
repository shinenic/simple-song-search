import React from 'react'
import DoubleTap from './common/doubleTap'

const Result = ({ title, artist, volume, page, findArtist }) => {

  const getFieldText = () => {
    /*
     * If no artist data                       =>  Replace artist text with "-"
     * If there are multi artist in one field  =>  Replace "/", "+" with "line break"
     *                                             (based on "white-space: pre-wrap;") 
    **/
    const artistText = (artist === '' || artist === 'XXX') ? '-' : artist.replace(/[/+]/ig, '\n')
    const positionText = volume === '' ? page : `${volume}/${page}`
    const titleText = title
    return { artist: artistText, position: positionText, title: titleText }
  }

  const connectToYoutube = () => {
    const check = window.confirm(`連結至Youtube搜尋 "${title}" `);
    if (check) {
      window.open('https://www.youtube.com/results?search_query='
        + `${title}+${artist.replace(/[/+]/ig, '+')}`, '_blank').focus()
    }
  }

  const fieldText = getFieldText()

  return (
    <div className="row">
      <DoubleTap
        className={'column-title'}
        content={fieldText.title}
        doubleTapEvent={() => connectToYoutube()} />
      <DoubleTap
        className={'column-artist'}
        content={fieldText.artist}
        doubleTapEvent={() => findArtist()} />
      <div className="column-position">{fieldText.position}</div>
    </div>
  )
}

export default Result
