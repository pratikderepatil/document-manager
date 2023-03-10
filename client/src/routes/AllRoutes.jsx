import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Homepage from "../components/Homepage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/dashboard"
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default AllRoutes;
