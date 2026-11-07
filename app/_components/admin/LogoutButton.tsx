import { logoutAction } from "@/app/_actions/auth";

import { adminButtonIntents } from "./adminStyles";

export function LogoutButton() {
	return (
		<form action={logoutAction}>
			<button type="submit" className={adminButtonIntents.neutral}>
				Log out
			</button>
		</form>
	);
}
