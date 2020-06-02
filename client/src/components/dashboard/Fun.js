import React, {useEffect}from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import WorkIcon from '@material-ui/icons/Work';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Share from "@material-ui/icons/Share"
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import '../../App.css';
import '../../App2.css';
import todo_board from './todo_board.jpg';
import { show_connection } from '../team/connection';
import SendReq  from '../team/SendReq';
import { show_InviteRequest } from '../team/inviteRequest';
import { LoginLanding } from '../layout/LoginLanding';
import { useStyles } from '../funImport/useStyles';

var sectionStyle = {
  position : 'absolute',
  width: "100%",
  height: "120%",
 background: `url(${todo_board})` ,
 backgroundPosition: 'center',
 backgroundSize: 'cover',
 backgroundRepeat: 'no-repeat'
};

/*export default function*/ 
var MiniDrawer = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  var [mytodos, set_mytodos] = React.useState([]);
  var [personal] = React.useState([]);
  var [work] = React.useState([]);
  var [shopping] = React.useState([]);
  var [other] = React.useState([]);
  var [status1] = React.useState([]);
  var [status2] = React.useState([]);
  var [status3] = React.useState([]);
  var [todolabel, set_label] = React.useState("LoginLanding");
  var [friends, set_friends] = React.useState([]);
  var [myinvites, set_myinvites] = React.useState([]);
  var [userId] = React.useState(props.userInfo.id);
  var [username] = React.useState(props.userInfo.name);


  useEffect(() => {
    load_mytodos();
    load_connection();
    load_invites();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOutClick = e =>{ 
    //e.preventDefault();
    props.logoutUser();
  };

  const load_connection = () => {
    //console.log(props.userInfo.id)
    axios.get(`/api/users/myfriends/${userId}`)
    .then((response) => {
      set_friends(response.data);
    })
    .catch(err=>console.log("In Fun.js unable to make get friends"))
  }
 
  const load_invites = () => {
    //console.log(props.userInfo.id)
    axios.get(`/api/users/myinvites/${props.userInfo.id}`)
    .then((response) => {
      set_myinvites(response.data);
    })
    .catch(err=>console.log("In Fun.js unable to make get Invites"))
  }

  const load_mytodos = () => {
    axios.get(`/api/users/mytodos/${props.current}`)
    .then((response) => {
      set_mytodos(response.data);
    })
    .catch(err=>console.log("In Fun.js unable to make get req"))
  }

  const show_New_todos = () => {
    return status1.map(todo => 
      <div class="card cyan darken-3">
        <div class="card-content white-text">
          <span class="card-title">{todo.title}</span>
          <p>Description: {todo.description? todo.description : "Nothing"}</p>
          <p>Due Date: {todo.due_date}</p>
        </div>
        <div class="card-action">
          <Link  onClick={() => handleDeleteTodo(todo)}><i class="material-icons">archive</i></Link>
          <Link  onClick={() => handleEditTodo(todo)}><i class="material-icons">edit</i></Link>
          <Link  onClick={() => handleShareTodo(todo)}><i class="material-icons">share</i></Link>
        </div> 
      </div>
  )}

  const show_In_Progress_todos = () => {
    return status2.map(todo => 
    <div class="card lime darken-3">
      <div class="card-content white-text">
        <span class="card-title">{todo.title}</span>
        <p>Description: {todo.description? todo.description : "Nothing"}</p>
        <p>Due Date: {todo.due_date}</p>
      </div>
      <div class="card-action">
      <Link  onClick={() => handleDeleteTodo(todo)}><i class="material-icons">archive</i></Link>
      <Link  onClick={() => handleEditTodo(todo)}><i class="material-icons">edit</i></Link>
      <Link  onClick={() => handleShareTodo(todo)}><i class="material-icons">share</i></Link>
      </div>
      </div>
  )}

  const show_Completed_todos = () => {
    return status3.map(todo => 
    <div class="card light-green darken-2">
      <div class="card-content white-text">
        <span class="card-title">{todo.title}</span>
        <p>Description: {todo.description? todo.description : "Nothing"}</p>
        <p>Due Date: {todo.due_date}</p>
      </div>
      <div class="card-action">
      <Link  onClick={() => handleDeleteTodo(todo)}><i class="material-icons">archive</i></Link>
      <Link  onClick={() => handleEditTodo(todo)}><i class="material-icons">edit</i></Link>
      <Link  onClick={() => handleShareTodo(todo)}><i class="material-icons">share</i></Link>
      </div>
      </div>
  )}

  const show_labeled_todos = (todos_array) => {

    status1 = todos_array.filter(todo => todo.status === "New");
    status2 = todos_array.filter(todo => todo.status === "In Progress");
    status3 = todos_array.filter(todo => todo.status === "Completed");
    
    return (
      <div className="col s12">
        <div className="row">
        
        <div className="container col s4 left">
          <div class="card cyan darken-3">
              <div class="card-content white-text">
              <span class="center-align card-title">New Tasks</span>
            </div>
          </div>
          
          {show_New_todos()}
        
        </div>
  
        <div className="container col s4">
          
          <div class="card lime darken-3">
            <div class="card-content white-text">
              <span class="center-align card-title center-align">In ProgressTasks</span>
            </div>
          </div>
          
          {show_In_Progress_todos()}
  
        </div>
        
        <div className="container col s4 right">
        <div class="card light-green darken-2">
        <div class="card-content white-text">
          <span class="center-align card-title">Completed Tasks</span>
        </div>
        </div>
          {show_Completed_todos()}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  )
  }

  const show_mytodos = (input_label="LoginLanding") => {
    
    input_label = todolabel;

    personal = mytodos.filter(todo => todo.label === "Personal");
    work = mytodos.filter(todo => todo.label === "Work");
    shopping = mytodos.filter(todo => todo.label === "Shopping");
    other = mytodos.filter(todo => todo.label === "Other"); 
    
  if(input_label === "Shopping" ) {
    return (show_labeled_todos(shopping))
  }
  else if(input_label === "Work" ){
    return (show_labeled_todos(work))
  }
  else if(input_label === "Personal" ){
    return (show_labeled_todos(personal))
  }
  else if(input_label === "Other" ) {
    return (show_labeled_todos(other))
  }
  else if(input_label === "LoginLanding"){
    return (LoginLanding())
  }
  else {
    return <div>Else block</div>
  }
  }

  const group = () => {

    var friends1 = friends;
  
   let input_label = todolabel;
    
  if(input_label === "Connection" ) {
    //console.log(friends);
    return (show_connection(friends1,props.userInfo.id))
  }
  else if(input_label === "Invite" ) {
    return  (show_InviteRequest(myinvites,props.userInfo.id))
  }
  else if(input_label === "Add_Connection" ) {
    return <SendReq myinfo={props.userInfo}/>
  }
  }
  
  const handleDeleteTodo = (delete_todo_id) => {
    axios.delete(`/api/users/delete_todo/${delete_todo_id._id}`)
    .then(res => { 
        axios.get(`/api/users/mytodos/${props.current}`)
        .then((response) => set_mytodos(response.data));
      }) 
    .catch(err => console.log("In Fun.js failed to make delete req"));
  }
  
  const handleShareTodo = (share_todo) =>{
    props.history.push(`/share/${share_todo._id}`);
  }
  const handleEditTodo = (edit_todo) => {
    props.history.push(`/edit/${edit_todo._id}`);
  }

  

  return (
  
    <div style= {sectionStyle} >
      <div className={classes.root}  style={{marginTop:"5%"}}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>handleDrawerOpen()}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Hi, {username.split(' ')[0]} 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={()=>handleDrawerClose()}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={"Add Todo"} component={Link} to={"/dashboard/add"}>
            <ListItemIcon>{<AddIcon />}</ListItemIcon>
            <ListItemText primary={"Add Todo"} />
          </ListItem>

          <ListItem button key={"Log Out"} onClick={()=>handleLogOutClick()}>
            <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItem>
        </List>
        <Divider />
        <div className="center-align">
          <br></br>
          Cards!
        </div>
        
        <List>
        <ListItem button key={"Personal"} onClick={()=>set_label("Personal")}>
            <ListItemIcon>{<AccountBoxIcon />}</ListItemIcon>
            <ListItemText primary={"Personal"} />
          </ListItem>
          <ListItem button key={"Work"} onClick={()=>set_label("Work")}>
            <ListItemIcon>{<WorkIcon />}</ListItemIcon>
            <ListItemText primary={"Work"} />
          </ListItem>
          <ListItem button key={"Shopping"} onClick={()=>set_label("Shopping")}>
            <ListItemIcon>{<ShoppingCartIcon />}</ListItemIcon>
            <ListItemText primary={"Shopping"} />
          </ListItem>
          <ListItem button key={"Other"} onClick={()=>set_label("Other")}>
            <ListItemIcon>{<AppsIcon />}</ListItemIcon>
            <ListItemText primary={"Other"} />
          </ListItem>
        </List>

        <Divider />
        <List>
        
          <ListItem button key={"Connection"} onClick={()=>set_label("Connection")}>
            <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
            <ListItemText primary={"Connection"} />
          </ListItem>
        
         <ListItem button key={"Invites"} onClick={()=>set_label("Invite")}>
            <ListItemIcon>{<PersonAddIcon />}</ListItemIcon>
            <ListItemText primary={"Invites"} />
          </ListItem>
          
          <ListItem button key={"Add Connection"} onClick={()=>set_label("Add_Connection")}>
            <ListItemIcon>{<AddIcon />}</ListItemIcon>
            <ListItemText primary={"Add Connection"} />
          </ListItem>
          
          <ListItem button key={"developer Information"} component={Link} to={"/devinfo"}>
            <ListItemIcon>{<PersonIcon />}</ListItemIcon>
            <ListItemText primary={"developer Information"} />
          </ListItem>

        </List>
      </Drawer>
        
        <main className={classes.content}>
          <div className={classes.content}>
            <br />
          { (todolabel=== "Shopping" || todolabel=== "Work" ||todolabel=== "Personal" ||todolabel=== "Other" ||todolabel=== "LoginLanding") ? show_mytodos() : group() }
          </div>
        </main>
        </div>
      </div>
   
  ); 
}

MiniDrawer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(MiniDrawer));
