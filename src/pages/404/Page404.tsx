import { Link } from "react-router-dom";

export function Page404() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center w-full h-full p-4">
      <h1 className="text-6xl font-bold text-center text-slate-800 ">
        Oops, we don&apos;t know about this one.
      </h1>
      <p className="mt-4 text-center text-xl leading-relaxed text-slate-800">
        The page you&apos;re looking for doesn&apos;t exist. But hey, you can always go back{" "}
        <Link
          to="/"
          className="py-1 px-2 rounded-sm bg-slate-900 text-slate-500 hover:bg-slate-800 transition-colors duration-300"
        >
          Home
        </Link>
      </p>
    </div>
  );
}
