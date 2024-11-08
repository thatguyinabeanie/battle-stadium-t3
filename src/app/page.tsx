import type { Metadata } from "next";
import { title } from "~/lib/tailwind-variants/titles";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <div className="min--h-screen flex flex-col items-center justify-between">
      <div className="inline-block w-full max-w-fit items-center justify-center bg-transparent pt-10 text-center">
        <h1 className={title({ color: "violet", size: "xl" })}>
          battlestadium.gg
        </h1>
        <h2 className={`${title({ size: "xs" })} pt-2`}>
          a next-gen tournament website.
        </h2>

        <div className="flex flex-col justify-items-center pt-1">
          <h2 className={title({ size: "xxs" })}>beautiful, fast, modern.</h2>

          <h2 className={`${title({ color: "violet", size: "xs" })} pt-4`}>
            Coming Soon
          </h2>
        </div>
      </div>
    </div>
  );
}
