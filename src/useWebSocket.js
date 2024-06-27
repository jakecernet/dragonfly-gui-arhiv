import { useState, useEffect, useRef } from "react";

const useWebSocket = (url) => {
	const [data, setData] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const socketRef = useRef(null);

	useEffect(() => {
		const connect = () => {
			const ws = new WebSocket(url);
			socketRef.current = ws;

			ws.onopen = () => {
				console.log("WebSocket connection established");
				setIsConnected(true);
			};

			ws.onmessage = (event) => {
				const receivedData = JSON.parse(event.data);
				setData(receivedData);
				console.log("Data from server:", receivedData); // Print incoming messages
			};

			ws.onclose = () => {
				console.log("WebSocket connection closed");
				setIsConnected(false);
				// Attempt to reconnect every 2 seconds
				setTimeout(connect, 2000);
			};

			ws.onerror = (error) => {
				console.error("WebSocket error:", error);
				ws.close();
			};
		};

		connect();

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, [url]);

	const sendMessage = (message) => {
		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(message));
		} else {
			console.error("WebSocket is not open. Unable to send message:", message);
		}
	};

	return { data, sendMessage, isConnected };
};

export default useWebSocket;
