import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BoardRead() {
	const [read, setRead] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `http://localhost:4003/articles/${id}`,
					baseURL: 'http://localhost:4003/articles',
					timeout: 2000,
				});
				setRead(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	console.log(read);

	return (
		<>
			<div>{read.id}</div>
			<div>{read.title}</div>
			<div>{read.content}</div>
			<div>{read.insertDate}</div>
		</>
	);
}
export default BoardRead;
