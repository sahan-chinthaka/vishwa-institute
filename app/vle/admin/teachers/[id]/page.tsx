"use client";

import { TeacherType } from "@/lib/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TeacherEditForm from "./form";

function AdminSingleteacherPage() {
	const { id } = useParams();
	const [teacher, setTeacher] = useState<TeacherType | undefined>();

	useEffect(() => {
		axios.get(`/api/vle/admin/teachers/${id}`).then((res) => {
			if (res.data.done) {
				setTeacher(res.data.teacher);
			} else alert(res.data.error);
		});
	}, []);

	return (
		<div className="p-5">
			{teacher ? <TeacherEditForm teacher={teacher} /> : <div>Loading...</div>}
		</div>
	);
}

export default AdminSingleteacherPage;
