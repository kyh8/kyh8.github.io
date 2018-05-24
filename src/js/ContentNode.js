const Icon = require('./Icon');
const React = require('react');

export class ContentNode extends React.Component {
  constructor() {
    super();
  }

  render() {
    let className = 'content-node ' + this.props.nodeName;
    if (this.props.showLabel) {
      className += ' show-content-label';
    }
    let icon = (
      <div className='content-node-icon'>
        {
          this.props.image
          ? <img
              className={
                this.props.isFullBleedImage
                ? 'content-node-icon-image full-bleed'
                : 'content-node-icon-image'
              }
              src={this.props.image} />
          : <Icon
              isBrand={this.props.isBrandIcon}
              name={this.props.icon}
              size={32}
            />
        }
      </div>
    );
    if (this.props.uri) {
      icon =
        <a className='content-node-link' href={this.props.uri} target='_blank'>
          {icon}
        </a>;
    }
    return (
      <div
        className={className}
        onClick={() => this.props.onClick && this.props.onClick()}
        onMouseEnter={() => this.props.onMouseEnter && this.props.onMouseEnter()}
        onMouseLeave={() => this.props.onMouseLeave && this.props.onMouseLeave()}
        style={{
          transform: 'translate(' +
            this.props.left + 'px, ' +
            -1 * this.props.bottom + 'px' +
          ')',
          transitionDelay: this.props.delay + 's',
          opacity: this.props.shouldShow ? 1 : 0,
        }}>
        <div className='content-node-tooltip'>
          {this.props.tooltip}
        </div>
        {icon}
        <div className='content-node-label'>
          {this.props.label}
        </div>
      </div>
    );
  }
}
module.exports = ContentNode;
