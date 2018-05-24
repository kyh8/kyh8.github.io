const React = require('react');

export class Icon extends React.Component {
  constructor() {
    super();
  }

  render() {
    const iconClass = this.props.isBrand ? 'fab fa-' : 'fas fa-';
    return (
      <i
        className={'icon ' + iconClass + this.props.name}
        style={{
          fontSize: this.props.size + 'px',
        }}
      />
    );
  }
}
module.exports = Icon;
