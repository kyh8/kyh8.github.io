var React = require('react');
var ReactDOM = require('react-dom');

var styles = {
  contactLine: {
    marginLeft: 10,
  },
  contactItem: {
    marginTop: 10,
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
  render: function() {
    return (
      <div className="contact-item">
        <div className="contact-icon">
          <a href={this.props.info.link} style={{textDecoration: 'none', color: 'black'}}>
            <i className={"fa fa-"+this.props.info.icon} aria-hidden="true"></i>
          </a>
        </div>
      </div>
    );
  }
});

module.exports = ContactItem;
