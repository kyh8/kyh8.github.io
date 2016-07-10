var React = require('react');
var ReactDOM = require('react-dom');
var NameTag = React.createFactory(require('./src/NameTag'));
var MajorList = React.createFactory(require('./src/MajorList'));
var CSResume = React.createFactory(require('./src/CSResume'));

ReactDOM.render(<NameTag />, document.getElementById('name-tag-container'));

ReactDOM.render(<MajorList />, document.getElementById('majors'));
