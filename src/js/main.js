var React = require('react');
var ReactDOM = require('react-dom');
var App = React.createFactory(require('./App'));

ReactDOM.render(<App />, document.getElementById('main'));
