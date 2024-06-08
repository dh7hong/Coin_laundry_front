import React from "react";

const InputStatic = ({ value }) => {
	return (
		<div>
			<div className="flex items-center border rounded-[10px] w-[342px] h-[48px] px-[16px] py-[12px] bg-[#F8F8FA] border-line-normal">
				<input
					type="text"
					value={value}
					className="bg-[#F8F8FA] text-label-normal outline-none w-full"
					disabled
				/>
			</div>
		</div>
	);
};

export default InputStatic;