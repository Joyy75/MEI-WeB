/** @format */

import { Loader2 } from "lucide-react";

export const Button = ({ label, disabled, type, name }) => {
	return (
		<button
			type={type}
			className="  sub-card mt-5 sm:mt-4  duration-500 sm:text-lg  text-sm  w-full text-center active:scale-95 p-2 rounded-full hover:opacity-85 active:ring-2 active:ring-[var(--card)] "
			name={name}>
			{disabled ? (
				<Loader2 className=" h-4 w-full mx-auto animate-spin" />
			) : (
				<>{label}</>
			)}
		</button>
	);
};
