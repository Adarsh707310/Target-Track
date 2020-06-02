import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from 'axios';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import add_image from '../image/add01.jpg';

class Add extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todo_user_Id  : this.props.auth.user.id,
      title    : "",
      description: "",
      status   : "New",
      label    : "",
      due_date : new Date('2020-05-20T21:11:54'), //material UI pickers
      add_date : Date.now,
      errors   : {}
    };
  }
  handleDateChange = (date) => {
    this.setState({due_date: date});
    console.log(this.state);
  };
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

handleLabelChange = e => {
  this.setState({ label: e.target.value});
};

onSubmit = e => {  
    e.preventDefault();
    const newTodo = {
    "todo_user_Id"  : this.state.todo_user_Id,
    "title"    : this.state.title,
    "description" : this.state.description,
    "status"   : this.state.status,
    "label"    : this.state.label,
    "due_date" : this.state.due_date,
    "add_date" : this.state.add_date,
    };
    
    axios.post('/api/users/dashboard/add',newTodo)
      .then(todo => {this.setState({
        title    : "",
        description: "",
        status   : "New",
        due_date : new Date('2020-05-20T21:11:54'),
      })}
      )
      .catch(err => console.log({messge:"In Add.js unable to post NewTodo"})); 
  };

render() {
    const { errors } = this.state;
return (
      <section class="bg-solid-light slideContainer strut-slide-0" style={{  
        backgroundImage: `url(${add_image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        marginBottom: '0px',
      }}>
      
      <div className="container">
        <div className="row">
        <br/><br/><br/><br/><br/><br/><br/>
         
          <div className="col s8 offset-s2">
            <Link to={`/mytodos/${this.props.auth.user.id}`} className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to My Todo
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4><b>Add todo</b> below</h4>
            </div>
            
            <form noValidate onSubmit={this.onSubmit}>
                
                <div className="col s6 left">
                  <br />
                  <br />
                  <br />  
                  <div className="col s10 center-align" style={{marginTop: "15px"}}>
                      <FormControl fullWidth>
                        <InputLabel id="lable">Label</InputLabel>
                        <Select value={this.state.label} onChange={this.handleLabelChange}>
                          <MenuItem value="Personal">Personal</MenuItem>
                          <MenuItem value="Work">Work</MenuItem>
                          <MenuItem value="Shopping">Shopping</MenuItem>
                          <MenuItem value="Other">Others</MenuItem>
                        </Select>
                      </FormControl>
                  </div>

                </div>
              
              <div className="col s6 right">
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.title}
                    error={errors.title}
                    id="title"
                    type="text"
                    className={classnames("", { invalid: errors.title})}
                  />
                  <label htmlFor="title">Title</label>
                  <span className="red-text">{errors.title}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.description}
                    error={errors.description}
                    id="description"
                    type="text"
                    className={classnames("", { invalid: errors.description})}
                  />
                  <label htmlFor="description">Description</label>
                  <span className="red-text">{errors.description}</span>
                </div>
                
                <div className="col s12" >
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
                <div className="input-field col s12" style={{marginTop:"4%"}}>
                      
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                       <KeyboardDatePicker
                         margin="normal"
                         id="dueDate"
                         variant="outlined"
                         format="dd/MM/yyyy"
                         value={this.state.due_date}
                         error={errors.due_date}
                         onChange={this.handleDateChange}
                         KeyboardButtonProps={{
                        'aria-label': 'change date',
                
                         }}
                        
                        />
                        
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      variant="outlined"
                      value={this.state.due_date}
                      error={errors.due_date}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                       'aria-label': 'change time',
                      }}
                     />
                   </MuiPickersUtilsProvider>
                </div>
    
                <div className="center-align" >
                  <button
                    style={{
                      width: "240px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "5rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    ADD {this.state.label} Todo 
                  </button>
                </div>

              </div>
            </form>
          </div> 
         </div>  
         <div>
              .<br/><br/>
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


/*
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class Add extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todo_user_Id  : this.props.auth.user.id,
      title    : "",
      status   : "New",
      label    : "",
      due_date : null, //material UI pickers
      add_date : Date.now,
      errors   : {}
    };
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

handleLabelChange = e => {
  this.setState({ label: e.target.value});
};

onSubmit = e => {  
    e.preventDefault();
    const newTodo = {
    "todo_user_Id"  : this.state.todo_user_Id,
    "title"    : this.state.title,
    "status"   : this.state.status,
    "label"    : this.state.label,
    "due_date" : this.state.due_date,
    "add_date" : this.state.add_date,
    };
    
    axios.post('/api/users/dashboard/add',newTodo)
      .then(todo => this.props.history.push(`/mytodos/${this.props.auth.user.id}`))
      .catch(err => console.log({messge:"In Add.js unable to post NewTodo"})); 
  };

render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to={`/mytodos/${this.props.auth.user.id}`} className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              My Todo
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add todo</b> below
              </h4>
            </div>
            
            <form noValidate onSubmit={this.onSubmit}>
              
            <div className="col s12" style={{marginTop: "15px"}}>
                <FormControl fullWidth>
                  <InputLabel id="lable">Label</InputLabel>
                  <Select
                    value={this.state.label}
                    onChange={this.handleLabelChange}
                    >
                      <MenuItem value="personal">Personal</MenuItem>
                      <MenuItem value="work">Work</MenuItem>
                      <MenuItem value="Shopping">Shopping</MenuItem>
                      <MenuItem value="other">Others</MenuItem>
                    </Select>
                </FormControl>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text"
                  className={classnames("", { invalid: errors.title})}
                />
                <label htmlFor="title">Title</label>
                <span className="red-text">{errors.title}</span>
              </div>
              
              <div className="col s12" style={{marginTop: "15px"}}>
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

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.due_date}
                  error={errors.due_date}
                  id="due_date"
                  type="Date"
                  className={classnames("", { invalid: errors.due_date})}
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
                    marginTop: "5rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  ADD Task
                </button>
              </div>
            </form>
          </div>
          </div>  
        </div>
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
*/