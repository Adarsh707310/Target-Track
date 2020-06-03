import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Show_InviteRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mysentReq: [],
      //userinfo: props.userinfo
    };
  }

  acceptrequest = (obj) => {
    const docs = {
      name: obj.name,
      id: obj.id,
      my: this.props.userinfo.id,
      myname: this.props.userinfo.name,
    };

    axios
      .put("/api/users/acceptreq", docs)
      .then((res) => console.log("Added successfully in both"))
      .then((msg) => this.deleterequest(obj))
      .catch((err) => console.log("Unable to add user"));
  };

  deleterequest = (obj) => {
    const docs = {
      name: obj.name,
      id: obj.id,
      my: this.props.userinfo.id,
      array: this.props.array,
    };
    axios
      .put("/api/users/deletereq", docs)
      .then((res) => console.log("req deleted successfully"))
      .catch((err) => console.log("Not able to delete req"));

    // new
    axios
      .get(`/api/users/mysendReq/${obj.id}`)
      .then((response) => this.setState({ mysendReq: response.data }))
      .then((msg) => {
        axios
          .put("/api/users/deleteSendreq", {
            id: obj.id,
            array: this.state.mysentReq,
          })
          .then((res) => console.log("some success message"))
          .catch((err) => console.log("some failed message"));
      })
      .catch((err) => console.log("some msg"));
  };

  display_invites = () => {
    return this.props.array.map((obj) => (
      <div class="card cyan darken-3">
        <div class="card-content white-text">
          <span class="card-title">{obj.name}</span>
          
        </div>
        <div class="card-action">
          <Link
            onClick={() => this.acceptrequest(obj)}
            className="btn waves-effect green black-text"
          >
            Accept
          </Link>
          <Link
            onClick={() => this.deleterequest(obj)}
            className="btn waves-effect blue black-text"
          >
            Delete
          </Link>
        </div>
      </div>
    ));
  };

  fill_page = () => {
    return (
      <div>
        .<br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  };

  render() {
    return (
      <div className="col s12">
        <div className="col s6 left">
          <div>
            <h3>
              You{" "}
              {this.props.array.length === 0
                ? "do not have any"
                : "have " + this.props.array.length}{" "}
              Invites
            </h3>
          </div>
          <div className="col s10 offset-s2">
            {this.props.array.length !== 0
              ? this.display_invites()
              : this.fill_page()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Show_InviteRequest);
