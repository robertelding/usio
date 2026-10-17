import type { Metadata } from "next";
import { GeneralPage } from "./GeneralPage";

export const metadata: Metadata = {
	title: "Organization Settings — usio",
};

export default function OrganizationPage() {
	return <GeneralPage />;
}
