import prisma from '../prisma/db'
import Head from 'next/head'

export default function Home({ universities }) {
	return (
		<div className='p-4'>
			<Head>
				<title>University Catalog</title>
				<meta name="description" content="Catalog of all Universities around the world" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className='border-4 border-sky-800'>
				<header className='grid grid-cols-6 p-2 gap-x-2 font-bold text-white bg-sky-800'>
					<div>Name</div>
					<div>State/Province</div>
					<div>Country</div>
					<div>Alpha-2-Code</div>
					<div>Domains</div>
					<div>Web Pages</div>
				</header>
				<main className='grid grid-cols-1'>
					{
						universities.map(university => {
							return (
								<UniversityDetails key={university.id} university={university} />
							)
						})
					}
				</main>
				<footer></footer>		
			</main>
		</div>
	)
}

function UniversityDetails( { university }) {
	return (
		<div className='grid grid-cols-6 gap-x-2 p-1 items-center border-b-2 last:border-b-0'>
			<div>{university.name}</div>
			<div>{university.state_province}</div>
			<div>{university.country}</div>
			<div>{university.alpha_two_code}</div>
			<div>
				{
					university.domains.map(domain => <div key={domain.id}>{domain.domain_name}</div>)
				}
			</div>
			<div>
				{
					university.websites.map(site => <a key={site.id} href={site.url} target='_blank' rel='noreferrer' className='block'>{site.url}</a>)
				}
			</div>
		</div>		
	);
}

export async function getStaticProps() {
	const universities = await prisma.university.findMany({
		include: {
			domains: {
				select: { id: true, domain_name: true }
			},
			websites: {
				select: { id: true, url: true }
			}
		},
		take: 20
	});

	console.log(universities);

	return {
		props: {
			universities
		}
	}
}
