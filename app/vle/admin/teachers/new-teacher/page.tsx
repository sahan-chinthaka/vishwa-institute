"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import NewTeacherForm from "./form";

export interface SearchItem {
	id: string;
	imageUrl: string;
	firstName: string;
	lastName: string;
}

function AdminNewTeacherPage() {
	const [email, setEmail] = useState("");
	const [searchList, setSearchList] = useState<SearchItem[] | null>(null);
	const [searchDisabled, setSearchDisabled] = useState(false);
	const [selectedUser, setSelectedUser] = useState<SearchItem | null>(null);

	function teacherSearch(e: FormData) {
		const email = e.get("email") as string;
		setSearchList(null);
		setSelectedUser(null);
		setSearchDisabled(true);

		axios
			.get(
				"/api/vle/admin/teachers/find-clerk?email=" + encodeURIComponent(email),
			)
			.then((res) => {
				if (res.data.done) {
					setSearchList(res.data.users);
				}
			})
			.finally(() => setSearchDisabled(false));
	}

	return (
		<div className="p-5">
			<div className="max-w-[450px]">
				<form action={teacherSearch}>
					<label
						htmlFor="email"
						className="block text-sm/6 font-medium text-gray-900"
					>
						Email address
					</label>
					<div className="mt-2 flex">
						<input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoComplete="off"
							className="mr-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
						<Button type="submit" disabled={searchDisabled}>
							Search
						</Button>
					</div>
				</form>
			</div>
			{searchList && (
				<div className="p-2">
					{searchList.map((i) => (
						<div key={i.id} className="my-2 flex items-center gap-2">
							<img src={i.imageUrl} className="w-10" />
							<p>
								{i.firstName} {i.lastName}
							</p>
							<Button
								onClick={() => {
									setSelectedUser(i);
									setSearchList(null);
								}}
								className="ml-auto"
							>
								Select this user
							</Button>
						</div>
					))}
					{searchList.length == 0 && <div>No users found</div>}
				</div>
			)}
			{selectedUser && <NewTeacherForm data={selectedUser} />}
		</div>
	);
}

export default AdminNewTeacherPage;
