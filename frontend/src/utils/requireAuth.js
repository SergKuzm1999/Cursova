import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    state = {
      redirect: false
    };
    UNSAFE_componentWillMount() {
      let { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        window.location='/account/signin';
        this.setState({redirect:true});
      }
    }
    render() {
      return (
       this.state.redirect === false && <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps, {})(Authenticate);
}