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
      <div style={styles.contactItem}>
        <div className="contact-icon">
          <i className={"fa fa-"+this.props.info.icon} aria-hidden="true"></i>
        </div>
        <span style={styles.contactLine}>
          <div className="contact-info-label unselectable">
            {this.props.info.label}:
          </div>
          <div style={styles.contactInfo}>
            {(() => {
              if (this.props.info.link !== undefined) {
                return (
                  <div style={{borderLeft: '4px solid #8AACB8', paddingLeft: '5px'}}>
                    <a href={this.props.info.link} style={styles.linkText}>{this.props.info.text}</a>
                  </div>
                );
              } else {
                return (<span>{this.props.info.text}</span>);
              }
            })()}
          </div>
        </span>
      </div>
    );
  }
});

module.exports = ContactItem;
