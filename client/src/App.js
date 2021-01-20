import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { Container } from "./components/Grid";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Head from "./components/Head";
import Nav from "./components/Nav";
import userAPI from "./utils/userAPI";
import ProtectedRoute from "./components/ProtectedRoute"
import UploadRec from "./pages/UploadRec";
import SearchRecs from "./pages/SearchRecs"
import SavedRecs from "./pages/SavedRecs";
// import About from "./pages/About";

function App() {
	const [userState, setUserState] = useState({});

useEffect(() => { 
	   // auth user on first render
    authenticate() 
}, []);

	//user authentication
	function authenticate() {
		return userAPI.authenticateUser()
			.then(({ data }) => {
				console.log('user:', data );
            setUserState(data);
			})
			.catch((err) => console.log('registered user:', err.response));
	}

	return (
		<Router>
		    <Nav />
			<Container>
				<Switch>
					<Route
						exact
						path='/'
						render={ props => (
							<Login
								{...props}
								userState={userState}
								setUserState={setUserState}
							/>
						)}
					/>
					<Route
						exact
						path='/signup'
						render={ props => (
							<Signup
								{...props}
								authenticate={authenticate}
								user={userState}
							/>
						)}
					/>
			<ProtectedRoute exact path={["/", "/home"]}>
                <Home {...userState} />
            </ProtectedRoute>
			<ProtectedRoute exact path="/uploadRec">
                <UploadRec {...userState} />
            </ProtectedRoute>
			<ProtectedRoute exact path="/searchRec">
                <SearchRecs {...userState} />
            </ProtectedRoute>
			<ProtectedRoute exact path="/savedRecs">
                <SavedRecs {...userState} />
            </ProtectedRoute>
            {/* <ProtectedRoute exact path='/about' >
                <About {...userState} />
            </ProtectedRoute> */}
					<Route component={NoMatch} />
				</Switch>
			</Container>
			{ userState.email ? <Redirect to="/searchRec" /> : <></>}
		</Router>
		
	);
}

export default App;
