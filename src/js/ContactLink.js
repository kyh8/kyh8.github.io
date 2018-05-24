const Icon = require('./Icon');
const React = require('react');

export class ContactLink extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='profile-bio-contact'>
        <a href={this.props.href} target='_blank'>
          <Icon
            isBrand={this.props.isBrandIcon}
            name={this.props.icon}
            size={32}
          />
        </a>
      </div>
    );
  }
}
module.exports = ContactLink;
