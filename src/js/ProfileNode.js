const Icon = require('./Icon');
const React = require('react');

export class ProfileNode extends React.Component {
  constructor() {
    super();
  }

  render() {
    const isSelected = this.props.selectedNode === this.props.name;
    let className = 'unselectable node';
    if (isSelected) {
      className += ' selected-node';
    } else if (this.props.selectedNode && !isSelected) {
      className += ' hidden-node';
    }
    return (
      <div
        className={className}
        onClick={() => this.props.onClick && this.props.onClick()}
        style={{
          transform:
            'translate(' +
              this.props.left + 'px, ' +
              -1 * this.props.bottom + 'px' +
            ')',
          // only have a delay if we're moving nodes around
          transitionDelay: this.props.isExpanding ? this.props.delay + 's' : '0s',
          backgroundColor: this.props.color,
        }}>
        <Icon name={this.props.icon} size={isSelected ? 64 : 32} />
        <div
          className='return-home'
          onClick={this.props.handleReturn}>
          <Icon name={'angle-left'} size={24} />
        </div>
        <div className={'node-label'}>
          {this.props.isExpanded || isSelected ? this.props.label : null}
        </div>
      </div>
    );
  }
}
module.exports = ProfileNode;
