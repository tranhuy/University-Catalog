import { useRouter } from 'next/router';

import prisma from '../prisma/db';

import Head from 'next/head';
import UniversityList from '../components/universityList';

export default function SubPage({ universities, total }) {
	const router = useRouter();

	if (router.isFallback) {
		return null;
	}

    return (
        <div className='p-4'>
			<Head>
				<title>University Catalog</title>
				<meta name="description" content="Catalog of all Universities around the world" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<UniversityList universities={universities} universityTotal={total} />
			</main>
		</div>
    )
}

export async function getStaticPaths() {
	const paths = new Array(20);

	for (let i = 0; i < paths.length; i++) {
		paths[i] = {
			params: { id: i === 0 ? [] : [i.toString()]}
		}
	}

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const pageOffset = params.id ? Number(params.id) : 0;

	const universities = await prisma.university.findMany({
		include: {
			domains: {
				select: { id: true, domain_name: true }
			},
			websites: {
				select: { id: true, url: true }
			}
		},
		orderBy: [
			{ country: 'asc' },
			{ name: 'asc' }
		],
        skip: pageOffset * 20,
		take: 20
	});

	const total = await prisma.university.count();
	
	return {
		props: {
			universities,
			total,
		}
	}
}