const React = require('react');

export class ProjectSection extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='profile-section'>
        <div className='node-header'>
          Projects
        </div>
      </div>
    );
  }
}
module.exports = ProjectSection;
