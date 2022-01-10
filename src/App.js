import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import "./App.css";

import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Main from './Components/Main';
import Register from './Pages/Register';
import UploadImage from './Components/UploadImage';
import Read from './Components/Read';
import Firestore from './Components/Firestore';
import Home from './Pages/Home';
import SignOut from './Pages/SignOut';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setCookie, deleteCookie } from './Services/cookie';

export const LoadingContext = React.createContext();
function App() {
	const [loading, setLoading] = useState(false);

	const setLoaderHandle = (value) => {
		setLoading(value);
	}

	const auth = getAuth();
	onAuthStateChanged(auth, user => {
		if (user) {
			setCookie("jwt", user.accessToken, 30);
		} else {
			deleteCookie("jwt");
		}
	})

	return (
		<LoadingContext.Provider value={{ loadHandle: setLoaderHandle }}>
			<Router>
				<Routes>
					<Route exact path="/" element={<PrivateRoute />}>
						<Route exact path="/" element={<Home />} />
						{/* <Route exact path="/main" element={<Main />} /> */}
					</Route>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/logout" element={<SignOut />} />
					<Route exact path="/main" element={<Main />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
			<div className={loading ? "loading" : "loading d-none"}>
				<Spinner className="loader" animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
				<div className="text">
					Vui lòng chờ...
				</div>
			</div>
		</LoadingContext.Provider>
	);
}

export default App;
