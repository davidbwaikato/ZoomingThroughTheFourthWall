import React from 'react'
import CheckImg from '../resources/images/check.png';

const OnlyWithAudioCheckbox = (props) => {
  
    const {connectOnlyWithAudio, setConnectOnlyWithAudio} = props;

    const handleConnectionTypeChange = () => {
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    }
  
    return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        { connectOnlyWithAudio && (
            <img className="checkbox_image" src= {CheckImg} />
        )}
      </div>
      <p className="checkbox_container_paragraph">Connect only with audio</p>
    </div>
  )
}

export default OnlyWithAudioCheckbox
