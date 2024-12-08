import { Button } from "@headlessui/react";
import { ReactNode } from "react";

function PrimaryButton({ children }: { children: ReactNode }) {
	return (
		<Button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm/6 text-foreground shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-400">
			{children}
		</Button>
	);
}

export default PrimaryButton;
