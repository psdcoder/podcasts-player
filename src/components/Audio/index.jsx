import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class AudioPlayer extends PureComponent {
  static propTypes = {
    children: PropTypes.func,
    currentTime: PropTypes.number,
    isPlaying: PropTypes.bool,
    onEnd: PropTypes.func,
    src: PropTypes.string.isRequired,
  }

  static defaultProps = {
    currentTime: 0,
    isPlaying: false,
    children: () => {},
    onEnd: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: props.isPlaying,
      currentTime: props.currentTime,
      buffered: 0,
      duration: 0,
    };
  }

  componentDidMount() {
    if (this.props.isPlaying) {
      this.play();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this._updateSrc();
    }

    if (prevProps.currentTime !== this.props.currentTime) {
      this.setTime(this.props.currentTime);
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this[this.props.isPlaying ? 'play' : 'pause']();
    }
  }

  setPlaybackRate = playbackRate => (this._audioNode.playbackRate = playbackRate)

  setTime = time => (this._audioNode.currentTime = time)

  setVolume = volume => (this._audioNode.volume = volume)

  play = () => this._audioNode.play()

  pause = () => this._audioNode.pause()

  _saveRef = node => (this._audioNode = node)

  _updateSrc = () => {
    this.pause();
    this.setState({
      currentTime: 0,
      duration: this._audioNode.duration,
    }, () => {
      this._audioNode.load();

      if (this.props.isPlaying) {
        this.play();
      }
    });
  }
  _onProgress = () => this.setState({
    duration: this._audioNode.duration,
    buffered: this._audioNode.buffered,
  })

  _onTimeUpdate = () => this.setState({
    currentTime: this._audioNode.currentTime,
    duration: this._audioNode.duration,
  })

  _onEnded = () => {
    this._audioNode.currentTime = 0;
    this.props.onEnd();
  }

  render() {
    const { children, src } = this.props;

    return (
      <Fragment>
        <audio
          preload="none"
          ref={this._saveRef}
          src={src}
          controls
          onAbort={this._onAbort}
          onCanPlay={this._onCanPlay}
          onCanPlayThrough={this._onCanPlayThrough}
          onDurationChange={this._onDurationChange}
          onEmptied={this._onEmptied}
          onEnded={this._onEnded}
          onError={this._onError}
          onLoadedData={this._onLoadedData}
          onLoadedMetadata={this._onLoadedMetadata}
          onLoadStart={this._onLoadStart}
          onPause={this._onPause}
          onPlay={this._onPlay}
          onPlaying={this._onPlaying}
          onProgress={this._onProgress}
          onRateChange={this._onRateChange}
          onSeeked={this._onSeeked}
          onSeeking={this._onSeeking}
          onStalled={this._onStalled}
          onSuspend={this._onSuspend}
          onTimeUpdate={this._onTimeUpdate}
          onVolumeChange={this._onVolumeChange}
          onWaiting={this._onWaiting}
        />
        {children({
          ...this.state,
          play: this.play,
          pause: this.pause,
          setTime: this.setTime,
        })}
      </Fragment>

    );
  }
}
