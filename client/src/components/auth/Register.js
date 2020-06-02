import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FacebookLogin from 'react-facebook-login';
import { FacebookUserLogin } from "../../actions/authActions";
import { registerUser } from "../../actions/authActions";
import register_image from '../image/register.jpg';
import classnames from "classnames";
class Register extends Component {
  
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(`/mytodos/${this.props.auth.user.id}`);
    }
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    const timer = setTimeout(() => {
      if (nextProps.auth.isAuthenticated) {
        console.log(this.props.auth.user.id);
        this.props.history.push(`/mytodos/${this.props.auth.user.id}`); // push user to dashboard when they login
      }
    }, 1000);
  }
  responseFacebook = (response) => {
    console.log(response);
    const newUser = {
      email: response.email,
      password: response.id,
      name: response.name
    };
    this.props.FacebookUserLogin(newUser);
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history); 
  };

render() {
    const { errors } = this.state;
return (
      <section  style={{  
        backgroundImage: `url(${register_image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        width:'100%',
        height:'auto',
        position:'absolute',
      }}>
      <div className="container">
        <div className="row">
          <br/><br/>
          <div className="col s4 offset-s7"> 
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label colour="black" htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "2rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
              <div style={{marginTop: "5rem"  , textColor: "white"}}>
                <FacebookLogin
                appId="577959766186394"
                autoLoad={true}
                fields="name,email"
                callback={this.responseFacebook}
                cssClass="waves-effect waves-light btn social facebook"
              />
              </div>
            </form>
            <div>
            <br/>
              <br/>
             
              </div>
          </div>
        </div>
      </div>
      </ section>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  FacebookUserLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//export default Register;
export default connect(
  mapStateToProps,
  { registerUser,FacebookUserLogin }
)(withRouter(Register));