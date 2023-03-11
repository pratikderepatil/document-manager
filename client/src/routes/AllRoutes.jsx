import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage";
import Login from "../components/Login";
import Signup from "../components/Signup";

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default AllRoutes;
