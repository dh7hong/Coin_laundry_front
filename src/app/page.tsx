// src/pages/index.tsx
import React from "react";
import MainView from "@/app/(public)/beforeLogin/components/A-MainViewBeforeLogin/page";
import ContainerInactiveLaundryPage from "@/app/(public)/beforeLogin/components/B-ContainerLaundryPageBeforeLogin/page";
import ContainerReviewPage from "@/app/(app)/home/components/D-ContainerReviewAfterLogin/page";
import AppFooter from "@/app/(app)/home/components/F-Footer/page";

export default function HomePage() {
	return (
		<div>
			<MainView />
			<ContainerInactiveLaundryPage />
			<ContainerReviewPage />
			<AppFooter />
		</div>
	);
}
