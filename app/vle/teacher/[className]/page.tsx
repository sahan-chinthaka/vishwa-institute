"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/footer";
import axios from "axios";

interface Message {
	message: string;
	date: Date;
}

const TeacherClassPage: React.FC = () => {
	const [classMessages, setClassMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const { className } = useParams();

	function refreshMessages() {
		axios.get(`/api/vle/teacher/?class_id=${className}`).then((res) => {
			setClassMessages(res.data.messages);
		});
	}

	useEffect(() => {
		refreshMessages();
	}, []);

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			axios
				.post(`/api/vle/teacher/?class_id=${className}`, {
					message: newMessage.trim(),
					date: new Date(),
				})
				.then((res) => {
					console.log(res.data);
					refreshMessages();
				});
			setNewMessage("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">Welcome to Class</h1>

			<p className="mt-2 text-lg">Manage your class messages here.</p>

			<div className="mx-auto mt-6 flex h-[500px] w-full max-w-[900px] flex-col items-center justify-between bg-green-100 p-4">
				{/* Message List */}
				<div className="mb-4 w-full flex-grow space-y-4 overflow-y-auto">
					{classMessages.map((msg, idx) => (
						<div key={idx} className="flex justify-end">
							<div className="max-w-[90%] rounded-lg bg-green-200 p-3 text-gray-800 shadow-md">
								<p>{msg.message}</p>
								<p className="mt-1 text-xs text-gray-500">{msg.date + ""}</p>
							</div>
						</div>
					))}
				</div>

				{/* Input Area */}
				<div className="flex w-full flex-col items-stretch">
					<textarea
						className="w-full rounded-md border p-2"
						rows={3}
						placeholder="Type your message here..."
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button
						className="mt-2 self-end rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
						onClick={handleSendMessage}
					>
						Send Message
					</button>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default TeacherClassPage;
