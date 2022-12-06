import {HeadTag} from '../components/head-tag';

export default function Thanks() {
  return (
    <>
      <HeadTag title="Page Not Found" />

      <div className="space-y-4 py-10">
        <h1 className="text-5xl font-bold">Page Not Found</h1>
        <p className="opacity-80">
          It seems that the page you are looking for cannot be found, or even never existed in this
          realm. Hmm, let's get back on track!
        </p>
      </div>
    </>
  );
}
