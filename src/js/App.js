const React = require('react');
const NodePositioner = require('./NodePositioner');
const ContactLink = require('./ContactLink');
const Icon = require('./Icon');
const ProfileNode = require('./ProfileNode');
const ContentNode = require('./ContentNode');
const SkillsData = require('../content/SkillsData');
const SkillIcons = require('../content/SkillIcons');
const JobsData = require('../content/JobsData');
const ProjectsData = require('../content/ProjectsData');

const nodeSet = {
  ideas: {
    icon: 'lightbulb',
    color: '#e0cf34',
    label: 'Ideas',
  },
  projects: {
    icon: 'folder',
    color: '#4da6ff',
    label: 'Projects',
  },
  jobs: {
    icon: 'briefcase',
    color: '#66b266',
    label: 'Experience',
  },
  skills: {
    icon: 'glasses',
    color: '#ff4d4d',
    label: 'Skills',
  },
};

const DELAY = 0.1;
const ANIMATION_TIME = 0.2;

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      picturePressed: false,
      nodesExpanded: true,
      selectedNode: null,
      isExpanding: false,
      isReturning: false,
      isMoving: false,
      selectedSkillIndex: -1,
      selectedJobIndex: -1,
      selectedProjectIndex: -1,
    };
  }

  _pressNode(toggle: boolean) {
    if (this.state.selectedNode !== null) {
      return;
    }
    this.setState({
      picturePressed: toggle,
    });
  }

  _returnToHome(event: ?SyntheticMouseEvent<>) {
    event && event.stopPropagation();
    this.setState({
      selectedNode: null,
      isReturning: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          isReturning: false,
        });
      }, 200);
    });
  }

  _selectNode(key: string) {
    if (this.state.selectedNode !== null) {
      return;
    }
    this.setState({
      selectedNode: key,
      isMoving: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          isMoving: false,
        });
      }, 300);
    });
  }

  _expandNodes() {
    if (this.state.selectedNode !== null) {
      return;
    }
    this.setState({
      nodesExpanded: !this.state.nodesExpanded,
      isExpanding: true,
    }, () => {
      const timeout =
        (Object.keys(nodeSet).length - 1) * DELAY + ANIMATION_TIME;
      setTimeout(() => {
        this.setState({
          isExpanding: false,
        });
      }, timeout * 1000);
    });
  }

  _renderProfileNodes() {
    const showcase = Object.keys(nodeSet);
    const nodes = [];
    showcase.forEach((name, index) => {
      const node = nodeSet[name];
      const positions = NodePositioner.getPositions(showcase.length, 240);
      const position = positions[index];
      const bottom = this.state.nodesExpanded && !this.state.selectedNode
        ? position.bottom
        : 0;
      const left = this.state.nodesExpanded && !this.state.selectedNode
        ? position.left
        : 0;
      nodes.push(
        <ProfileNode
          key={'profile-node-' + index}
          bottom={this.state.selectedNode === name ? 0 : bottom}
          left={this.state.selectedNode === name ? 10 : left}
          delay={DELAY * index}
          icon={node.icon}
          color={node.color}
          label={node.label}
          name={name}
          isExpanding={this.state.isExpanding}
          isExpanded={this.state.nodesExpanded}
          selectedNode={this.state.selectedNode}
          onClick={() => this._selectNode(name)}
          handleReturn={this._returnToHome.bind(this)}
        />
      );
    })
    return nodes;
  }

  _renderBioInfo() {
    return (
      <div className='profile-bio'>
        <div className={'profile-bio-item node-header'}>
          Kevin He
        </div>
        <div className={'profile-bio-item profile-bio-school'}>
          Duke University Grad.
        </div>
        <div className='profile-bio-item'>
          <div className='profile-bio-job'>Facebook Software Engineer.</div>
          <div className='profile-bio-cursor'/>
        </div>
        <div className='profile-bio-item'>
          <div className='profile-bio-description'>
            {
              'Detail-oriented UI enthusiast, passionate about building ' +
              'mindful products.'
            }
          </div>
        </div>
        <div className='profile-bio-item profile-bio-links'>
          <ContactLink
            href={'https://github.com/kyh8'}
            icon={'github'}
            isBrandIcon={true}
          />
          <ContactLink
            href={'https://www.linkedin.com/in/kevin-he-47074b105/'}
            icon={'linkedin'}
            isBrandIcon={true}
          />
          <ContactLink
            href={'https://www.facebook.com/kevin.he314'}
            icon={'facebook'}
            isBrandIcon={true}
          />
          <ContactLink
            href={'mailto:kyhe06@gmail.com'}
            icon={'envelope'}
          />
        </div>
      </div>
    );
  }

  _renderBio() {
    return (
      <div
        className={'about-me'}
        onMouseDown={() => this._pressNode(true)}
        onMouseLeave={() => this._pressNode(false)}
        onMouseUp={() => this._pressNode(false)}
        onClick={() => {
          if (this.state.selectedNode) {
            this._returnToHome();
          } else {
            this._expandNodes();
          }
        }}>
        <img
          className='profile-picture-image unselectable'
          src='src/assets/me.png'/>
      </div>
    );
  }

  _toggleSkillDescription(index: number) {
    this.setState({
      selectedSkillIndex: index,
    });
  }

  _toggleJobDescription(index: number) {
    this.setState({
      selectedJobIndex: index,
    });
  }

  _toggleProjectDescription(index: number) {
    this.setState({
      selectedProjectIndex: index,
    });
  }

  _getContentNodePositions(numNodes: number, key: string): Array<Object> {
    const nodePositions = [];
    const positions = NodePositioner.getPositions(numNodes, 240);
    positions.forEach((position) => {
      const bottom =
        this.state.selectedNode === key && !this.state.isMoving
          ? position.bottom
          : 0;
      const left =
        this.state.selectedNode === key && !this.state.isMoving
          ? position.left
          : 0;
      nodePositions.push({
        bottom,
        left,
      });
    });
    return nodePositions;
  }

  _renderContentNodes() {
    if (!this.state.selectedNode) {
      return null;
    }
    switch (this.state.selectedNode) {
      case 'skills':
        return this._renderContentNodesImpl(
          'skills',
          SkillsData,
          false,
          this._toggleSkillDescription.bind(this)
        );
      case 'jobs':
        return this._renderContentNodesImpl(
          'jobs',
          JobsData,
          false,
          this._toggleJobDescription.bind(this)
        );
      case 'projects':
        return this._renderContentNodesImpl(
          'projects',
          ProjectsData,
          true,
          this._toggleProjectDescription.bind(this)
        );
    }

    return null;
  }

  _renderContentNodesImpl(
    key: string,
    content: Array<Object>,
    showLabels: boolean,
    toggleHandler
  ) {
    const nodes = [];
    const positions = this._getContentNodePositions(
      content.length,
      key
    );
    content.forEach((node, index) => {
      const position = positions[index];
      nodes.push(
        <ContentNode
          key={key + '-content-node-' + node.name}
          bottom={position.bottom}
          left={position.left}
          delay={0.05 * index}
          shouldShow={!this.state.isMoving}
          showLabel={showLabels}
          isBrandIcon={node.isBrandIcon}
          isFullBleedImage={node.isFullBleed}
          icon={node.icon}
          image={node.image ? node.image : null}
          label={node.name}
          uri={node.uri}
          tooltip={this._getTooltip(key)}
          nodeName={key}
          onMouseEnter={() => toggleHandler(index)}
          onMouseLeave={() => toggleHandler(-1)}
        />
      );
    });
    return nodes;
  }

  _getTooltip(key: string): ?string {
    return key === 'projects' ? 'Click to check it out!' : null;
  }

  _renderDescription() {
    switch(this.state.selectedNode) {
      case 'skills':
        return this._renderSkillDescription();
      case 'jobs':
        return this._renderJobDescription();
      case 'projects':
        return this._renderProjectDescription();
      case 'ideas':
        return this._renderIdeaSection();
    }
    return null;
  }

  _renderSkillDescription() {
    if (this.state.selectedSkillIndex === -1) {
      return;
    }
    const levelDisplay = {
      expert: {
        label: 'Expert',
        color: '#66b266',
      },
      proficient: {
        label: 'Proficient',
        color: '#ffc04d',
      },
    }
    const skill = SkillsData[this.state.selectedSkillIndex];
    return (
      <div className='skill-info'>
        <div className='skill-title'>
          {skill.name}
        </div>
        <div
          className='skill-level'
          style={{
            backgroundColor: levelDisplay[skill.level].color,
          }}>
          {levelDisplay[skill.level].label}
        </div>
        <div className='skill-description'>
          {skill.description}
        </div>
      </div>
    );
  }

  _renderJobDescription() {
    if (this.state.selectedJobIndex === -1) {
      return;
    }
    const job = JobsData[this.state.selectedJobIndex];
    const jobSkills = [];
    job.skills.forEach((skill) => {
      jobSkills.push(
        <div
          className='job-skill'
          key={'job-' + job.name + '-skill-' + skill}>
          {
            SkillIcons[skill].image
            ? <img className='job-skill-image' src={SkillIcons[skill].image} />
            : <Icon
                name={SkillIcons[skill].icon}
                isBrand={SkillIcons[skill].isBrandIcon}
                size={24}
              />
          }
        </div>
      );
    });
    return (
      <div className='job-info'>
        <div className='job-company'>
          {job.name}
        </div>
        <div className='job-timeframe'>
          {job.timeframe}
        </div>
        <div className='job-skills'>
          {jobSkills}
        </div>
        <div className='job-description'>
          {job.description}
        </div>
      </div>
    )
  }

  _renderProjectDescription() {
    if (this.state.selectedProjectIndex === -1) {
      return;
    }
    const project = ProjectsData[this.state.selectedProjectIndex];
    return (
      <div className='project-info'>
        <div className='project-title'>
          {project.name}
        </div>
        <div className='project-description'>
          {project.description}
        </div>
      </div>
    );
  }

  _renderIdeaSection() {
    return (
      <div className='idea-info'>
        <div className='idea-section-title'>
          (a place for some of my random ideas)
        </div>
        <div className='idea-case'>
          <div className='neon-letters'>
            <span className='red'>{'neon '}</span>
            <span>{'letters'}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const nodeSelected = this.state.selectedNode ? ' node-selected' : '';
    return (
      <div
        className={'content centered-container unselectable' + nodeSelected}>
        <div className={'centered-container'}>
          <div
            className={
              this.state.picturePressed
              ? 'about-me-node-container node-pressed centered-container'
              : 'about-me-node-container centered-container'
            }
            id={'about-me-node'}>
            {this._renderBio()}
          </div>
          {this._renderProfileNodes()}
          {this._renderContentNodes()}
        </div>
        <div className={
          this.state.isReturning
          ? 'about-me-section about-me-moving'
          : 'about-me-section'
        }>
          {this.state.selectedNode ? <div className='mask'/> : null}
          {this._renderBioInfo()}
        </div>
        <div className='content-section'>
          {this._renderDescription()}
        </div>
      </div>
    );
  }
}
module.exports = App;
