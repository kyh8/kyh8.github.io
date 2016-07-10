var React = require('react');
var ReactDOM = require('react-dom');

var styles = {
  contactLine: {
    marginLeft: 10,
  },
  contactInfo: {
    display: 'inline-block',
  },
  linkText: {
    color: '#8AACB8',
    textDecoration: 'none',
  }
}

var ContactItem = React.createClass({
  getInitialState: function() {
    return {
      hoverText: null,
    }
  },
  contactItemEnter: function(text) {
    if (text === undefined) {
      return;
    }
    this.setState({
      hoverText: text,
    });
  },
  contactItemLeave: function(text) {
    if (text === undefined) {
      return;
    }
    this.setState({
      hoverText: null,
    });
  },
  render: function() {
    return (
      <div
        className="contact-item"
        onMouseEnter={this.contactItemEnter.bind(this, this.props.info.hoverText)}
        onMouseLeave={this.contactItemLeave.bind(this, this.props.info.hoverText)}>
        <div className="contact-icon">
          <a href={this.props.info.link} style={{textDecoration: 'none', color: 'black'}}>
            <i className={"fa fa-"+this.props.info.icon} aria-hidden="true"></i>
          </a>
          {
            this.state.hoverText !== null ?
            (<div className="hover-text">
              {this.state.hoverText}
            </div>) : null
          }
        </div>
      </div>

    );
  }
});

module.exports = ContactItem;
