import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'date-fns';
import axios from "axios";
import { json } from "body-parser";
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import todo_board from './todo_board.jpg';
var sectionStyle = {
    position : 'absolute',
    width: "100%",
    height: "auto",
   background: `url(${todo_board})` ,
   backgroundPosition: 'center',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat'
  };

class Share extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      array : [],
      todo_user_Id  : "",
      title    : "",
      description: "",
      status   : "New",
      label    : "",
      due_date : new Date('2020-05-20T21:11:54'), //material UI pickers
      add_date : Date.now,
      errors   : {}
    };
  }
 
  handleAddTodo = (data) =>{
      this.setState({todo_user_Id: data.id});
      const current_todo = window.location.pathname.split("/").pop();
      console.log(current_todo);
      axios.get(`/api/users/edit/${current_todo}`)
      .then((response)=>{
        this.setState({
          title    : response.data.title, 
          description : response.data.description,
          statue   : response.data.status,
          due_date : response.data.due_date,
          add_date : response.data.add_date,
          label    : response.data.label,
        });
       console.log(response.data);
       const newTodo = {
        todo_user_Id  : data.id,
        title    : this.state.title,
        description : this.state.description,
        status   : this.state.status,
        label    : this.state.label,
        due_date : this.state.due_date,
        add_date : Date.now,
        };
        axios.post(`/api/users/dashboard/add`,newTodo);
        console.log(newTodo);
      })

  };

componentDidMount(props){
    axios.get(`/api/users/myfriends/${this.props.auth.user.id}`)
    .then((response) =>{
        console.log(response.data)
        this.setState({array : response.data});
    })
}




  fetch_myfriends(){
      return this.state.array.map(arr=>
              <div class="card cyan darken-3">
               <div class="card-content white-text">
                 <span class="card-title">{arr.name}</span>
                </div>
               <div class="card-action">
                   <Link  onClick={() => this.handleAddTodo(arr)}>Add</Link>
              </div> 
          </div>
      )
  }
render() {
   
return (
    <div style= {sectionStyle}>
     <div style={{marginTop:"5%"}}>
     <Link to={`/mytodos/${this.props.auth.user.id}`} className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              My Todo
            </Link>
         <div class="container">
      <div style={{width:"30%"}}> {this.fetch_myfriends()}</div>
      </div>
     </div>
     <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
     </div>
    );
  }
}

Share.propTypes = {
  auth: PropTypes.object.isRequired  //, errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth //, errors: state.errors
});

//export default Register;
export default connect(
  mapStateToProps  //, { registerUser }
)(withRouter(Share));