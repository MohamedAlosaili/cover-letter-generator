import Header from "@/components/Header";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className={`min-h-screen max-w-5xl mx-auto`}>
      <Header />
      <section className="p-4">
        <h2 className="text-[min(10vw,3.5rem)] mt-16 font-bold text-center max-w-lg min-[900px]:max-w-3xl mx-auto">
          Generate Cover Letter Email Easly With GPT Model
        </h2>
        <Button className="mx-auto mt-16">Try it now 👇</Button>
      </section>
      <footer></footer>
    </main>
  );
}
