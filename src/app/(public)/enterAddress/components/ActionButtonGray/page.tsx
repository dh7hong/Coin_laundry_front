"use client";

import React, { FC } from "react";

type ActionButtonProps = {
	label: string;
	onClick: () => void;
	className?: string;
};

const ActionButtonGray: FC<ActionButtonProps> = ({
	label,
	onClick,
	className,
}) => {
	return (
		<div>
			<div className="w-full max-w-[430px] h-[1px] bg-line-normal shadow-elevation-shadow-emphasize"></div>
		<div className={`w-full max-w-[430px] py-[24px] px-[24px] ${className}`}>
			<button
				className="w-full h-[52px] rounded-md flex justify-center items-center transition-colors duration-300 text-static-white text-body-1-normal font-semibold bg-label-assistive hover:bg-primary-strong active:bg-primary-heavy"
				onClick={onClick}
			>
				{label}
			</button>
		</div>
		</div>
	);
};

export default ActionButtonGray;
