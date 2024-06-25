import { useState, useEffect, useRef } from "react";

const useWebSocket = (url) => {
	const [data, setData] = useState(null);
	const socketRef = useRef(null);

	useEffect(() => {
		const ws = new WebSocket(url);
		socketRef.current = ws;

		ws.onopen = () => {
			console.log("WebSocket connection established");
		};

		ws.onmessage = (event) => {
			const receivedData = JSON.parse(event.data);
			setData(receivedData);
			console.log("Data from server:", receivedData); // Print incoming messages
		};

		ws.onclose = () => {
			console.log("WebSocket connection closed");
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		return () => {
			ws.close();
		};
	}, [url]);

	const sendMessage = (message) => {
		if (
			socketRef.current &&
			socketRef.current.readyState === WebSocket.OPEN
		) {
			socketRef.current.send(JSON.stringify(message));
		} else {
			console.error(
				"WebSocket is not open. Unable to send message:",
				message
			);
		}
	};

	return { data, sendMessage };
};

export default useWebSocket;
