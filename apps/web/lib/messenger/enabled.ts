import { buildEnv } from "@cap/env";
import { BRAND } from "@cap/utils";

export const isSupportAssistantEnabled = () =>
	buildEnv.NEXT_PUBLIC_IS_CAP === "true" || BRAND.supportAssistantEnabled;
