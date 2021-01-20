import React, { Component } from "react";
import Footer from "../components/Footer";
import userAPI from "../utils/userAPI";
import {  Redirect, Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConf: ""
  };

  componentDidMount() {
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      userAPI.signup({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        passwordConf: this.state.passwordConf,

      })
        .then(res => {
          if(res.status === 200 ){
            this.props.authenticate();
            return <Redirect to="/comments" />
          }
        })
        .catch(err => console.log(err.response.data));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <form>
              <p>username</p>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="what's your name"
              />
              <p>email</p>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="enter a valid email"
              />
              <p>password</p>
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="choose a secure password"
                type="password"
              />
              <p>confirm password</p>
              <Input
                value={this.state.passwordConf}
                onChange={this.handleInputChange}
                name="passwordConf"
                placeholder="confirm password"
                type="password"
              />
              
              <FormBtn
                // disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                <p>Signup</p>
              </FormBtn>
              <Link to="/">
              <FormBtn> <p>Login</p> </FormBtn>
            </Link>
            </form>
          </Col>
          
        </Row>
        {/* redirect on authenticated */}
        {this.props.authenticated ? <Redirect to='/comments'/>: <div></div>}
<Footer />
      </Container>
    );
  }
}

export default Signup;