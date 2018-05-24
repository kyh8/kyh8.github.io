const React = require('react');

export class InterestSection extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={'profile-section'}>
        <div className='node-header'>
          Interests
        </div>
      </div>
    );
  }
}
module.exports = InterestSection;
