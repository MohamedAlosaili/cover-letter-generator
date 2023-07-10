import { FormEvent, useRef } from "react";

import Header from "@/components/Header";
import Button from "@/components/Button";
import Form from "@/components/Form";

import inputs from "../inputs";
const intialUserInfo: { [key: string]: string } = {};
inputs.map(input => {
  intialUserInfo[input.name] = "";
});

export default function Home() {
  const userInfo = useRef(intialUserInfo);

  const generateCoverLetter = (e: FormEvent) => {
    e.preventDefault();
    console.log(userInfo.current);
  };

  const focusOnFirstInput = () => {
    document.getElementsByTagName("input")?.[0]?.focus();
  };

  return (
    <main className={`min-h-screen max-w-5xl mx-auto`}>
      <Header />
      <section className="p-4">
        <h2 className="text-[min(10vw,3.5rem)] mt-16 font-bold text-center max-w-lg min-[900px]:max-w-3xl mx-auto">
          Generate Cover Letter Email Easly With GPT Model
        </h2>
        <Button className="mx-auto my-16" onClick={focusOnFirstInput}>
          Try it now 👇
        </Button>
        <Form onSubmit={generateCoverLetter} userInfo={userInfo} />
      </section>
      <footer className="px-4 font-medium py-6 text-slate-700 flex justify-between items-center border-t-2 border-black/5">
        <p>
          Created By{" "}
          <a
            target="_blank"
            className="front-bold hover:underline"
            href="https://github.com/mohamedalosaili/cover-letter-generator"
          >
            @MohammedAlosaili
          </a>
        </p>
        <p>
          Inspired By{" "}
          <a
            target="_blank"
            className="front-bold hover:underline"
            href="https://github.com/Nutlope/twitterbio"
          >
            twitterbio
          </a>
        </p>
      </footer>
    </main>
  );
}
