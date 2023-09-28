import Image from "next/image";
import Footer from "../../app/client/footer";

const jobs = [
	{
		name: "Carta",
		date: "May-Aug 2023",
		location: "Kitchener, Waterloo",
		logo: "/carta.png",
		team: "Finance Automation",
		tech: "Python, Typescript, Django, React, Kafka",
		description: [
			"Refactored models for scalility and wrote corresponding event architecture",
			"Led an E2E project increasing customer tax information collection by 37%",
			"Squashed bugs, wrote tests, tooling, and docs for my team as well as others",
		],
	},
	{
		name: "Replicant",
		date: "Sep-Dec 2022",
		location: "San Francisco, California",
		logo: "/replicant.png",
		team: "Integrations",
		tech: "TypeScript, React, PostGreSql, GCP, Kubernetes",
		description: [
			"Built a dynamic routing API to handle more than 31,000 customer calls daily",
			"Composed user interfaces for SBCs",
			"Wrote a service to remind people that their api keys were expiring",
		],
	},
	{
		name: "Trend Micro",
		date: "Jan-Apr 2022",
		location: "Ottawa, Canada",
		logo: "/trendmicro.png",
		team: "Encore",
		tech: "Golang, AWS, Typescript, React, Redux, Python",
		description: [
			"Made free trials possible for all services for all customers",
			"Redid the account deletion process to ensure no customer was falsely charged",
			"Orchestrated DLQs to persist errors in S3 after failing to drive events to EventBridge",
			"Reviewed code, wrote a lot of unit tests and made presentations about features & tech",
		],
	},
	{
		name: "myKaarma",
		date: "May-Aug 2021",
		location: "Kitchener, Canada",
		logo: "/mykaarma.png",
		team: "Reporting",
		tech: "Java, Spring Boot, AWS, Javascript, React, MongoDB, MySQL",
		description: [
			"Constructed an API to clean up a MongoDB and keep the data cozy in S3 (on cron)",
			"Made some UI components/slight optimizations with React for dealerships",
			"Created a feature to ping everyone if there's a big failure",
		],
	},
	{
		name: "Ascend Canada",
		date: "Jan-Apr 2020",
		location: "Toronto, Canada",
		logo: "/ascend.png",
		team: "",
		tech: "HTML/CSS, Javascript, WordPress",
		description: [
			"First 'SWE' internship",
			"Put together some HTML/Js to make a chart and a footer",
		],
	},
];

export default function Page() {
	return (
		<div className="grid grid-cols-1">
			<div className="m-0 sm:m-3 md:m-8" />
			<div className="flex justify-center">
				<div className="w-fit">
					<div className="mb-9 flex flex-row justify-start gap-5">
						<div className="flex flex-col justify-center">
							<div className="w-fit pt-1 pb-2 px-2 rounded-lg bg-[#8A817C] shadow-lg">
								<p className="w-fit text-5xl text-white">
									{"history"}
								</p>
							</div>
						</div>
						<div className="relative w-24 h-24 md:w-32 md:h-32 ml-2 flex justify-center rounded-full">
							<Image
								src="/rocket.png"
								alt="Picture of the something nice"
								fill
								style={{
									objectFit: "contain",
									borderRadius: ".5rem",
								}}
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 w-fit">
						{jobs.map((job) => (
							<div key={job.name} className="mx-1">
								<div className="flex flex-row justify-start">
									<div className="m-1 mr-2">
										<div className="relative w-10 h-10 lg:w-12 lg:h-12 md:flex md:justify-center rounded-full">
											<Image
												src={job.logo}
												alt="Picture of the something nice"
												fill
												style={{
													objectFit: "cover",
													borderRadius: ".5rem",
												}}
											/>
										</div>
									</div>
									<div className="grid grid-row-2">
										<div>
											<h1 className="text-xl">
												{job.name}
											</h1>
										</div>
										<div>
											<h1 className="text-l">{`${job.date} | ${job.location}`}</h1>
										</div>
									</div>
								</div>
								<div className="mt-1 ml-1">
									<p className="my-1 text-stone-800">
										{job.tech}
									</p>
									<ul className="text-md list-disc ml-5">
										{job.description.map((point) => (
											<>
												<li>{point}</li>
											</>
										))}
									</ul>
								</div>
								<div className="m-8" />
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
