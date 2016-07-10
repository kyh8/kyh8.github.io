/**
* The component that handles interaction with the list of my majors
* @flow
* @providesModule MajorList
*/
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('jquery.easing');

var majors = [
  {
    id: 'cs-major',
    name: 'Computer Science',
    icon: 'desktop'
  },
  {
    id: 'econ-major',
    name: 'Economics',
    icon: 'line-chart'
  },
];

var resumeCategories = {
  'Computer Science': {
    categories:[
      {
        name: 'coursework',
        displayName: 'Coursework',
        icon: 'graduation-cap',
        color: '#8aacb8',
        details: [
          {
            header: 'Project-Based',
            icon: 'code-fork',
            items: [
              'Software Design & Implementation',
              'Operating Systems',
              'Artificial Intelligence',
              'Computer Architecture'
            ]
          },
          {
            header: 'Theory',
            icon: 'lightbulb-o',
            items: [
              'Design & Analysis of Algorithms',
              'Discrete Math for Computer Science',
              'Algorithms & Data Structures'
            ]
          }
        ],
      },
      {
        name: 'projects',
        displayName: 'Projects',
        icon: 'folder-open',
        color: '#E6DD93',
        details: [
          {
            title: 'TabDuke',
            navIcon: 'dashboard',
            shortDescription: 'An informational new-tab dashboard for Duke students.',
            technologies: [
              {
                name: 'Javascript',
                icon: 'javascript'
              },
              {
                name: 'JQuery',
                icon: 'jquery'
              },
              {
                name: 'HTML',
                icon: 'html'
              },
              {
                name: 'CSS',
                icon: 'css'
              },
              {
                name: 'RactiveJS',
                icon: 'ractive'
              },
            ],
            longDescription:
              'Designed to deliver easy, at-a-glance information with beautiful ' +
              'image backgrounds, TabDuke has quickly accumulated a sizeable user base ' +
              'at Duke of about 1,200 weekly users. Features include a dynamically ' +
              'updated bus monitor powered by TransLoc, a restaurant status indicator, ' +
              'and a menu of customizable favorite links.',
            links: [
              {
                icon: 'chromewebstore',
                link: 'https://chrome.google.com/webstore/detail/tabduke/pobomngaadhipehokfdbllgemdpgdeop?hl=en-US'
              },
              {
                icon: 'github',
                link: 'https://github.com/kyh8/tabduke'
              },
            ],
            linksDescription: 'Try it out or view the source code!'
          },
          {
            title: 'HackerSync',
            navIcon: 'hacker-news',
            shortDescription: 'A cross-platform Hacker News reader client.',
            technologies: [
              {
                name: 'Javascript',
                icon: 'javascript'
              },
              {
                name: 'React Native',
                icon: 'react-native',
              },
              {
                name: 'Firebase',
                icon: 'firebase'
              }
            ],
            longDescription:
              'This is a project that I\'m working on with Alex Dao to fill the need ' +
              'for a prettier, more user-friendly Hacker News app than the other ones in the app store. ' +
              'Built on React Native, HackerSync is currently more of a leisurely experiment and exploration ' +
              'into the React Native framework than an actual project. Stay tuned to see where it goes from here!',
            links: [
              {
                icon: 'github',
                link: 'https://github.com/hackersync/HackerSync'
              },
            ],
            linksDescription: 'View the source code!'
          },
          {
            title: 'Indivisible',
            navIcon: 'gamepad',
            shortDescription: 'A casual side-scroller game with numbers.',
            technologies: [
              {
                name: 'Javascript',
                icon: 'javascript'
              },
              {
                name: 'HTML',
                icon: 'html',
              },
              {
                name: 'CSS',
                icon: 'css'
              }
            ],
            longDescription:
              'Indivisible is a game I built on a whim. It could currently use more work ' +
              'with difficulty tuning, but I think its premise is an interesting concept. ' +
              'Play it and feel free to give me feedback on where it should go from here!',
            links: [
              {
                fa: true,
                icon: 'play-circle',
                link: 'http://kevinyhe.com/indivisible/'
              },
              {
                icon: 'github',
                link: 'https://github.com/kyh8/indivisible'
              },
            ],
            linksDescription: 'Try it out or view the source code!'
          }
        ],
      },
      {
        name: 'work',
        displayName: 'Experience',
        icon: 'suitcase',
        color: '#927B51',
        details: [
          {
            title: 'Facebook',
            companyName: 'Facebook',
            jobTitle: 'Software Engineering Intern',
            navIconText: 'FB'
          },
          {
            title: 'Arris',
            companyName: 'Arris Group, Inc.',
            jobTitle: 'Software Engineering Intern',
            navIconText: 'A'
          },
        ]
      }
    ]
  },
  'Economics': {

  }
}

var MajorList = React.createClass({
  getInitialState: function() {
    return {
      resumeShown: false,
      animating: false,
      pinned: false,
      pinnedCategory: null,
      resume: null,
      navHelp: null,
      techLabel: null,
    };
  },
  componentDidMount: function() {
    $(window).resize((function() {
      if (this.state.resumeShown) {
        var position = this.getResumePosition();
        var background = document.getElementById('resume-backdrop');
        background.style.left = position.left + 'px';
        background.style.top = position.top + 'px';
      }
    }).bind(this));
  },
  getResumePosition: function() {
    var nameTag = document.getElementById('name-tag');
    var nameTagRect = nameTag.getBoundingClientRect();
    var position = {
      left: nameTagRect.left-115,
      top: nameTagRect.top-20,
    };
    return position;
  },
  showResume: function(id) {
    $('#overlay').fadeIn(300);
    var newState = {};
    if (id != this.state.resume && this.state.pinnedCategory) {
      var pinnedElement = document.getElementById('resume-category-wrapper-' + this.state.pinnedCategory.name);
      if (pinnedElement != null){
        pinnedElement.style.opacity = 1;
      }
      var categorySelector = document.getElementById('category-selector');
      categorySelector.style.opacity = 1;
      var details = document.getElementById('detail-view');
      details.style.zIndex = -1;
      $('.resume-title').css('opacity', '1');
      this.setState({
        pinned: false,
        pinnedCategory: null,
      });
    }
    this.setState({
      resumeShown: true,
      resume: id
    });
    var position = this.getResumePosition();
    var resume = document.getElementById('resume-backdrop');
    resume.style.left = position.left + 'px';
    $('#resume-backdrop').delay(300).animate({
      top: position.top + 'px',
    },
    {
      duration: 800,
      easing: "easeOutQuart",
    });
  },
  hideResume: function(id) {
    this.setState({
      resumeShown: false,
    });
    $('#resume-backdrop').animate({
      top: '-520px',
    },
    {
      duration: 500,
      easing: "easeInQuart"
    });
    $('#overlay').delay(500).fadeOut(300);
  },
  mouseEnter: function(category) {
    if (this.state.animating || this.state.pinned) {
      return;
    }
    $('.resume-category-wrapper.'+category).addClass('show-hover-preview');
    $('.resume-category-wrapper.'+category).removeClass('animate-left');
  },
  mouseLeave: function(category) {
    if (this.state.animating || this.state.pinned) {
      return;
    }
    $('.resume-category-wrapper.'+category).removeClass('show-hover-preview');
    $('.resume-category-wrapper.'+category).addClass('animate-left');
  },
  categorySelect: function(selectedCategory) {
    if (this.state.pinned) {
      return;
    }
    var categories = resumeCategories[this.state.resume].categories.map(category => {
      return category.name;
    });
    if (selectedCategory === 'projects' || selectedCategory === 'work') {
      this.setState({
        sectionSelected: resumeCategories[this.state.resume].categories[categories.indexOf(selectedCategory)].details[0],
      });
    }

    this.setState({
      animating: true,
    });
    $('.resume-category-wrapper.' + selectedCategory)
      .removeClass('show-hover-preview')
      .removeClass('animate-left');

    var details = document.getElementById('detail-view');
    var element = document.getElementById('resume-category-wrapper-' + selectedCategory);
    resumeCategories[this.state.resume].categories.forEach(category => {
      if (category.name === selectedCategory) {
        this.setState({
          pinnedCategory: category,
        }, function() {
          setTimeout(function() {
            $('.resume-category-header.' + selectedCategory)
              .addClass('animate-right');
          }, 1);
        });
      }
    });
    element.style.opacity = 0;

    var animationTime = 400;
    setTimeout((function() {
      details.style.zIndex = 1;
      $('.resume-title, #category-selector').animate({
        opacity: 0,
      }, {
        duration: 200,
        queue: false,
        complete: (function() {
          $('.resume-category-header.' + selectedCategory)
            .removeClass('animate-right')
            .addClass('animate-pin');
          setTimeout((function() {
            this.setState({
              animating: false,
              pinned: true,
            }, function() {
              var detailsContainer = document.getElementById('details-container');
              detailsContainer.style.opacity = 1;
            });
            $('.back-button').fadeIn(300);
          }).bind(this), animationTime);
        }).bind(this),
      });
    }).bind(this), animationTime);
  },
  categoryDeselect: function(category) {
    if (!this.state.pinned) {
      return;
    }
    var element = document.getElementById('resume-category-wrapper-' + category);
    element.style.opacity = 0;
    var detailsContainer = document.getElementById('details-container');
    detailsContainer.style.opacity = 0;
    $('.back-button').fadeOut(300);
    $('.resume-category-header.' + category)
      .removeClass('animate-pin')
      .addClass('animate-unpin');
    setTimeout(() => {
      $('.resume-title, #category-selector').animate({
        opacity: 1,
      }, {
        duration: 200,
        queue: false,
        complete: (function() {
          var details = document.getElementById('detail-view');
          details.style.zIndex = -1;
          $('.resume-category-header.' + category)
            .removeClass('animate-unpin')
            .addClass('animate-left');
          setTimeout((() => {
            this.setState({
              pinned: false,
              pinnedCategory: null,
            }, function() {
              $('.resume-category-header.' + category)
                .removeClass('animate-left');
              element.style.opacity = 1;
            });
          }).bind(this), 400);
        }).bind(this)
      });
    }, 300);
  },
  renderList: function() {
    var majorList = [];
    majors.forEach(major => {
      var element = (
        <div
          key={major.id}
          className="major"
          onClick={this.showResume.bind(this, major.name)}>
          <i className={"fa fa-" + major.icon} aria-hidden="true"></i>
          <span className="major-label">{major.name}</span>
        </div>
      );
      majorList.push(element);
    });
    return majorList;
  },
  renderPinnedHeader: function(category) {
    return (
      <div
        id={"resume-category-header-" + category.name}
        className={
          "resume-category-header " + category.name
        }
        onClick={this.categorySelect.bind(this, category.name)}>
        <div className="back-button">
          <img
            id={'back-button-' + category.name}
            src="src/assets/back-button.png"
            width={40}
            height={40}
            onClick={this.categoryDeselect.bind(this, category.name)}/>
        </div>
        <div className="resume-category">
          <div className="category-label">{category.displayName}</div>
        </div>
        <div style={{backgroundColor: category.color}} className={"resume-icon"}>
          <i className={"fa fa-" + category.icon} aria-hidden="true"></i>
        </div>
      </div>
    );
  },
  renderCategoryElement: function(category) {
    return (
      <div key={category.name + '-category'} className="resume-category-container">
        <div
          id={"resume-category-wrapper-" + category.name}
          className={"resume-category-wrapper " + category.name}
          onMouseEnter={this.mouseEnter.bind(this, category.name)}
          onMouseLeave={this.mouseLeave.bind(this, category.name)}
          onClick={this.categorySelect.bind(this, category.name)}>
          <div className="resume-category">
            <div className="category-label">{category.displayName}</div>
          </div>
          <div style={{backgroundColor: category.color}} className={"resume-icon"}>
            <i className={"fa fa-" + category.icon} aria-hidden="true"></i>
          </div>
        </div>
        <div className={"resume-envelope " + category.name}></div>
      </div>
    );
  },
  renderCategoryList: function() {
    if (this.state.resume === null) {
      return null;
    }
    var categoryElements = [];
    var categories = resumeCategories[this.state.resume].categories;
    if (!categories) {
      return null;
    }
    categories.forEach(category => {
      var element = this.renderCategoryElement(category);
      categoryElements.push(element);
    });
    return categoryElements;
  },
  renderCoursework: function() {
    var details = this.state.pinnedCategory.details;
    var elements = [];
    details.forEach(detail => {
      var element = (
        <div key={detail.header}>
          <div className='detail-header'>
            <div>
              <i className={"fa fa-" + detail.icon} aria-hidden="true"></i>
              <span>  {detail.header}</span>
            </div>
            <hr className="h-divider" />
          </div>
          <div className='detail-item-container'>
            {detail.items.map(function(item) {
              return (
                <div key={item} className='detail-item'>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      );
      elements.push(element);
    });
    return elements;
  },
  scrollNav: function(section) {
    this.setState({
      sectionSelected: section,
    });
  },
  showTechLabel: function(label) {
    this.setState({
      techLabel: label,
    });
  },
  hideTechLabel: function() {
    this.setState({
      techLabel: null,
    });
  },
  renderProjectSection: function(section) {
    var details = this.state.pinnedCategory.details;
    var section = this.state.sectionSelected;
    return (
      <div className='project-section'>
        <div className='project-title'>{section.title}</div>
        <div className='project-subtitle'>
          {section.shortDescription}
        </div>
        <div className='project-technologies'>
          <div className='project-technology-title'>
            Built on:
          </div>
          <div className='project-technology-container'>
            {
              section.technologies.map((function(tech) {
                return (
                  <div key={tech.name + '-tech'} className='project-technology'>
                    <img
                      className='project-technology-icon'
                      src={'src/assets/' + tech.icon + '-logo.png'}
                      onMouseEnter={this.showTechLabel.bind(null, tech.name)}
                      onMouseLeave={this.hideTechLabel}/>
                    {
                      this.state.techLabel === tech.name ?
                      <div className='project-technology-label'>
                        {tech.name}
                      </div>
                      : null
                    }
                  </div>
                );
              }).bind(this))
            }
          </div>
        </div>
        <div className='project-description'>{section.longDescription}</div>
        <div className='project-links'>
          {
            section.links.map(function(link) {
              return (
                <div key={link.icon + '-link'} className='project-link'>
                  <a href={link.link}>
                    {
                      link.fa === true
                      ? <div style={{position: 'relative', bottom: 3}}><i className={"project-link-icon fa fa-" + link.icon} aria-hidden="true"></i></div>
                      : <img className='project-link-icon' src={'src/assets/' + link.icon + '.png'} />
                    }
                  </a>
                </div>
              );
            })
          }
          <div className='project-link-label'>
            {section.linksDescription}
          </div>
        </div>
      </div>
    );
  },
  renderExperienceSection: function() {
    var details = this.state.pinnedCategory.details;
    var section = this.state.sectionSelected;
    return (
      <div className='experience-section'>
        <div className='company-name'>
          {section.companyName}
        </div>
        <div className='job-title'>
          {section.jobTitle}
        </div>
      </div>
    );
  },
  showNavHelp: function(section) {
    this.setState({
      navHelp: section
    });
  },
  hideNavHelp: function(section) {
    this.setState({
      navHelp: null
    });
  },
  renderNav: function() {
    var details = this.state.pinnedCategory.details;
    var elements = [];
    details.forEach(detail => {
      var element = (
        <div
          key={detail.title + '-nav-button'}
          className={
            this.state.sectionSelected === detail
            ? 'nav-button selected'
            : 'nav-button'}
          onClick={this.scrollNav.bind(this, detail)}
          onMouseEnter={this.showNavHelp.bind(this, detail)}
          onMouseLeave={this.hideNavHelp.bind(this, detail)}>
          <div className="nav-button-icon">
            {
              detail.navIconText !== undefined
              ? detail.navIconText
              : <i className={"fa fa-" + detail.navIcon} aria-hidden="true"></i>
            }
          </div>
          {
            this.state.navHelp === detail
            ? (<div className='nav-button-help'>
                {detail.title}
              </div>)
            : null
          }
        </div>
      );
      elements.push(element);
    });
    return elements;
  },
  renderDetails: function() {
    switch (this.state.pinnedCategory.name) {
      case 'coursework':
        return (
          <div className='coursework-list'>
            {this.renderCoursework()}
          </div>
        );
      case 'projects':
        return (
          <div>
            <div className='projects-list'>
              {this.renderProjectSection()}
            </div>
            <div className="nav-buttons">
              {this.renderNav()}
            </div>
          </div>
        );
      case 'work':
        return (
          <div>
            <div className='experience-list'>
              {this.renderExperienceSection()}
            </div>
            <div className="nav-buttons">
              {this.renderNav()}
            </div>
          </div>
        );
    }
  },
  render: function() {
    return (
      <div>
        {this.renderList()}
        <div id="resume-backdrop">
          <div className="resume-title">{this.state.resume}</div>
          <div id="resume-contents">
            <div id="category-selector">
              {
                resumeCategories[this.state.resume] && resumeCategories[this.state.resume].categories !== undefined
                ? this.renderCategoryList()
                : (<div className='coming-soon'>Coming Soon!</div>)

              }
            </div>
            <div id="detail-view">
              {
                this.state.pinnedCategory !== null
                ? this.renderPinnedHeader(this.state.pinnedCategory) : null
              }
              <div id="details-container">
              {
                this.state.pinned == true
                ? this.renderDetails()
                : null
              }
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', zIndex: 2, width: 600, top: 500}}>
            <div onClick={this.hideResume} className="help-text resume">
              (click to hide)
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MajorList;
