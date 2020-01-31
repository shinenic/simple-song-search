import React from 'react'

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
    <div className="no-result-hint">
      {getText(displayMode)}
    </div>
  )
}

export default NoResultHint
