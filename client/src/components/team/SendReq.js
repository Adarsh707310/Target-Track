import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class SendReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allusers: [],
      friends: [],
      alreadysend: [],
      myid: this.props.myinfo.id,
      myname: this.props.myinfo.name,
    };
  }

  addtosendReq(docs) {
    axios
      .put("/api/users/addsendReq", docs)
      .then((docs) => console.log("Added Req to sendReq" + docs))
      .catch((err) => console.log("Unable to send req" + err));
  }

  sendinvite(user) {
    const docs = {
      name: this.state.myname,
      id: this.state.myid,
      reqto: user._id,
    };
    console.log(docs);
    axios
      .put("/api/users/sendreq", docs)
      .then((docs) => console.log("Added sent" + docs))
      .then((done) => this.addtosendReq(docs))
      .catch((err) => console.log("Unable to send req" + err));
  }

  componentDidMount() {
    axios
      .get(`/api/users/myfriends/${this.state.myid}`)
      .then((response) => {
        this.setState({ friends: response.data });
      })
      .catch((err) => console.log("In Fun.js unable to make get friends"));

    axios
      .get("/api/users/allusers")
      .then((response) => this.setState({ allusers: response.data }))
      .catch((err) => console.log("In Send Req unable to make get allusers"));

    axios
      .get(`/api/users/rendReq/${this.state.myid}`)
      .then((response) => {
        this.setState({ alreadysend: response.data });
      })
      .catch((err) => console.log("In Fun.js unable to make get alreadysend"));
  }

  fill_page() {
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
        <br />
        <br />
        <br />
      </div>
    );
  }

  display_allusers() {
    return this.state.allusers.map((user) => (
      <div className="col s3">
        <div class="card cyan darken-3">
          <div class="card-content white-text">
            <span class="card-title">{user.name}</span>
            <p>Email: {user.email}</p>
            <p>_id: {user._id}</p>
          </div>
          <div class="card-action">
            {this.state.friends.find((friend) => friend.id === user._id) ===
            undefined ? (
              this.state.alreadysend.find((req) => req.id === user._id) ===
              undefined ? (
                <Link
                  onClick={() => this.sendinvite(user)}
                  className="btn waves-effect green black-text"
                >
                  Send Invite
                </Link>
              ) : (
                <Link
                  onClick={() => this.sendinvite(user)}
                  className="btn disabled black black-text"
                >
                  already send
                </Link>
              )
            ) : (
              <Link
                onClick={() => this.sendinvite(user)}
                className="btn disabled black black-text"
              >
                connected
              </Link>
            )}
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="col s12">
        <h3>Make Connections</h3>
        <br />

        <div className="container">
          {this.state.allusers.length !== 0
            ? this.display_allusers()
            : this.fill_page()}
        </div>
      </div>
    );
  }
}

export default withRouter(SendReq);
