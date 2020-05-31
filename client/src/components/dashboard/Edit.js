import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from 'axios';
import { json } from "body-parser";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import TextField from '@material-ui/core/TextField';
import edit_image from '../image/edit01.jpg';

class Add extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todo_user_Id  : this.props.auth.user.id,
      title    : "",
      description: "",
      status   : "New",
      add_date : Date.now, // Wrong 
      due_date : null,
      current  : null,
      errors   : {}
    };
  }
 
  componentDidMount() {
    const current_todo = window.location.pathname.split("/").pop();
    
    this.setState({current: current_todo });
   
    axios.get(`/api/users/edit/${current_todo}`)
    .then((response) => {
      this.setState({
        title    : response.data.title, 
        description : response.data.description,
        statue   : response.data.status,
        due_date : response.data.due_date,
        add_date : response.data.add_date,
        label    : response.data.label,
        todo_user_Id  : response.data.todo_user_Id,
      });
    })
    .catch(err=> json({message:"erros catch axios get"}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleStatusChange = e => {
    this.setState({ status: e.target.value});
  };

onSubmit = e => {
    e.preventDefault();
    const newTodo = {
      "todo_user_Id"  : this.state.todo_user_Id,
      "title"         : this.state.title,
      "description"   : this.state.description,
      "status"        : this.state.status,
      "label"         : this.state.label,
      "due_date"      : this.state.due_date,
      "add_date"      : this.state.add_date,
    };
    
    axios.put(`/api/users/edit/${this.state.current}`,newTodo)
      .then(docs => { 
        this.props.history.push(`/mytodos/${this.props.auth.user.id}`)}) 
      .catch(err => console.log({message:"In Edit.js unable to put newTodo"})); 
  };

render() {
    const { errors } = this.state;
return (
  <section class="bg-solid-light slideContainer strut-slide-0" style={{  
    backgroundImage: `url(${edit_image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    marginBottom: '0px',
  }}>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
          <br/><br/>
            <Link to={`/mytodos/${this.props.auth.user.id}`} className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              My Todo
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Edit todo</b> below
              </h4>
            </div>
            
            <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12" style={{marginTop: "10px"}}>
              <input
                  placeholder=" "
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text"
                  className={classnames("", {
                    invalid: errors.title
                  })}
                />
                <label  htmlFor="status">title</label>
                <span className="red-text">{errors.status}</span>
              </div>

              
              <div className="input-field col s12" style={{marginTop: "10px"}}>
              <input
                  placeholder=" "
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.description}
                  id="description"
                  type="text"
                  className={classnames("", {
                    invalid: errors.description
                  })}
                />
                <label  htmlFor="description">Description</label>
                <span className="red-text">{errors.description}</span>
              </div>
            
              <div className="col s12" style={{marginTop: "10px"}}>
                <FormControl fullWidth>
                  <InputLabel id="status">Status </InputLabel>
                  <Select
                    value={this.state.status}
                    onChange={this.handleStatusChange}
                    >
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="In Progress">In progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="input-field col s12" style={{marginTop: "30px"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.due_date}
                  error={errors.due_date}
                  id="due_date"
                  type="Date"
                  className={classnames("", {
                    invalid: errors.due_date
                  })}
                />
                <label htmlFor="due_date">Due Date</label>
                <span className="red-text">{errors.due_date}</span>
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
                  Upadate
                </button>
              </div>
            </form>
            <div>
              .<br/><br/><br/><br/>
              <br/><br/><br/><br/><br/>
              <br/><br/>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  }
}

Add.propTypes = {
  auth: PropTypes.object.isRequired  //, errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth //, errors: state.errors
});

//export default Register;
export default connect(
  mapStateToProps  //, { registerUser }
)(withRouter(Add));