import Image from "next/image";

import { REVIEWS, type Review } from "@constants";

import { ReviewsMarquee } from "./ReviewsMarquee";

const STAR_PATH =
	"M12 2.5l2.94 6.1 6.66.9-4.86 4.67 1.2 6.63L12 17.6l-5.94 3.2 1.2-6.63L2.4 9.5l6.66-.9L12 2.5z";

function getInitials(name: string): string {
	return name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join("")
		.toUpperCase();
}

function FiveStars() {
	return (
		<p className="flex items-center gap-0.5">
			<span className="sr-only">5 out of 5 stars</span>
			{Array.from({ length: 5 }, (_, index) => (
				<svg
					// biome-ignore lint/suspicious/noArrayIndexKey: five identical static stars
					key={index}
					viewBox="0 0 24 24"
					aria-hidden="true"
					className="h-5 w-5 fill-gold"
				>
					<path d={STAR_PATH} />
				</svg>
			))}
		</p>
	);
}

function ReviewCard({ review }: { review: Review }) {
	return (
		<li className="flex w-80 shrink-0 sm:w-96">
			<figure className="flex w-full flex-col border border-navy/10 border-t-4 border-t-sun bg-paper p-8">
				<FiveStars />
				<blockquote className="mt-4 flex-1 leading-relaxed">
					<p>{review.text}</p>
				</blockquote>
				<figcaption className="mt-6 flex items-center gap-3">
					{review.avatar ? (
						<Image
							src={review.avatar}
							alt=""
							width={40}
							height={40}
							className="h-10 w-10 shrink-0 rounded-full object-cover"
						/>
					) : (
						<span
							aria-hidden="true"
							className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-sun"
						>
							{getInitials(review.author)}
						</span>
					)}
					<span>
						<span className="block font-semibold">{review.author}</span>
						{review.shop ? (
							<span className="block text-sm text-stone">{review.shop}</span>
						) : null}
					</span>
				</figcaption>
			</figure>
		</li>
	);
}

export function ReviewsSection() {
	return (
		<section
			id="reviews"
			aria-labelledby="reviews-heading"
			className="scroll-mt-(--header-offset) bg-white text-navy"
		>
			<div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
				<p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
					Google reviews
				</p>
				<h2
					id="reviews-heading"
					className="text-center font-display text-4xl leading-tight sm:text-5xl"
				>
					What our clients say
				</h2>

				<ReviewsMarquee>
					<ul className="flex gap-6 pr-6">
						{REVIEWS.map((review) => (
							<ReviewCard key={review.author} review={review} />
						))}
					</ul>
					{/* Second copy makes the loop seamless. Hidden from assistive tech and when motion is reduced. */}
					<ul
						aria-hidden="true"
						className="flex gap-6 pr-6 motion-reduce:hidden"
					>
						{REVIEWS.map((review) => (
							<ReviewCard key={review.author} review={review} />
						))}
					</ul>
				</ReviewsMarquee>
			</div>
		</section>
	);
}
