import React from "react";
import AddTokenModal from "./../auth/AddTokenModal";
import Link from "next/link";


type Props = {};

export default function ChatPlaceholder({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-3xl p-4 text-center text-primary">
        <h1 className="text-4xl font-medium">ikigAI Labs XYZ</h1>
        <p className="mt-4 text-lg">
          Experimental Edition.
        </p>
        <div className="m-4 flex items-center justify-center">
          <AddTokenModal />
        </div>
        <p className="mt-4 text-lg">
          Explore the{" "}
          <Link
            href="/playground"
            className="font-medium text-primary hover:underline"
          >
            Playground
          </Link> 
          !
        </p>
      </div>
    </div>
  );
}
