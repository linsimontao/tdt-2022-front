import React, { useState } from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"
import { ImageButton } from '../Common/ImageButton';
import YouTube from 'react-youtube';
export const SubLive = ({ subPageActive, setSubPageActive, liveType, setLiveType }) => {
    return (
        <div className={subPageActive ? "subpage-active" : "subpage"}>
            <SubPageTitle subPageTitle="LIVE" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
            {
                subPageActive ?
                    <SubLiveBody liveType={liveType} setLiveType={setLiveType} /> :
                    <></>
            }
        </div>
    );
}

const SubLiveBody = ({liveType, setLiveType}) => {
    const clickHandler = (id) => {
        if (id === liveType) return;
        console.log("clickHandler" + id );
        setLiveType(id);
    }

    const _onReady = (event)  => {
        event.target.pauseVideo();
        event.target.mute();
      }

    const opts = {
        height: '130',
        width: '224',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          modestbranding: 1,

        },
      };

      return (
        <div className="subpage-body">
                <div className = "subpage-buttons">
                    <ImageButton icon="LIVE" text="VIDEO" active={liveType === 'video'} onClick={() => clickHandler('video')} />
                    <ImageButton icon="RIDER" text="MAPBOX" active={liveType === 'mapbox'} onClick={() => clickHandler('mapbox')}/>
                </div>
                <div className = "live-videos">
                    <YouTube className="live-youtube-plauyer" videoId="2cnm3CNks4E" opts={opts} onReady={_onReady} />
                    <div className="live-videos-label">中継地点1</div>
                    <div className="live-videos-label-km">00km</div>
                    <YouTube className="live-youtube-plauyer" videoId="B3f6HEO5_uk" opts={opts} onReady={_onReady} />
                    <div className="live-videos-label">中継地点1</div>
                    <div className="live-videos-label-km">00km</div>
                    <YouTube className="live-youtube-plauyer" videoId="nOJyxG9-JLk" opts={opts} onReady={_onReady} />
                    <div className="live-videos-label">中継地点1</div>
                    <div className="live-videos-label-km">00km</div>
                    <YouTube className="live-youtube-plauyer" videoId="a3Yw0RNUetI" opts={opts} onReady={_onReady} />
                    <div className="live-videos-label">中継地点1</div>
                    <div className="live-videos-label-km">00km</div>
                    <YouTube className="live-youtube-plauyer" videoId="ntBlmTrDVjw" opts={opts} onReady={_onReady} />
                    <div className="live-videos-label">中継地点1</div>
                    <div className="live-videos-label-km">00km</div>
                </div>
        </div>
    );
};