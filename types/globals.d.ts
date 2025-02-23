export {};

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			admin?: "true";
			teacher?: "true";
			student?: "true";
		};
	}
}
