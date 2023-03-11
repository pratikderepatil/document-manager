import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Tab,
	Table,
	TableContainer,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
	const user = JSON.parse(localStorage.getItem("userDetails")) || "";
	const [select, setSelect] = useState("");
	const [history, setHistory] = useState([]);
	const toast = useToast();
	const handleUpload = (e) => {
		const formData = new FormData();
		formData.append("fileupload", select);
		e.preventDefault();
		fetch(`${process.env.REACT_APP_SERVER_URL}file/uploadDetails`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				filename: select.name,
				filesize: select.size,
				email: user.email,
			}),
		})
			.then((res) => {
				if (res.status !== 200) {
					toast({
						title: "",
						description: "This file already exists, try with another name",
						position: "top",
						status: "warning",
						duration: 5000,
						isClosable: true,
					});
				} else {
					fetch(`${process.env.REACT_APP_SERVER_URL}file/upload`, {
						method: "POST",
						"Content-Type": "multipart/form-data",
						body: formData,
					})
						.then((res) => {
							toast({
								title: "File Uploaded successfully!",
								position: "top",
								status: "success",
								duration: 5000,
								isClosable: true,
							});
						})
						.catch((err) => {
							console.log(err);
						});
					getUploadHistory();
				}
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
	const handleDelete = (id) => {
		fetch(`${process.env.REACT_APP_SERVER_URL}file/deleteUpload/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				toast({
					title: "File Deleted successfully!",
					position: "top",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				getUploadHistory();
			});
	};
	const getUploadHistory = () => {
		fetch(`${process.env.REACT_APP_SERVER_URL}file/uploadDetails/${user.email}`)
			.then((res) => res.json())
			.then((res) => setHistory(res));
	};
	useEffect(() => {
		getUploadHistory();
	}, []);
	return (
		<>
			<Navbar name={user.name} />

			<Tabs variant={"line"} p="10" pt="5">
				<TabList>
					<Tab _selected={{ fontSize: 17, color: "blue.400" }}>Upload</Tab>
					<Tab _selected={{ fontSize: 17, color: "blue.400" }}>History</Tab>
				</TabList>
				<TabPanels>
					{/* initially mounted */}
					<TabPanel>
						<form encType="multipart/form-data" onSubmit={handleUpload}>
							<Flex placeItems={"center"} w="70%" m="10vh auto">
								<FormControl isRequired>
									<FormLabel>Choose file for upload</FormLabel>
									<Input
										type={"file"}
										border="none"
										accept="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv"
										onChange={(e) => {
											setSelect(e.target.files[0]);
										}}
									/>
								</FormControl>
								<Button variant={"solid"} colorScheme="whatsapp" type="submit">
									Upload
								</Button>
							</Flex>
						</form>
					</TabPanel>
					{/* initially not mounted */}
					<TabPanel>
						{history.length ? (
							<TableContainer>
								<Table variant="striped" colorScheme="linkedin">
									<Thead>
										<Tr>
											<Th>File Name</Th>
											<Th>Size</Th>
											<Th>Action</Th>
										</Tr>
									</Thead>
									<Tbody>
										{history?.map((ele) => {
											return (
												<Tr key={ele._id}>
													<Td>{ele.filename}</Td>
													<Td>{Math.floor(ele.filesize / 1000)} kb</Td>
													<Td>
														<Button
															colorScheme={"red"}
															size="sm"
															onClick={() => {
																handleDelete(ele._id);
															}}
														>
															Delete
														</Button>
													</Td>
												</Tr>
											);
										})}
									</Tbody>
								</Table>
							</TableContainer>
						) : (
							<Heading>No files uploaded</Heading>
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
};

export default Dashboard;
