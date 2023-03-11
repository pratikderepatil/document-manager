import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const user = JSON.parse(localStorage.getItem("userDetails"));
	if (!user) {
		return <Navigate to="/" />;
	}
	return children;
};

export default PrivateRoute;
