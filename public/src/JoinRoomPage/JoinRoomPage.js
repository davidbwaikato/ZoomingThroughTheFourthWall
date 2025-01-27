import React from 'react'
import './JoinRoomPage.css';
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from './JoinRoomContent';

const JoinRoomPage = (props) => {
    const {socket } = props;

    return (
        <div className="join_room_page_container">
            <div className='join_room_page_panel'>
                <JoinRoomTitle />
                <JoinRoomContent socket={socket} />
            </div>
        </div>
  )
}

export default JoinRoomPage;
