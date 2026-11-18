"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const objects = [
	{ label: "CODE", cls: "orb orb-code", symbol: "</>" },
	{ label: "PLAY", cls: "orb orb-play", symbol: "★" },
	{ label: "MAKE", cls: "orb orb-make", symbol: "✦" },
	{ label: "ASK", cls: "orb orb-ask", symbol: "?" },
];

export default function CinematicSite() {
	const root = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
			lenis.on("scroll", ScrollTrigger.update);
			const updateLenis = (time: number) => lenis.raf(time * 1000);
			gsap.ticker.add(updateLenis);
			gsap.ticker.lagSmoothing(0);

			const ctx = gsap.context(() => {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: ".hero",
							start: "top top",
							end: "+=150%",
							scrub: 1,
							pin: true,
						},
					})
					.to(
						".hero-title",
						{ y: -150, scale: 1.18, rotate: -2, opacity: 0, stagger: 0.03 },
						0
					)
					.to(".hero-art", { scale: 1.7, y: 40, rotate: 3 }, 0)
					.to(".orb-code", { x: -420, y: -220, rotate: -240, scale: 0.55 }, 0)
					.to(".orb-play", { x: 460, y: -180, rotate: 190, scale: 1.4 }, 0)
					.to(".orb-make", { x: 360, y: 320, rotate: 280, scale: 0.7 }, 0)
					.to(".orb-ask", { x: -380, y: 280, rotate: -160, scale: 1.8 }, 0)
					.to(".hero-scroll", { y: 40, opacity: 0 }, 0);

				gsap
					.timeline({
						scrollTrigger: {
							trigger: ".discover",
							start: "top top",
							end: "+=190%",
							scrub: 1,
							pin: true,
						},
					})
					.set(".discover", { backgroundColor: "#2563EB" })
					.from(".discover-kicker", { y: 70, opacity: 0 }, 0)
					.from(
						".discover-title .word",
						{ y: 180, rotate: 8, opacity: 0, stagger: 0.14, scale: 0.75 },
						0.08
					)
					.to(".discover-orb", { scale: 15, rotate: 90, opacity: 0.95 }, 0.25)
					.from(".discover-copy", { y: 80, opacity: 0 }, 0.5)
					.to(".discover-title", { scale: 0.78, y: -80, color: "#111827" }, 0.72);

				gsap
					.timeline({
						scrollTrigger: {
							trigger: ".explore",
							start: "top bottom",
							once: true,
						},
					})
					.to(".explore", { backgroundColor: "#7C3AED" }, 0)
					.from(".explore-title", { x: -180, opacity: 0, rotate: -5 }, 0)
					.from(".game-object", { scale: 0.15, rotate: -180, opacity: 0 }, 0.12)
					.to(".game-object", { scale: 1.25, rotate: 20, x: 180 }, 0.5)
					.from(".game-label", { opacity: 0, y: 30, stagger: 0.12 }, 0.42)
					.to(".explore-title", { x: -300, opacity: 0.12 }, 0.82)
					.to(".game-object", { scale: 0.25, x: 520, y: -300, rotate: 180 }, 0.82)
					.timeScale(0.5);

				gsap
					.timeline({
						scrollTrigger: {
							trigger: ".interactive",
							start: "top bottom",
							once: true,
						},
					})
					.from(".interactive-heading", { y: 100, rotate: 4, opacity: 0 }, 0)
					.from(
						".memory-card",
						{ y: 300, rotate: 18, opacity: 0, stagger: 0.13 },
						0.18
					)
					.to(".memory-card:nth-child(1)", { y: -35, rotate: -7, scale: 1.08 }, 0.55)
					.to(".memory-card:nth-child(2)", { y: 35, rotate: 7, scale: 1.08 }, 0.65)
					.to(".memory-card:nth-child(3)", { y: -15, rotate: -3, scale: 1.08 }, 0.75)
					.timeScale(0.5);

				gsap
					.timeline({
						scrollTrigger: {
							trigger: ".wow",
							start: "top bottom",
							once: true,
						},
					})
					.to(".wow-circle", { scale: 28 }, 0.12)
					.to(".wow-copy", { y: -80, opacity: 0, scale: 0.75 }, 0.35)
					.from(".wow-reveal", { opacity: 0, scale: 0.65, y: 120 }, 0.58)
					.to(".wow-circle", { opacity: 0 }, 0.88)
					.timeScale(0.5);

				gsap
					.timeline({
						scrollTrigger: {
							trigger: ".finale",
							start: "top top",
							end: "+=170%",
							scrub: 1,
							pin: true,
						},
					})
					.from(".finale-mark", { scale: 0, rotate: -270 }, 0)
					.to(".finale-mark", { scale: 1.5, rotate: 0 }, 0.35)
					.from(
						".finale-title .letter",
						{ y: 150, opacity: 0, rotate: 12, stagger: 0.018 },
						0.2
					)
					.from(".finale-cta", { y: 70, opacity: 0, scale: 0.85 }, 0.64)
					.to(".orbit-ring", { rotate: 230, scale: 1.35 }, 0);

				gsap.to(".progress", {
					scaleX: 1,
					ease: "none",
					scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: true }
				});
			}, root);

			return () => {
				ctx.revert();
				lenis.destroy();
				gsap.ticker.remove(updateLenis);
			};
		}

		const ctx = gsap.context(() => {}, root);
		return () => ctx.revert();
	}, []);

	const letters = "Make curiosity real.".split("");

	return (
		<main ref={root}>
			<div className="progress" aria-hidden="true" />
			<header className="topbar">
				<a
					className="brand"
					href="#top"
					aria-label="Melvin and co-founders, back to the beginning"
				>
					<span className="brand-mark">M+</span>
					<span>Melvin &amp; Co.</span>
				</a>
				<a className="idea-link" href="#idea-lab">
					Share an idea <b>↗</b>
				</a>
			</header>

			<section className="hero" id="top" aria-labelledby="hero-title">
				<p className="hero-kicker">
					<span>✦</span> A world built together
				</p>
				<h1 id="hero-title" className="hero-title">
					<span>Big ideas.</span>
					<span>Brilliant play.</span>
				</h1>
				<div className="hero-art">
					<img
						src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/co-founders.png`}
						alt="Illustration of Melvin and a co-founder surrounded by playful ideas"
					/>
				</div>
				{objects.map((object) => (
					<div
						className={object.cls}
						key={object.label}
						aria-label={object.label}
					>
						<span>{object.symbol}</span>
						<small>{object.label}</small>
					</div>
				))}
				<div className="hero-scroll">
					<span>Scroll to begin</span>
					<i>↓</i>
				</div>
			</section>

			<section className="discover stage" aria-labelledby="discover-title">
				<div className="discover-orb" aria-hidden="true">
					<span>?</span>
				</div>
				<p className="discover-kicker">
					STAGE 01 <span /> DISCOVER
				</p>
				<h2 id="discover-title" className="discover-title">
					<span className="word">Curiosity</span>
					<span className="word">is our</span>
					<span className="word">superpower.</span>
				</h2>
				<p className="discover-copy">
					Ask the strange question. Test the impossible idea. Build something
					nobody expected.
				</p>
			</section>

			<section className="explore stage" aria-labelledby="explore-title">
				<p className="stage-number">02 / EXPLORE</p>
				<h2 id="explore-title" className="explore-title">
					Enter the
					<br />
					idea lab.
				</h2>
				<div
					className="game-object"
					aria-label="An interactive idea engine"
				>
					<span>IDEA</span>
					<b>+</b>
					<span>ENGINE</span>
				</div>
				<div className="game-label label-one">
					<b>01</b>
					<span>Imagine</span>
					<br />
					<span>freely</span>
				</div>
				<div className="game-label label-two">
					<b>02</b>
					<span>Test every</span>
					<br />
					<span>version</span>
				</div>
				<div className="game-label label-three">
					<b>03</b>
					<span>Share it</span>
					<br />
					<span>bravely</span>
				</div>
			</section>

			<section className="interactive stage" aria-labelledby="interactive-title">
				<p className="stage-number dark-number">03 / PLAY</p>
				<h2 id="interactive-title" className="interactive-heading">
					Pick a <em>power.</em>
				</h2>
				<div className="card-row">
					<article
						className="memory-card card-yellow"
						tabIndex={0}
					>
						<span>01</span>
						<div>◎</div>
						<h3>Notice</h3>
						<p>Look closer. What did everyone else miss?</p>
					</article>
					<article
						className="memory-card card-purple"
						tabIndex={0}
					>
						<span>02</span>
						<div>⌁</div>
						<h3>Experiment</h3>
						<p>Try it badly. Try it again. Try one wild twist.</p>
					</article>
					<article
						className="memory-card card-coral"
						tabIndex={0}
					>
						<span>03</span>
						<div>↗</div>
						<h3>Invent</h3>
						<p>Turn “what if” into something you can share.</p>
					</article>
				</div>
			</section>

			<section className="wow stage" aria-label="A dramatic transition into the idea lab">
				<div className="wow-circle" aria-hidden="true" />
				<div className="wow-copy">
					<p>Something brilliant is</p>
					<h2>taking shape.</h2>
				</div>
				<div className="wow-reveal">
					<span>READY?</span>
					<strong>4</strong>
					<i>3</i>
					<b>2</b>
					<em>1</em>
				</div>
			</section>

			<section
				className="finale stage"
				id="idea-lab"
				aria-labelledby="finale-title"
			>
				<div className="orbit-ring" aria-hidden="true" />
				<div className="finale-mark" aria-hidden="true">
					M<span>+</span>
				</div>
				<h2 id="finale-title" className="finale-title">
					{letters.map((letter, index) => (
						<span className="letter" key={`${letter}-${index}`}>
							{letter === " " ? "\u00A0" : letter}
						</span>
					))}
				</h2>
				<p className="finale-sub">
					Dream up a game, solve a strange problem, or invent something totally
					new.
				</p>
				<a className="finale-cta" href="mailto:collegebaddest@gmail.com?subject=A%20new%20idea">
					<span>Share your idea</span>
					<b>↗</b>
				</a>
			</section>

			<button
				className="sound-toggle"
				type="button"
				aria-label="Toggle ambient motion"
				onClick={(event) =>
					event.currentTarget.classList.toggle("is-paused")
				}
			>
				II
			</button>
		</main>
	);
}
