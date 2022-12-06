import Head from 'next/head';

export function HeadTag(props: {title?: string}) {
  const name = 'Suluh Sulistiawan';
  const title = props.title ? `${props.title} - ${name}` : name;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </Head>
  );
}
