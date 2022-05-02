import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticProps() {
	const prisma = new PrismaClient();
	const result = await prisma.anime.findMany();

	return {
		props: { result },
	};
}

interface Anime {
	id: string;
	name: string;
	description: string;
	link: string;
	image: string;
	count: number;
}

type Props = {
	result: Anime[];
};

const Result: React.FC<Props> = props => {
	return (
		<div className='h-screen w-screen sm:w-5/6 mx-auto flex flex-col justify-evenly items-center relative'>
			<Head>
				<title>Result</title>
			</Head>

			<div className='absolute top-8 right-4 border rounded-2xl bg-zinc-200 text-slate-600 p-2'>
				<Link href='/'>back</Link>
			</div>

			<div className='p-8 italic text-3xl'>Result</div>

			<div className='w-5/6 sm:w-5/6'>
				{props.result.map((anime: Anime) => (
					<div key={anime.id} className='flex m-4 items-center md:m-8'>
						<div className='flex-initial w-20 text-base sm:text-xl mr-1 sm:mr-8'>
							{anime.name}
						</div>

						<div className='relative w-24 h-32 sm:w-32 sm:h-40 flex-none'>
							<Image
								src={anime.image}
								alt={anime.name}
								layout='fill'
								objectFit='cover'
								quality={100}
								priority
							/>
						</div>

						<div className='flex-1 text-right text-base sm:text-xl'>
							Score : {anime.count}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Result;
