"use client";

import { type ReactNode, useEffect, useRef } from "react";

/** Auto-scroll speed in pixels per second. */
const AUTO_SPEED = 56;
/** Time constant (ms) for how quickly a flick slows down. */
const INERTIA_DECAY_MS = 350;
/** Arrow key nudge, as an initial velocity in px/ms (about 420px of travel). */
const KEY_NUDGE = 1.2;
const MAX_FLICK = 4;

/**
 * Seamless looping carousel. The server passes two identical lists as children;
 * the track slides left by half its width and wraps. It scrolls itself, pauses
 * on hover or keyboard focus, and can be dragged in either direction (with a
 * flick) by mouse, touch, or pen. Arrow keys nudge it for keyboard users.
 * With reduced motion it falls back to a natively scrollable row.
 */
export function ReviewsMarquee({ children }: { children: ReactNode }) {
	const viewportRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const viewport = viewportRef.current;
		const track = trackRef.current;
		if (!viewport || !track) return;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		let x = 0;
		let half = 0;
		let inertia = 0;
		let hovering = false;
		let focused = false;
		let dragging = false;
		let visible = true;
		let frame = 0;
		let lastFrame = 0;

		let activePointer: number | null = null;
		let startX = 0;
		let startPosition = 0;
		let lastMoveX = 0;
		let lastMoveTime = 0;
		let dragVelocity = 0;

		// Keep x inside (-half, 0] so the second list always replaces the first.
		const wrap = (value: number) =>
			half > 0 ? ((value % half) - half) % half : value;

		const render = () => {
			track.style.transform = `translate3d(${x}px, 0, 0)`;
		};

		const measure = () => {
			half = track.scrollWidth / 2;
			x = wrap(x);
			render();
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			const elapsed = Math.min(now - lastFrame, 50);
			lastFrame = now;
			if (dragging) return;

			const auto = hovering || focused ? 0 : AUTO_SPEED / 1000;
			if (auto === 0 && inertia === 0) return;

			x = wrap(x - auto * elapsed + inertia * elapsed);
			inertia *= Math.exp(-elapsed / INERTIA_DECAY_MS);
			if (Math.abs(inertia) < 0.005) inertia = 0;
			render();
		};

		const sync = () => {
			const shouldRun = visible && !reducedMotion.matches;
			if (shouldRun && frame === 0) {
				lastFrame = performance.now();
				frame = requestAnimationFrame(tick);
			} else if (!shouldRun && frame !== 0) {
				cancelAnimationFrame(frame);
				frame = 0;
			}
			if (reducedMotion.matches) {
				x = 0;
				inertia = 0;
				track.style.transform = "";
			}
		};

		const onPointerDown = (event: PointerEvent) => {
			if (reducedMotion.matches || activePointer !== null) return;
			if (event.pointerType === "mouse" && event.button !== 0) return;
			activePointer = event.pointerId;
			dragging = true;
			inertia = 0;
			dragVelocity = 0;
			startX = lastMoveX = event.clientX;
			startPosition = x;
			lastMoveTime = event.timeStamp;
			viewport.dataset.dragging = "true";
			viewport.setPointerCapture(event.pointerId);
		};

		const onPointerMove = (event: PointerEvent) => {
			if (event.pointerId !== activePointer) return;
			x = wrap(startPosition + event.clientX - startX);
			render();

			const elapsed = event.timeStamp - lastMoveTime;
			if (elapsed > 0) {
				const sample = (event.clientX - lastMoveX) / elapsed;
				dragVelocity = dragVelocity * 0.7 + sample * 0.3;
			}
			lastMoveX = event.clientX;
			lastMoveTime = event.timeStamp;
		};

		const onPointerEnd = (event: PointerEvent) => {
			if (event.pointerId !== activePointer) return;
			activePointer = null;
			dragging = false;
			delete viewport.dataset.dragging;
			if (viewport.hasPointerCapture(event.pointerId)) {
				viewport.releasePointerCapture(event.pointerId);
			}
			// A pause before letting go means no flick.
			const stale = event.timeStamp - lastMoveTime > 80;
			const flick = stale ? 0 : dragVelocity;
			inertia = Math.max(-MAX_FLICK, Math.min(MAX_FLICK, flick));
		};

		const onPointerEnter = (event: PointerEvent) => {
			if (event.pointerType === "mouse") hovering = true;
		};
		const onPointerLeave = (event: PointerEvent) => {
			if (event.pointerType === "mouse") hovering = false;
		};

		// Only keyboard focus pauses. A mouse click focuses the box too, and
		// that must not leave the carousel stuck after the pointer moves away.
		const onFocusIn = () => {
			focused = viewport.matches(":focus-visible");
		};
		const onFocusOut = () => {
			focused = false;
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (reducedMotion.matches) return;
			if (event.key === "ArrowLeft") {
				inertia = KEY_NUDGE;
			} else if (event.key === "ArrowRight") {
				inertia = -KEY_NUDGE;
			} else {
				return;
			}
			event.preventDefault();
		};

		const resizeObserver = new ResizeObserver(measure);
		resizeObserver.observe(track);

		const intersectionObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			sync();
		});
		intersectionObserver.observe(viewport);

		viewport.addEventListener("pointerdown", onPointerDown);
		viewport.addEventListener("pointermove", onPointerMove);
		viewport.addEventListener("pointerup", onPointerEnd);
		viewport.addEventListener("pointercancel", onPointerEnd);
		viewport.addEventListener("pointerenter", onPointerEnter);
		viewport.addEventListener("pointerleave", onPointerLeave);
		viewport.addEventListener("focusin", onFocusIn);
		viewport.addEventListener("focusout", onFocusOut);
		viewport.addEventListener("keydown", onKeyDown);
		reducedMotion.addEventListener("change", sync);

		measure();
		sync();

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			viewport.removeEventListener("pointerdown", onPointerDown);
			viewport.removeEventListener("pointermove", onPointerMove);
			viewport.removeEventListener("pointerup", onPointerEnd);
			viewport.removeEventListener("pointercancel", onPointerEnd);
			viewport.removeEventListener("pointerenter", onPointerEnter);
			viewport.removeEventListener("pointerleave", onPointerLeave);
			viewport.removeEventListener("focusin", onFocusIn);
			viewport.removeEventListener("focusout", onFocusOut);
			viewport.removeEventListener("keydown", onKeyDown);
			reducedMotion.removeEventListener("change", sync);
		};
	}, []);

	return (
		<section
			ref={viewportRef}
			aria-label="Customer reviews"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard focus pauses the scrolling, and the arrow keys move it.
			tabIndex={0}
			className="reviews-viewport relative -mx-6 mt-12 overflow-hidden sm:mx-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy motion-reduce:overflow-x-auto"
		>
			<div ref={trackRef} className="flex w-max will-change-transform">
				{children}
			</div>
		</section>
	);
}
