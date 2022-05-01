import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch('http://localhost:3000/api/result');
	const result = await res.json();
	return {
		props: { result },
	};
};

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

const Result: NextPage<Props> = props => {
	return (
		<div className='h-screen w-screen flex flex-col justify-evenly items-center relative'>
			<Head>
				<title>Result</title>
			</Head>

			<div className='p-8 italic text-3xl'>Result</div>

			<div className='w-1/2'>
				{props.result.map((anime: Anime) => (
					<div key={anime.id} className='flex m-8 items-center'>
						<div className='flex-initial w-20'>{anime.name}</div>

						<div className='relative w-32 h-40 flex-none'>
							<Image
								src={anime.image}
								alt={anime.name}
								layout='fill'
								objectFit='cover'
								quality={100}
								priority
							/>
						</div>

						<div className='flex-1 text-right'>Score : {anime.count}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Result;
