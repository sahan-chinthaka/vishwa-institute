
interface Message {
	id: string;
	content: string;
	date: string;
	teacherName: string;
}

const MessagesTab = () => {
	const messages: Message[] = [];

	return (
		<div className="space-y-4">
			{messages.length === 0 ? (
				<p className="text-gray-500">No messages yet</p>
			) : (
				messages.map((message) => (
					<div key={message.id} className="rounded-lg border p-4">
						<div className="flex justify-between">
							<span className="font-semibold">{message.teacherName}</span>
							<span className="text-sm text-gray-500">{message.date}</span>
						</div>
						<p className="mt-2">{message.content}</p>
					</div>
				))
			)}
		</div>
	);
};

export default MessagesTab;
