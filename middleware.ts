import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isTeacherRoute = createRouteMatcher([
	"/vle/teacher(.*)",
	"/api/vle/teacher(.*)",
]);

const isAdminRoute = createRouteMatcher([
	"/vle/admin(.*)",
	"/api/vle/admin(.*)",
]);

const isStudentRoute = createRouteMatcher([
	"/vle/student(.*)",
	"/api/vle/student(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
	const { userId, sessionClaims, redirectToSignIn } = await auth();
	const url = req.nextUrl.clone();
	url.pathname = "/";

	if (isAdminRoute(req)) {
		if (!userId) return redirectToSignIn();
		if (sessionClaims.metadata.admin != "true") {
			return NextResponse.redirect(url);
		}
	} else if (isTeacherRoute(req)) {
		if (!userId) return redirectToSignIn();
		if (sessionClaims.metadata.teacher != "true") {
			return NextResponse.redirect(url);
		}
	} else if (isStudentRoute(req)) {
		if (!userId) return redirectToSignIn();
		if (sessionClaims.metadata.student != "true") {
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
