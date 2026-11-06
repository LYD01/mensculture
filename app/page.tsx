import { SitePlaceholder } from "@components";
import { buildTelHref, formatDisplayDate } from "@utils";

export default function Home() {
	const sampleDate = formatDisplayDate(new Date("2026-06-01T12:00:00.000Z"));

	return (
		<div>
			<main className="flex min-h-full flex-col items-center justify-center gap-2 p-8">
				<SitePlaceholder
					message={`Mens Culture — page shell (sample date: ${sampleDate})`}
				/>
				<a className="text-sm underline" href={buildTelHref("02 1234 5678")}>
					Call example
				</a>
			</main>
		</div>
	);
}
