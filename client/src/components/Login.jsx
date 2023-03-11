import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	FormControl,
	FormLabel,
	Input,
	VStack,
	InputGroup,
	InputRightElement,
	Flex,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const toast = useToast();
	// const navigate = useNavigate();

	const handleSubmit = () => {
		fetch("https://document-manager-onzo.onrender.com/user/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				localStorage.setItem(
					"userDetails",
					JSON.stringify({ name: res.user, id: res.id })
				);
				toast({
					title: "Login Success! Welcome✨",
					description: "It's a start of something amazing.",
					position: "top",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((err) => {
				toast({
					title: "Internal server error!",
					description: "Please try after sometime.",
					position: "top",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			});
	};
	return (
		<Card maxW={"sm"} m="20vh auto" padding={5}>
			<CardHeader>
				<Flex justifyContent={"space-between"} alignItems="center">
					<div></div>
					<Link to="/">
						<Button
							leftIcon={<ChevronLeftIcon />}
							colorScheme="messenger"
							variant="link"
						>
							Home
						</Button>
					</Link>
				</Flex>
			</CardHeader>
			<CardBody>
				<VStack gap={3} mb="-3">
					<FormControl isRequired>
						<FormLabel>Email: </FormLabel>
						<Input
							required
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Password: </FormLabel>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								type={show ? "text" : "password"}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<Flex gap="2">
						Dont have an Account?
						<Link color={"pink.600"} to="/signup" variant="link">
							Signup
						</Link>
					</Flex>
				</VStack>
			</CardBody>
			<CardFooter>
				<Button w="full" onClick={handleSubmit} colorScheme={"messenger"}>
					Login
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Login;
