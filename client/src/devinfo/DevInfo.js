import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import wall from './wall04.jpg';
import photo from './adarsh03.jpg';

class DevInfo extends Component {
  constructor() {
    super();
    this.state = {
      name: "Adarsh Jain",
      Institute : "IIT Jodhpur",
      Hobbies : ["Singing","Competitive programming","Sketching"],
    } 
  }

  render() { 
      
  return (
      <section class="bg-solid-light slideContainer strut-slide-0" style={{  
        backgroundImage: `url(${wall})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        marginBottom: '0px',
      }}>
        
        
        <div>
          
          <div className="col s6 left">          
            <Link to={`/mytodos/${this.props.auth.user.id}`} className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to My Todo
            </Link>
          </div>
          <br /><br />
          <div className="col s12">
            
            <div className="col s4 center-align">
              <div style={{marginTop:"1.5rem",marginLeft:"2rem"}}>
                <img src={photo} width="25%"  />
              </div>
            </div>
            
            <div className="col 12 center-align right">
              <div className="left">
                <h5><b>Hi, I am Adarsh Jain,<br/> Student of IIT Jodhpur.</b></h5> 
              </div>
            </div>
          
            </div>
              <br /><br /><br /><br />
            </div>

      </section>
  )}
}

DevInfo.propTypes = {
  auth: PropTypes.object.isRequired  //, errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth //, errors: state.errors
});

export default connect(mapStateToProps)(withRouter(DevInfo));