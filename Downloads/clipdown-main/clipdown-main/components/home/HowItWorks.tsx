import { Clipboard, Download, MousePointerClick } from "lucide-react";

const steps = [
  {
    Icon: Clipboard,
    title: "Copy a public link",
    desc: "Grab the share URL from the video you want to save.",
    color: "#7c6cff",
  },
  {
    Icon: MousePointerClick,
    title: "Paste it into VideoSnap",
    desc: "The extractor checks the platform and prepares options.",
    color: "#22d3ee",
  },
  {
    Icon: Download,
    title: "Save your download",
    desc: "Choose the available format and keep the file on your device.",
    color: "#fb7185",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-[#f7faff] py-16 sm:py-20">
      <div className="site-container max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">How It Works</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[#171b22] sm:text-4xl">Three steps from link to download.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[18px] border border-[#e1e8f2] bg-white p-5 shadow-[0_14px_40px_rgba(30,41,59,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(30,41,59,0.08)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${step.color}1f`, color: step.color }}>
                  <step.Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-black text-[#a1a8b3]">0{index + 1}</span>
              </div>
              <h3 className="text-sm font-bold text-[#20232a] sm:text-base">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#64676e]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
