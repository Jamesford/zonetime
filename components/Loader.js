import React, { Component } from 'react'

export default class Loader extends Component {
  getAnimationStyle (i) {
    const animation = `ScaleLoader 1s ${i * 0.1}s infinite cubic-bezier(.2,.68,.18,1.08)`
    const animationFillMode = `both`
    const prefixes = ['Webkit', 'Moz', 'Ms', 'O']

    let styles = {
      display: 'inline-block',
      backgroundColor: this.props.color,
      height: this.props.height,
      width: this.props.width,
      margin: this.props.margin,
      borderRadius: this.props.radius,
      verticalAlign: this.props.verticalAlign,
      animation,
      animationFillMode
    }

    prefixes.forEach(p => {
      styles[`${p}Animation`] = animation
      styles[`${p}AnimationFillMode`] = animationFillMode
    })

    return styles
  }

  render () {
    const classNames = this.props.className ? `loaderWrapepr ${this.props.className}` : `loaderWrapper`
    return (
      <div id={this.props.id} className={classNames}>
        <div style={this.getAnimationStyle(0)}></div>
        <div style={this.getAnimationStyle(1)}></div>
        <div style={this.getAnimationStyle(2)}></div>
        <div style={this.getAnimationStyle(3)}></div>
        <div style={this.getAnimationStyle(4)}></div>

        <style jsx>{`
          .loaderWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

Loader.defaultProps = {
  loading: true,
  color: '#000',
  height: '35px',
  width: '4px',
  margin: '2px',
  radius: '2px'
}
