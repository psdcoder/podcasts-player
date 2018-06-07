import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

const ANIMATION_MULTIPLIER = 1;

export default class Notification extends PureComponent {
  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.shape({
      message: PropTypes.node,
      timeout: PropTypes.number,
    }).isRequired,
    index: PropTypes.number.isRequired,
    offsetHeight: PropTypes.number,
    onDestroy: PropTypes.func.isRequired,
  }

  static defaultProps = {
    children: null,
    offsetHeight: 0,
  }

  componentDidMount() {
    const { data } = this.props;

    anime.timeline()
      .add({
        targets: this._containerNode,
        translateY: '+=200',
        opacity: 0,
        duration: 0 * ANIMATION_MULTIPLIER,
      })
      .add({
        targets: this._containerNode,
        duration: 200 * ANIMATION_MULTIPLIER,
        translateY: 0,
        opacity: 1,
        easing: 'easeInQuad',
      });

    if (data.timeout) {
      setTimeout(this._destroy, data.timeout);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate', prevProps.index, this.props.index, this.props.offsetHeight);

    const indexDiff = prevProps.index - this.props.index;


    if (indexDiff !== 0) {
      anime.timeline()
        .add({
          targets: this._containerNode,
          translateY: this.props.offsetHeight * indexDiff,
          duration: 0 * ANIMATION_MULTIPLIER,
        })
        .add({
          targets: this._containerNode,
          translateY: 0,
          duration: 350 * ANIMATION_MULTIPLIER,
          easing: 'easeInSine',
        });
    }
  }

  _destroy = () => {
    console.log(this, this._containerNode);
    const height = this._containerNode.clientHeight;

    anime({
      targets: this._containerNode,
      opacity: 0,
      duration: 250 * ANIMATION_MULTIPLIER,
      translateY: el => -el.clientHeight,
      easing: 'easeInQuad',
    })
      .finished.then(() => {
        this.props.onDestroy(height);
      });
  }

  _handleRef = node => (this._containerNode = node)

  render() {
    const { children } = this.props;

    return (
      <div ref={this._handleRef}>
        {children({ close: this._destroy })}
      </div>
    );
  }
}
