import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const show_InviteRequest = (array,userId) => {

const acceptrequest = (obj) => {
  const docs = {
    "name" : obj.name,
    "id"   : obj.id,
    "my"  : userId,
  }
  
  axios.put('/api/users/acceptreq',docs)
  .then(res=>console.log("Added successfully"))
  .then(msg=> deleterequest(obj))
  .catch(err=> console.log("Unable to add user"))
}

const deleterequest = (obj) => {
  const docs = {
    "name"  : obj.name,
    "id"    : obj.id,
    "my"    : userId,
    "array" : array,
  }
  axios.put('/api/users/deletereq',docs)
  .then(res=>console.log("req deleted successfully"))
  .catch(err=>console.log("Not able to delete req"))
}

const display_invites = () => {
  return array.map(obj => 
    <div class="card cyan darken-3">
      <div class="card-content white-text">
        <span class="card-title">{obj.name}</span>
        <p>Information: some Information</p>
      </div>
      <div class="card-action">
        <Link onClick={() => acceptrequest(obj)}
          className="btn waves-effect green black-text">
            Accept
        </Link>
        <Link onClick={() => deleterequest(obj)}
          className="btn waves-effect blue black-text">
            Delete
        </Link>
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
         <br/><br/><br/><br/><br/><br/><br/>
      </div>
    )
  }

return (
  <div className="col s12">
    <div className="col s6 left">
      <div>
        <h3>You {array.length ===0 ? "do not have any":"have "+array.length} Invites</h3>
      </div>
    <div className="col s10 offset-s2">
    {(array.length!==0) ? display_invites() : fill_page() }
    </div>
    </div>
  </div>)
} 