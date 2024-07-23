<<<<<<< HEAD
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
=======
// src/components/MainView.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
import ChevronRightIcon from "@/assets/icons/main/chevron-right.svg";
import TShirtIcon from "@/assets/icons/main/tshirt.svg";
import TShirtIconSmall from "@/assets/icons/main/tshirt-small.svg";
import BedIcon from "@/assets/icons/main/bed.svg";
import BedIconSmall from "@/assets/icons/main/bed-small.svg";
<<<<<<< HEAD
import ShirtAndSheetsIcon from "@/assets/icons/main/shirt-sheets.svg";
=======
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
import ShoesIcon from "@/assets/icons/main/shoes.svg";
import NavigationIcon from "@/assets/icons/main/navigation.svg";
import Info from "@/assets/icons/main/information-circle.svg";
import Volume from "@/assets/icons/main/volume.svg";
import LaundryItem from "@/components/LaundryItem";
<<<<<<< HEAD
import MainTopNavigation from "@/app/(app)/home/components/MainTopNavigation/page";
import PopupInitial from "@/components/PopupInitial";
=======
>>>>>>> 58859fb9558e1986de493197f11208773405cfac

const MainView: React.FC = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [address, setAddress] = useState("");
<<<<<<< HEAD
	const router = useRouter();

	const handleSetInfo = () => {
		router.push("/enterAddress/inputAddress/phoneStart");
	};

	const navigateToUserGuide = () => {
		router.push("/userGuide");
	};

	let shippingAddress = "" || "배송지를 입력해주세요";

	return (
		<div className="bg-gray-50">
			<div className="px-[20px] pb-[20px] bg-background-normal-alternative w-full max-w-[430px] mx-auto relative">
				<MainTopNavigation text={shippingAddress} />
=======
	const router = useRouter(); // Initialize the router

	const handleSetInfo = () => {
		router.push("/enterAddress/inputAddress/shippingName"); // Navigate to the shippingName page
	};

	const navigateToUserGuide = () => {
		router.push("/userGuide"); // Navigate to the shippingName page
	};

	return (
		<div className="bg-gray-50">
			<div className="px-[20px] pt-[20px] pb-[25px] bg-background-normal-alternative w-[390px] mx-auto relative">
				<div className="flex justify-between items-center">
					<button
						onClick={handleSetInfo}
						className="relative flex items-center text-label-1-normal font-medium"
					>
						배송지를 입력해주세요
						<ChevronRightIcon className="ml-[6px] fill-label-neutral" />
					</button>

					<div className="flex space-x-4">
						<button className="text-label-1-normal font-medium">
							가격표
						</button>
						<button className="text-label-1-normal font-medium">
							알림
						</button>
					</div>
				</div>
				{/* Spacer */}
				<div className="h-[24px]" />
				{/* Spacer */}
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
				<div className="flex justify-between items-center">
					<div className="text-heading-2 font-semibold">
						세탁 신청
					</div>
					<button
						onClick={navigateToUserGuide}
<<<<<<< HEAD
						className="flex text-primary-normal text-label-1-normal items-center space-x-1"
					>
						<Info className="fill-primary-normal" />
						<div>이용 가이드 보기</div>
						<ChevronRightIcon className="fill-primary-normal" />
					</button>
				</div>
				<div className="h-6"></div>
				<div className="bg-[#FFFBE6] rounded-sm w-full h-14 space-x-2 p-2 border-[#FFFBE6] flex items-center">
					<Volume className="fill-primary-normal w-5 h-5" />
					<div
						className="text-cool-neutral-40 text-label-2 font-semibold"
						style={{ wordBreak: "keep-all" }}
					>
						색이 섞일까 걱정이시죠? 저희는{" "}
						<span className="text-primary-normal font-semibold">
=======
						className="flex text-primary-strong text-label-1-normal justify-between items-center space-x-1"
					>
						<Info className="fill-primary-strong " />
						<div>이용 가이드 보기</div>
						<ChevronRightIcon className="fill-primary-strong" />
					</button>
				</div>
				{/* Spacer */}
				<div className="h-[24px]" />
				{/* Spacer */}
				<div className="flex items-center bg-[#FFFBE6] rounded-sm w-[350px] h-[54px] space-x-2 p-[8px] border-[#FFFBE6] border-[4px]">
					<Volume className="gap-[8px]" />
					<div className="text-label-2 font-medium">
						색이 섞일까 걱정이시죠? 저희는{" "}
						<span className="text-primary-strong font-semibold ">
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
							이염 방지 시트
						</span>
						로 세탁하니 걱정마세요!
					</div>
				</div>
<<<<<<< HEAD
				<div className="h-6"></div>
				<div className="grid grid-cols-2 grid-rows-2 gap-x-[20px] gap-y-[24px] mb-[24px]">
					<LaundryItem
						icon={<TShirtIcon className="w-[52px] h-[52px]" />}
						title="일반 세탁"
=======
				{/* Spacer */}
				<div className="h-[24px]" />
				{/* Spacer */}
				<div className="grid grid-cols-2 grid-rows-2 gap-x-[20px] gap-y-[24px] mb-[24px]">
					<LaundryItem
						icon={<TShirtIcon className="w-[52px] h-[52px]" />}
						title="일반 빨래"
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
						description="의류, 속옷, 양말 등"
						iconContainerStyle="mx-[27px]"
					/>
					<LaundryItem
						icon={<BedIcon className="w-[52px] h-[52px]" />}
<<<<<<< HEAD
						title="이불 세탁"
=======
						title="이불 빨래"
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
						description="극세사 겨울 이불까지!"
						iconContainerStyle="mx-[48px]"
					/>
					<LaundryItem
						icon={
<<<<<<< HEAD
							// <ShirtAndSheetsIcon className="w-[52px] h-[52px]" />
							<div className="relative">
								<TShirtIconSmall className="absolute bottom-[3.1px] right-[7px] w-[35.45px] h-[35.45px]" />
								<BedIconSmall className="relative w-[35.45px] h-[35.45px] top-[4px] left-[7px]" />
							</div>
						}
						title="일반 + 이불 세탁"
						description={`의류, 속옷, 양말, 이불 구분없이 한번에`}
						iconContainerStyle="mx-[48px]"
=======
							<div className="relative">
								<TShirtIconSmall className="absolute bottom-[4px] right-[7px] w-[35.45px] h-[35.45px]" />
								<BedIconSmall className="relative w-[35.45px] h-[35.45px] top-[4px] left-[7px]" />
							</div>
						}
						title="일반 + 이불 빨래"
						description={`의류, 속옷, 양말, 이불\n구분없이 한번에`}
						iconContainerStyle=""
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
					/>
					<LaundryItem
						icon={<ShoesIcon className="w-[52px] h-[52px]" />}
						title="신발 세탁"
						description="운동화"
						iconContainerStyle="mx-[48px]"
					/>
				</div>
<<<<<<< HEAD
				<div className="w-full h-14">
					<button className="w-full flex items-center justify-center bg-white p-4 rounded-xl">
						<NavigationIcon className="mr-2 w-5 h-6" />
=======
				<div className="w-[350px] h-[60px]">
					<button className="w-full flex items-center justify-center bg-white p-4 rounded-xl">
						<NavigationIcon className="mr-2 w-5 h-6" /> <br />
>>>>>>> 58859fb9558e1986de493197f11208773405cfac
						<span className="text-label-1-normal font-semibold">
							내 주위 이용 가능한 코인 세탁소 보기
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default MainView;
