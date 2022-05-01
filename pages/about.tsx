import Head from 'next/head';
import Link from 'next/link';

const AboutPage = () => {
	return (
		<div className='h-screen w-screen sm:w-5/6 mx-auto flex flex-col justify-center items-center relative'>
			<Head>
				<title>About</title>
			</Head>

			<div className='absolute top-4 right-4 border rounded-2xl bg-zinc-200 text-slate-600 p-2'>
				<Link href='/'>back</Link>
			</div>

			<h2 className='text-2xl p-4'>About</h2>
			<p className='max-w-xl'>My name is kok-s0s</p>
		</div>
	);
};

export default AboutPage;
