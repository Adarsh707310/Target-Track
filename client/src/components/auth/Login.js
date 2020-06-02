import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FacebookLogin from 'react-facebook-login';
import { loginUser, FacebookUserLogin } from "../../actions/authActions";
import classnames from "classnames";
import Login_image from '../image/login.jpg';
 
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
   componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(`/mytodos/${this.props.auth.user.id}`);
    }
  }

componentWillReceiveProps(nextProps) {
  const timer = setTimeout(() => {
    if (nextProps.auth.isAuthenticated) {
      console.log(this.props.auth.user.id);
      this.props.history.push(`/mytodos/${this.props.auth.user.id}`); // push user to dashboard when they login
    }
  }, 1000);
    
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  responseFacebook = response => {
    console.log(response);
    
    const userData = {
      email: response.email,
      password: response.id,
      name: response.name
    };
    this.props.FacebookUserLogin(userData);
   
}
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

render() {
    const { errors } = this.state;
return (
      <section class="bg-solid-light slideContainer strut-slide-0" style={{  
        backgroundImage: `url(${Login_image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        marginBottom: '0px',
      }}>
      <div className="container">
        <div className="row">
          <div className="col s8 left"> {/* offset-s2*/}
            <br/><br/><br/><br/>
            <br/><br/><br/>
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "5.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
                <br/>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
                <div style={{marginTop: "1rem"  , textColor: "white"}}>
                <FacebookLogin
                appId="577959766186394"
                autoLoad={true}
                fields="name,email"
                callback={this.responseFacebook}
                cssClass="waves-effect waves-light btn social facebook"
              />
              </div>
              </div>
              
            </form>
            <div>
            .<br/><br/>
            <br/><br/>
            <br/><br/>
            </div>
          </div>
        </div>
      </div>
      </ section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  FacebookUserLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser , FacebookUserLogin}
)(Login);