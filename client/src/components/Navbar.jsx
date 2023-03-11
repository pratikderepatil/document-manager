import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ name }) => {
	return (
		<>
			<Flex justifyContent="space-between" gap="5" padding={"10"} pt="5">
				<Heading>Hi, {name}</Heading>
				<Link to="/">
					<Button
						size={"lg"}
						colorScheme="messenger"
						onClick={() => {
							localStorage.setItem("userDetails", "");
						}}
					>
						Logout
					</Button>
				</Link>
			</Flex>
		</>
	);
};

export default Navbar;
