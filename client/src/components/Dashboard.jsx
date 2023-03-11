import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
	const user = JSON.parse(localStorage.getItem("userDetails")) || "";
	const [select, setSelect] = useState("");
	const toast = useToast();
	const handleUpload = (e) => {
		const formData = new FormData();
		formData.append("fileupload", select);
		e.preventDefault();
		fetch("http://localhost:8080/file/upload", {
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
						<p>two!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
};

export default Dashboard;
