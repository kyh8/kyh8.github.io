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
        color: '#8aacb8'
      },
      {
        name: 'projects',
        displayName: 'Projects',
        icon: 'folder-open',
        color: '#E6DD93'
      },
      {
        name: 'work',
        displayName: 'Experience',
        icon: 'suitcase',
        color: '#927B51'
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
      easing: "easeInQuart",
      complete: (function() {
        this.setState({
          resume: null,
        });
      }).bind(this)
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
    console.log('deselect', category);
    $('.back-button').fadeOut(300);
    $('.resume-category-header.' + category)
      .removeClass('animate-pin')
      .addClass('animate-unpin');
    setTimeout(() => {
      $('.resume-title, #category-selector').animate({
        opacity: 1,
      }, {
        duration: 400,
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
  render: function() {
    return (
      <div>
        {this.renderList()}
        <div id="resume-backdrop">
          <div className="resume-title">{this.state.resume}</div>
          <div id="resume-contents">
            <div id="category-selector">
              {this.renderCategoryList()}
            </div>
            <div id="detail-view">
              {
                this.state.pinnedCategory !== null ?
                this.renderPinnedHeader(this.state.pinnedCategory) : null
              }
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
