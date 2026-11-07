import { Suspense } from "react";
import { connection } from "next/server";

async function CopyrightYear() {
  await connection();
  return <span>{new Date().getFullYear()}</span>;
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-gutter py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          Copyright &copy;{" "}
          <Suspense fallback={<span aria-hidden="true">----</span>}>
            <CopyrightYear />
          </Suspense>{" "}
          | David Vega | All rights reserved
        </p>
      </div>
    </footer>
  );
}
