import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MiniDrawer from "./Fun";
//import '../../App.css';

class Mytodos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mytodos: [],
      current: this.props.auth.user.id,
  };
  }
    
  render() {
      return (<MiniDrawer userInfo={this.props.auth.user} current={this.state.current} >success</MiniDrawer>
    )
  }
}


Mytodos.propTypes = {
  auth: PropTypes.object.isRequired, 
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth, 
  errors: state.errors 
});

export default connect(
  mapStateToProps  
)(withRouter(Mytodos));

