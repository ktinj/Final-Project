import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn, form} from "../components/Form";
import Footer from "../components/Footer";
import Head from "../components/Head";

class Login extends Component {
  state = {
      email: "",
      password: ""
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
      userAPI.loginUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if(res.status === 200 ){
            this.props.setUserState(res.data)
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Head />
        <Row>
          <Col size="md-12">
            <form>
              <p>email</p>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="enter valid email"
              />
              <p>password</p>
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="enter your password"
                type="password"
              />
              
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                <p>Login</p>
              </FormBtn>
            <Link to="/signup">
              <FormBtn> <p>Signup</p> </FormBtn>
            </Link>
            </form>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Login;