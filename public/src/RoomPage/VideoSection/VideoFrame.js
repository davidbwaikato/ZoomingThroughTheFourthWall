import React, { useState, useEffect } from 'react';
import { store } from '../../store/store';
import { useInterval } from '../useInterval';
import CopyTextImage from '../../resources/images/copyImageText.svg';

const VideoFrame = ({ stream, userId, muted, replaceStreams, setSelectedUser, setShowPopup }) => {

  // Current value of screen sharing.
  // (For some weird reason this will actually be the opposite of the true value idk whats up)
  const [isScreenSharing, setScreenSharing] = useState(false);

  // Changes the video elements source to a given media stream.
  const setVideoSource = (source, flipped) => {
    // Attach stream to video element
    const video = document.getElementById(userId);
    video.srcObject = source;
      
    // Add event listener to play video once stream has loaded
    // (Even though technically react discourages event listeners like this,
    // it's still the simplest way to go about it)
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });

    // Add event listener to switch video source back to original stream when
    // screen sharing ends
    video.addEventListener('ended', () => {
      if (!isScreenSharing) {
        // Switch stream back to default stream
        setVideoSource(stream, true);
        // Screen sharing has ended
        store.dispatch({ type: "SET_SCREEN_SHARING", payload: !store.getState().isScreenSharing });
      }
    });
  }

  // Updates the state to display a popup containing a snapshot of the current video frame
  const showPopup = () => {
    // Update the state to use this user as the selected user
    setSelectedUser(userId);
    // Update the state to show the popup
    setShowPopup(true);
  }

  // Use polling to check status of screen sharing
  useInterval(() => {
    // Get the state of the store
    const state = store.getState();

    // Only do something if the state of screen sharing has changed and this is the user's stream
    if (isScreenSharing !== state.isScreenSharing && muted) {
      // Toggle screen sharing
      setScreenSharing(state.isScreenSharing);

      if(!isScreenSharing) {
        // Get stream from screen
        navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        }).then((displayStream) => {
          // Change video source to display stream
          setVideoSource(displayStream, false);
          // Replace peer stream with the current stream
          replaceStreams(displayStream);
        });
      }
      else {
        // Change video source back to webcam
        setVideoSource(stream, true);
        replaceStreams(stream);
      }
    }
  }, 100);

  useEffect(() => {
    // Attach stream to video element
    setVideoSource(stream, true);
  });

    function handleKeyDown(event) {

	const video = document.getElementById(userId);
	
	if (event.key == 'a') {
	    console.log(`Move video id=${userId} Left`);

	    video.style.visibility = "hidden";
	    //video.style.transform = "rotateY(180deg) scale(1.2,1.2) translate(12%,0%);";
	}
	else if (event.key == 'd') {
	    console.log(`Move video id=${userId} Right`);
	    video.style.visibility = "visible";
	}
	else if (event.key == 'w') {
	    console.log(`Move video id=${userId} Up`);
	}
	else if (event.key == 's') {
	    console.log(`Move video id=${userId} Down`);
	}
	
    }
    
  // Display message until the stream is ready
  return (
      <div className="video-frame-container"> 
	  <video className="video-frame-elem" id={userId} muted={muted}
		 onKeyDown={handleKeyDown}		 
	  /> 
	  <img src={CopyTextImage} alt="Get text from video" onClick={showPopup} />
    </div>
  );
}

export default VideoFrame;
