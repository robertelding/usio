import type { PropsWithChildren } from "react";
import { isSupportAssistantEnabled } from "@/lib/messenger/enabled";
import { AppProviders } from "../Layout/AppProviders";
import { DeferredMessengerWidget } from "../Layout/DeferredMessengerWidget";

export const dynamic = "force-dynamic";

export default function Layout(props: PropsWithChildren) {
	return (
		<AppProviders>
			{props.children}
			{isSupportAssistantEnabled() && <DeferredMessengerWidget />}
		</AppProviders>
	);
}
