import { notFound } from "next/navigation";
import { getMessengerConversationForViewer } from "@/lib/messenger/data";
import { isSupportAssistantEnabled } from "@/lib/messenger/enabled";
import { ChatWindow } from "./ChatWindow";

export default async function MessengerConversationPage(
	props: PageProps<"/messenger/[id]">,
) {
	if (!isSupportAssistantEnabled()) notFound();

	const params = await props.params;
	const data = await getMessengerConversationForViewer({
		conversationId: params.id,
	});

	if (!data) notFound();

	const { conversation, messages } = data;

	return (
		<ChatWindow
			conversation={{
				id: conversation.id,
				agent: conversation.agent,
				mode: conversation.mode,
			}}
			initialMessages={messages.map((m) => ({
				id: m.id,
				role: m.role,
				content: m.content,
			}))}
		/>
	);
}
