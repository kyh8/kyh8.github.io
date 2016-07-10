/**
* The component that handles interaction with my name tag.
* @flow
* @providesModule NameTag
*/

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ContactItem = require('./ContactItem');

var styles = {
  image: {
    borderRadius: 100,
  },
  aboutMeImage: {
    borderRadius: 80,
  },
  aboutMeImageContainer: {
    padding: 2,
    border:'1px solid gray',
    borderRadius: 80,
    boxShadow: '0 0 3px black',
    width: 80,
    height: 80
  },
  imageContainer: {
    marginTop: 20,
    padding: 2,
    border:'1px solid gray',
    borderRadius: 100,
    boxShadow: '0 0 3px black',
    width: 100,
    height: 100
  },
  contactLine: {
    marginLeft: 10,
  },
  contactItem: {
    marginTop: 10,
  },
  contactInfoContainer: {
    textAlign:'center',
    marginTop: 20,
  },
  personalInfo: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    boxShadow:'0 0 2px black',
    zIndex: 4,
    position: 'relative'
  },
  skillLabel: {
    fontSize: 32,
  },
  skillSubtitle: {
    fontSize: 12,
  },
};

var tabs = [
  {
    id: 'tab-1',
    text: 'About Me',
    color: '#90f0ad',
    selected: 3,
    unselected: 1,
  },
  {
    id: 'tab-2',
    text: 'Skills',
    color: '#ffffa5',
    selected: 3,
    unselected: 2,
  },
  {
    id: 'tab-3',
    text: 'Contact',
    color: '#90d0f2',
    selected: 3,
    unselected: 1,
  }
];

var contactItems = [
  {
    id: 'github-item',
    label: 'Github',
    icon: 'github',
    link: 'https://github.com/kyh8',
    hoverText: 'kyh8',
  },
  {
    id: 'linkedin-item',
    label: 'LinkedIn',
    icon: 'linkedin',
    link:
      'https://www.linkedin.com/in/kevin-he-47074b105?trk=nav_responsive_tab_profile_pic'
  },
  {
    id: 'facebook-item',
    label: 'Facebook',
    icon: 'facebook-official',
    link:
      'https://www.facebook.com/kevin.he314',
    hoverText: 'kevin.he314'
  },
  {
    id: 'email-item',
    label: 'Email',
    icon: 'envelope',
    link:
      'mailto:kyh8@duke.edu',
    hoverText: 'kyh8@duke.edu'
  },
];

var skills = [
  {
    name:'HTML',
    icon:'html',
    description:'A markup language',
    level:'expert',
    experience: true,
  },
  {
    name:'CSS',
    icon:'css',
    description:'A style sheet language',
    level:'expert',
    experience: true,
  },
  {
    name:'Javascript',
    icon:'javascript',
    description:'A programming language',
    level:'expert',
    experience: true,
  },
  {
    name:'JQuery',
    icon:'jquery',
    description:'A Javascript framework',
    level:'expert',
    experience: true,
  },
  {
    name:'React',
    icon:'react',
    description:'A Javascript framework',
    level:'expert',
    experience: true,
  },
  {
    name:'React Native',
    icon:'react-native',
    description:'A Javascript framework',
    level:'proficient'
  },
  {
    name:'Ractive JS',
    icon:'ractive',
    description:'A Javascript framework',
    level:'expert',
    experience: true,
  },
  {
    name:'d3',
    icon:'d3',
    description:'A Javascript framework',
    level:'expert',
    experience: true,
  },
  {
    name:'Java',
    icon:'java',
    description:'A programming language',
    level:'expert'
  },
  {
    name:'Python',
    icon:'python',
    description:'A programming language',
    level:'proficient'
  },
  {
    name:'Flow',
    icon:'flow',
    description:'A static Javascript type checker',
    level:'expert',
    experience: true,
  },
  {
    name:'C',
    icon:'c',
    description:'A programming language',
    level:'proficient'
  },
  {
    name:'Hack',
    icon:'hack',
    description:'A programming language',
    level:'proficient',
    experience: true,
  },
  {
    name:'PHP/XHP',
    icon:'php',
    description:'A server-side scripting language',
    level:'proficient',
    experience: true,
  },
  {
    name:'Git',
    icon:'git',
    description:'A source control system',
    level:'expert'
  },
  {
    name:'Mercurial',
    icon:'mercurial',
    description:'A source control system',
    level:'expert',
    experience: true,
  },
];

var intro = "Hi, I'm Kevin.";
var blurb = "I like to design user interfaces and build impactful software. " +
"I'm passionate about creating things with code that will improve people's lives. " +
"When I'm not programming, I like to browse reddit, " +
"play League of Legends, and watch movies."

var NameTag = React.createClass({
  getInitialState: function() {
    return {
      hover: false,
      open: false,
      selectedTab: 0,
      hoveredTab: -1,
      carousel: [null, 0, 1],
      placeholder: null,
      transitioning: false,
    };
  },
  showCard: function() {
    // var overlay = document.getElementById('overlay');
    var container = document.getElementById('flip-container');
    var nameTag = document.getElementById('name-tag-container');
    if (!this.state.open) {
      // overlay.classList.add('show-overlay');
      container.classList.add('opened');
      nameTag.classList.remove('unselectable');
      this.setState({
        open: true,
      });
    }
  },
  hideCard: function() {
    // var overlay = document.getElementById('overlay');
    var container = document.getElementById('flip-container');
    var nameTag = document.getElementById('name-tag-container');
    if (this.state.open) {
      // overlay.classList.remove('show-overlay');
      container.classList.remove('opened');
      nameTag.classList.add('unselectable');
      this.setState({
        open: false,
        hover: false,
      });
    }
  },
  componentDidMount: function() {
    $('#placeholder-skill').hide();
    var overlay = document.getElementById('overlay');
    overlay.addEventListener('click', () => {
      this.hideCard();
    });
  },
  tabEnter: function(id) {
    this.setState({
      hoveredTab: id,
    });
  },
  tabLeave: function(id) {
    this.setState({
      hoveredTab: -1,
    });
  },
  tabSelect: function(id) {
    this.setState({
      selectedTab: id,
    });
  },
  scrollLeft: function() {
    if (this.state.transitioning) {
      console.log('transitioning! slow down');
      return;
    }
    this.setState({
      transitioning: true,
    });
    var carousel = this.state.carousel;
    if (carousel[0] !== null) {
      if (carousel[0] > 0) {
        carousel = [carousel[0]-1, carousel[0], carousel[0]+1];
        this.setState({
          placeholder: skills[carousel[0]].icon
        }, function() {
          $('#placeholder-skill').css({
            'left': '65px',
            'z-index': '4',
            'opacity': '0'
          });
          $('#placeholder-skill').delay(100).animate({
            'opacity': '0.3'
          }, 150);
        });
      } else if (carousel[0] == 0) {
        carousel = [null, carousel[0], carousel[0]+1];
      }
      $('.skill-logo').addClass('left-scrolling');
      $('.skill-label-container').fadeOut(100);
    }

    setTimeout((function() {
      $('.skill-logo').removeClass('left-scrolling');
      $('.skill-label-container').fadeIn(0);
      this.setState({
        carousel: carousel,
        placeholder: null,
        transitioning: false,
      });
    }).bind(this), 250);
  },
  scrollRight: function() {
    if (this.state.transitioning) {
      console.log('transitioning! slow down');
      return;
    }
    this.setState({
      transitioning: true,
    });
    var carousel = this.state.carousel;
    if (carousel[2] !== null) {
      if (carousel[2] !== null && carousel[2] < skills.length-1) {
        carousel = [carousel[2]-1, carousel[2], carousel[2]+1];
        this.setState({
          placeholder: skills[carousel[2]].icon
        }, function() {
          $('#placeholder-skill').css({
            'left': '205px',
            'z-index': '4',
            'opacity': '0'
          });
          $('#placeholder-skill').delay(100).animate({
            'opacity': '0.3'
          }, 150);
        });
      } else if (carousel[2] !== null && carousel[2] == skills.length-1) {
        carousel = [carousel[2]-1, carousel[2], null];
      }
      $('.skill-logo').addClass('right-scrolling');
      $('.skill-label-container').fadeOut(100);
    }

    setTimeout((function() {
      $('.skill-logo').removeClass('right-scrolling');
      $('.skill-label-container').fadeIn(0);
      this.setState({
        carousel: carousel,
        placeholder: null,
        transitioning: false,
      });
    }).bind(this), 250);
  },
  renderTabs: function() {
    var tabElements = [];
    tabs.forEach(tab => {
      var element = (
        <div
          key={tab.id}
          className="contact-tab unselectable"
          style={{
            backgroundColor: tab.color,
            zIndex: this.state.selectedTab == tabs.indexOf(tab) && this.state.hoveredTab == -1
                    || this.state.hoveredTab == tabs.indexOf(tab)
              ? tab.selected
              : tab.unselected,
            top: this.state.selectedTab == tabs.indexOf(tab) && this.state.hoveredTab == -1
                    || this.state.hoveredTab == tabs.indexOf(tab)
              ? -42
              : -30,
            left: (43+90*tabs.indexOf(tab))
          }}
          onMouseEnter={this.tabEnter.bind(this, tabs.indexOf(tab))}
          onMouseLeave={this.tabLeave.bind(this, tabs.indexOf(tab))}
          onClick={this.tabSelect.bind(this, tabs.indexOf(tab))}>
          {tab.text}
        </div>
      );
      tabElements.push(element);
    });
    return tabElements;
  },
  renderContactItems: function() {
    var infoElements = [];
    contactItems.forEach(item => {
      var element = (
        <ContactItem key={item.id} info={item} />
      );
      infoElements.push(element);
    });
    return infoElements;
  },
  render: function() {
    return (
      <div id="flip-container" className="flip-container">
        <div className="flipper">
          <div className="name-tag" id="name-tag">
            <div id="hello-section">
              <span style={{fontSize: 42}}>H E L L O</span>
              <br />
              <span style={{fontSize: 24}}>my name is</span>
            </div>
            <div id="name-section-container">
              <div id="name-section">
                <div className="name-card">
                  <span>Kevin He</span>
                </div>
              </div>
            </div>
            <div className="help-text" onClick={this.showCard}>
              (click to flip)
            </div>
          </div>
          <div className={this.state.open ? "contact-info opened" : "contact-info"}>
            <div style={styles.personalInfo}>
              {(() => {
                switch (this.state.selectedTab) {
                  case 0:
                    return (
                      <div className="personal-info-pane">
                        <div className="name-card opened">
                          <span>About me</span>
                        </div>
                        <div style={styles.aboutMeImageContainer}>
                          <img className="unselectable" src={"src/assets/about-me.png"} width={80} height={80} style={styles.aboutMeImage}/>
                        </div>
                        <div className="blurb">
                          <div style={{width: 300, textAlign: 'center', fontSize: 16, marginBottom: 5}}>
                            {intro}
                          </div>
                          <div>
                            {blurb}
                          </div>
                        </div>
                      </div>
                    );
                  case 1:
                    return (
                      <div className="personal-info-pane">
                        <div className="name-card opened">
                          <span>Skills</span>
                        </div>
                        <div>
                          {
                            this.state.carousel[0] !== null ?
                            (<div>
                              <img
                                src={"src/assets/left-arrow.png"}
                                width={20}
                                height={30}
                                onClick={this.scrollLeft}
                                className="navigator-arrow left"/>
                            </div>)
                            : null
                          }
                          {
                            this.state.carousel[2] !== null ?
                            (<div>
                              <img
                                src={"src/assets/right-arrow.png"}
                                width={20}
                                height={30}
                                onClick={this.scrollRight}
                                className="navigator-arrow right"/>
                            </div>)
                            : null
                          }
                          {
                            this.state.placeholder !== null ?
                            (<div className="skill-logo-container">
                              <img
                                src={"src/assets/"+ this.state.placeholder +"-logo.png"}
                                width={100}
                                height={100}
                                id="placeholder-skill"
                                className="skill-logo"/>
                              </div>)
                            : null
                          }
                          {
                            this.state.carousel[0] !== null
                            ? (<div
                                className="skill-logo-container"
                                onClick={this.scrollLeft}>
                                <img
                                  src={"src/assets/"+ skills[this.state.carousel[0]].icon +"-logo.png"}
                                  width={100}
                                  height={100}
                                  id="previous-skill"
                                  className="skill-logo previous-skill"/>
                              </div>)
                            : null
                          }
                          <div className="skill-logo-container">
                            <img
                              src={"src/assets/"+ skills[this.state.carousel[1]].icon +"-logo.png"}
                              width={100}
                              height={100}
                              id="selected-skill"
                              className="skill-logo selected"/>
                          </div>
                          {
                            this.state.carousel[2] !== null
                            ? (<div
                                className="skill-logo-container"
                                onClick={this.scrollRight}>
                                <img
                                  src={"src/assets/"+ skills[this.state.carousel[2]].icon +"-logo.png"}
                                  width={100}
                                  height={100}
                                  id="next-skill"
                                  className="skill-logo next-skill"/>
                              </div>)
                            : null
                          }
                          <div className="skill-label-container">
                            <div style={styles.skillLabel}>
                              {skills[this.state.carousel[1]].name}
                            </div>
                            <div style={styles.skillSubtitle}>
                              {skills[this.state.carousel[1]].description}
                            </div>
                            <div className={"skill-level-pill unselectable " + skills[this.state.carousel[1]].level}>
                              {skills[this.state.carousel[1]].level}
                            </div>
                            {
                              skills[this.state.carousel[1]].experience ?
                              (<div className="skill-level-pill work-experience unselectable">
                                work experience
                              </div>)
                              : null
                            }
                          </div>
                        </div>
                      </div>
                    );
                  case 2:
                    return (
                      <div className="personal-info-pane">
                        <div className="name-card opened">
                          <span>Kevin He</span>
                        </div>
                        <div style={styles.imageContainer}>
                          <img className="unselectable" src={"src/assets/profpic.jpg"} width={100} height={100} style={styles.image}/>
                        </div>
                        <div style={styles.contactInfoContainer}>
                          {this.renderContactItems()}
                        </div>
                      </div>
                    );}
              })()}
              <div className="help-text opened" onClick={this.hideCard}>
                (click to flip)
              </div>
            </div>
            {this.renderTabs()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NameTag;
