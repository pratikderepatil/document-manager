import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
	return (
		<>
			<Flex
				placeItems={"end"}
				justifyContent="end"
				gap="5"
				padding={"10"}
				pt="5"
			>
				<Link to="/login">
					<Button size={"lg"} colorScheme="messenger">
						Login
					</Button>
				</Link>
			</Flex>
			<Flex
				placeItems={"center"}
				h="70vh"
				justifyContent="center"
				gap="5"
				padding={"10"}
				pt="5"
			>
				<Heading>Welcome to Document store</Heading>
			</Flex>
		</>
	);
};

export default Homepage;
