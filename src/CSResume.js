var React = require('react');
var ReactDOM = require('react-dom');

var CSResume = React.createClass({
  render: function() {
    return (
      <div>
        <div style={{position: 'relative', display: 'flex', justifyContent: 'center', width: 600, top: 458}}>
          <div className="help-text resume">
            (click to hide)
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CSResume;
