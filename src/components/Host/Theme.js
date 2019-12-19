import React, { Component } from 'react';
import theme from '../../theme.mp3';
import Sound from 'react-sound';

export default class Theme extends Component {

  render() {
    return (
      <Sound
        url={ theme }
        playStatus={ Sound.status.playing }
        onLoading={ this.handleSongLoading }
        onPlaying={ this.handleSongPlaying }
        onFinishedPlaying={ this.handleSongFinishedPlaying }
      />
    )
  }
}
