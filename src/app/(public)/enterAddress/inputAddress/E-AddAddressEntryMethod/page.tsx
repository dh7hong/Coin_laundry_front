"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SavedFieldsPage from "@/app/(public)/enterAddress/components/SavedFieldsPage/page";
import DeliveryMethodContainer from "@/app/(public)/enterAddress/components/DeliveryMethodContainer/page";
import TopNavigation from "@/app/(public)/enterAddress/components/TopNavigation/page";
import ActionButton from "@/app/(public)/enterAddress/components/ActionButton/page";
import ResetButton from "@/app/(public)/enterAddress/components/ResetButton/page";
import ProgressBar from "../../components/ProgressBar/page";

const AddAddressEntryMethod: FC = ({}) => {
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsClient(true);
		}
	}, []);

	const handleBackNavigation = () => {
		if (isClient) {
			localStorage.removeItem("detailedAddress");
		}
		router.push("/enterAddress/inputAddress/findAddress");
	};

	const handleNextNavigation = () => {
		router.push(
			"/enterAddress/inputAddress/F-FinalAddressCheck"
		); // Navigate to the F-FinalAddressCheck page
	};

	const handleReset = () => {
		if (isClient) {
			localStorage.removeItem("detailedAddress");
		}
		router.push("/enterAddress/inputAddress/addDetailedAddress");
	};

	return (
		<div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-[430px] bg-static-white flex flex-col pb-[16px]">
				<ProgressBar progress={62.5} />
				<TopNavigation
					text="배송지 추가"
					onClick={handleBackNavigation}
				>
					<ResetButton label="초기화" onClick={handleReset} />
				</TopNavigation>
				<DeliveryMethodContainer />
				<SavedFieldsPage />

				<>
            <div className="w-full max-w-[430px] h-[1px] bg-line-normal shadow-md"></div>
            <ActionButton
              label="다음"
              onClick={handleNextNavigation}
              className="w-full text-primary-normal"
            />
          </>
			</div>
		</div>
	);
};

export default AddAddressEntryMethod;
