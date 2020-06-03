import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../App2.css';
import landing from '../image/landing.jpg';

class Landing extends Component {
  render() {
    return (
        <section class="bg-solid-light slideContainer strut-slide-0" style={{  
          backgroundImage: `url(${landing})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          marginBottom: '0px',
        }}>

        <div  className="container valign-wrapper">
          <div className="row">
            
              <div className="col s12 center-align">
                <Link style={{ fontFamily: "monospace" }}
                  className="brand-logo center black-text" > 
                  <h4> <i className="material-icons">schedule</i> Target Track</h4>
                </Link>
              </div>
              
              <br/> <br/>
              <br/> <br/>
              
              <div className="col s8 right">  
                <h4 class="paragraph02">
                  <b>"Target Track"</b> lets you work more efficiently and get more done. 
                </h4>
              </div>

              <br/> <br/>
              <br/> <br/>
              
              <div  className="col s8 right">
                <h3 class="paragraph02">
                  Target track's labels, lists, and status-cards enable you to organize your projects in a fun, flexible, and rewarding way.
                </h3>
              </div>

              

              <div className="col s12">
              <br /> <br /> <br />
              
                <div className="col s6 ">
                  <Link
                    to="/register"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                  >
                    Register
                  </Link>
                </div>

                <div className="col s4 center-align">
                <Link
                    to="/login"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect white black-text center-align"
                  >
                    Log In
                  </Link>
                </div>
              </div>
           
            <br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
        </section>
    );
  }
}
export default Landing;