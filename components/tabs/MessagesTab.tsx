import connectMongo from "@/lib/mongo";
import Class from "@/models/class";
import Message from "@/models/message";

export const dynamic = "force-dynamic";

interface Message {
	_id: string;
	message: string;
	date: Date;
}

const MessagesTab = async ({
	classId,
	studentId,
}: {
	classId: string;
	studentId: string;
}) => {
	await connectMongo();

	const classRef = await Class.findById(classId);

	const messages: Message[] = await Message.find({
		classRef,
	});

	return (
		<div className="space-y-4">
			{messages.length === 0 ? (
				<p className="text-gray-500">No messages yet</p>
			) : (
				messages.map((message) => (
					<div key={message._id} className="rounded-lg border p-4">
						<div className="flex justify-between">
							<span className="text-sm text-gray-500">{message.date.toDateString()}</span>
						</div>
						<p className="mt-2">{message.message}</p>
					</div>
				))
			)}
		</div>
	);
};

export default MessagesTab;
