import React from "react";
//mport { Link } from "react-router-dom";
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import PersonAddIcon from '@material-ui/icons/PersonAdd';
//import { withRouter } from "react-router-dom";
//import PropTypes from "prop-types";

export const show_connection = (array,userId) => { 

  
  const display_connection = () => {
  return array.map(obj => 
    <div class="card cyan darken-3">
      <div class="card-content white-text">
        <span class="card-title">{obj.name}</span>

      </div>
  </div>
  )}

  const fill_page =() => {
    return (
      <div>
        .<br/><br/><br/><br/><br/>
         <br/><br/><br/><br/><br/>
         <br/><br/><br/><br/><br/>
         <br/><br/><br/><br/><br/>
      </div>
    )
  }

  return  (
    <div className="col s12">
      <div className="col s6 left">
        <div>
          <h3>You have {array.length} Connections</h3>
        </div>
      <div className="col s10 offset-s2">
        {(array.length!==0) ? display_connection() : fill_page() }
      </div>
      </div>
          <div>
          .<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
      
    </div>)
}
