import Image from "next/image";
import InsLogo from "@/assets/only_logo.png";
import { PiUserCircleLight } from "react-icons/pi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function NavBar() {
	return (
		<header className="fixed inset-x-0 top-0">
			<div className="m-2 mx-5 flex items-center rounded">
				<div className="flex h-12 items-center justify-center overflow-hidden">
					<Image
						src={InsLogo}
						alt="Logo of Vishwa Higher Education Institute"
						width={100}
					/>
				</div>
				<nav>
					<ul className="ml-5 flex gap-5">
						<li>
							<Link className="hover:text-primary" href="/">
								Home
							</Link>
						</li>
						<li>
							<Link className="hover:text-primary" href="#">
								About
							</Link>
						</li>
						<li>
							<Link className="hover:text-primary" href="#">
								Contact Us
							</Link>
						</li>
					</ul>
				</nav>
				<div className="ml-auto">
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header>
	);
}

export default NavBar;
