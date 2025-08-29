import Image from "next/image";
import { GlowingEffect } from "@/components/glowing-effect";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export type VideoAspect = "16:9" | "9:16" | "1:1";

export type TestimonialItem = {
	name: string;
	title: string;
	avatar: string;
	comment?: string;
	imageSrc?: string; // optional image evidence
	videoSrc?: string; // optional video evidence (mp4 or YouTube URL)
	videoAspect?: VideoAspect; // optional per-item aspect ratio for video
};

export type TestimonialsProps = {
	id?: string;
	title?: string;
	subtitle?: string;
	layout?: "auto" | "stacked" | "sideBySide";
	mediaFirst?: boolean; // for sideBySide: put media column first
	defaultVideoAspect?: VideoAspect; // default if item not specified
};

const testimonials: TestimonialItem[] = [
	{
		name: "Trần Bá Hộ",
		title: "Teacher",
		avatar: "/testimonials/thayho.jpg",
		comment:
			"Even if it is just a small project, give it your very best. I believe that with such dedication, success will surely have a place for you."
	},
	{
		name: "Võ Quang Vinh",
		title: "Friend",
		avatar: "/testimonials/vinh.png",
		comment:
			"You are truly talented and hardworking. I’ve always considered you a special friend, different from the rest. Thank you for being there in my difficult times. I believe you will succeed—keep pushing forward!",
	},
	{
		name: "Thạch Nguyễn Hữu Trí",
		title: "Friend",
		avatar: "/testimonials/33.webp",
		comment:
			"Let’s keep trying our best. You and I share the same dream, that one day we will have a home and a car in this city.",
	},
];

function aspectClass(aspect: VideoAspect) {
	switch (aspect) {
		case "16:9":
			return "aspect-video";
		case "9:16":
			return "aspect-[9/16]";
		case "1:1":
			return "aspect-square";
		default:
			return "aspect-video";
	}
}

function MediaBlock({
	imageSrc,
	videoSrc,
	videoAspect,
}: {
	imageSrc?: string;
	videoSrc?: string;
	videoAspect: VideoAspect;
}) {
	if (!imageSrc && !videoSrc) return null;

	const wrapperAspect = aspectClass(videoAspect);

	return (
		<div className="space-y-3">
			{videoSrc && (
				<div className={cn("overflow-hidden rounded-lg border border-zinc-800", wrapperAspect)}>
					<video controls className="h-full w-full object-cover">
						<source src={videoSrc} />
					</video>
				</div>
			)}

			{imageSrc && (
				<div className="overflow-hidden rounded-lg border border-zinc-800">
					<Image
						src={imageSrc}
						alt="testimonial image"
						width={800}
						height={450}
						className="h-48 w-full object-cover"
					/>
				</div>
			)}
		</div>
	);
}

export function Testimonials({
	id = "testimonials",
	title = "Testimonials",
	subtitle = "What clients and peers say",
	layout = "auto",
	mediaFirst = true,
	defaultVideoAspect = "16:9",
}: TestimonialsProps) {
	return (
		<section id={id} className="relative py-32">
			<div className="absolute inset-0 z-0">
				<div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				<div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
			</div>

			<div className="relative z-10 container">
				<SectionHeading title={title} subtitle={subtitle} />

				<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{testimonials.map((t, idx) => {
						const hasMedia = !!(t.imageSrc || t.videoSrc);
						const itemVideoAspect = (t.videoSrc ? (t as any).videoAspect : undefined) ?? defaultVideoAspect;
						const isInlineForVideo = t.videoSrc
							? itemVideoAspect === "1:1" || itemVideoAspect === "9:16"
							: false;
						const useSideBySide = t.videoSrc
							? isInlineForVideo
							: layout === "sideBySide" || (layout === "auto" && hasMedia);

						return (
							<div
								key={`${t.name}-${idx}`}
								className={cn(
									"relative h-full rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-6 backdrop-blur-sm",
									testimonials.length === 1 && "col-start-2",
								)}
							>
								<GlowingEffect
									disabled={false}
									proximity={50}
									spread={30}
									borderWidth={2}
									movementDuration={1.5}
								/>

								{useSideBySide ? (
									<div
										className={cn(
											"grid gap-6 md:grid-cols-2",
											!mediaFirst && "md:[&>*:first-child]:order-2",
										)}
									>
										{/* Media */}
										<div>
											<MediaBlock
												imageSrc={t.imageSrc}
												videoSrc={t.videoSrc}
												videoAspect={itemVideoAspect}
											/>
										</div>

										{/* Text */}
										<div className="min-w-0">
											<div className="flex items-center gap-4">
												<Image
													src={t.avatar}
													alt={t.name}
													width={48}
													height={48}
													className="h-12 w-12 rounded-full object-cover"
												/>
												<div className="min-w-0">
													<div className="font-semibold">{t.name}</div>
													<div className="truncate text-sm text-zinc-500">{t.title}</div>
												</div>
											</div>
											{t.comment && <p className="mt-4 text-zinc-300">{t.comment}</p>}
										</div>
									</div>
								) : (
									<div>
										{/* Header */}
										<div className="flex items-center gap-4">
											<Image
												src={t.avatar}
												alt={t.name}
												width={48}
												height={48}
												className="h-12 w-12 rounded-full object-cover"
											/>
											<div className="min-w-0">
												<div className="font-semibold">{t.name}</div>
												<div className="truncate text-sm text-zinc-500">{t.title}</div>
											</div>
										</div>

										{t.comment && <p className="mt-4 text-zinc-300">{t.comment}</p>}

										<div className="mt-6">
											<MediaBlock
												imageSrc={t.imageSrc}
												videoSrc={t.videoSrc}
												videoAspect={itemVideoAspect}
											/>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
