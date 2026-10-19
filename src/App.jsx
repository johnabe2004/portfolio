import { useEffect, useState } from "react";
import sprite from "./sprite.js";
import "./App.css";

const Icon = ({ n }) => (
  <svg className="i">
    <use href={`#${n}`} />
  </svg>
);

const NAV = [
  ["home", "Home", "home"],
  ["about", "About", "user"],
  ["services", "Services", "list"],
  ["portfolio", "Portfolio", "case"],
  ["contact", "Contact", "chat"],
];
const COLORS = ["#ff2d3d", "#ff6a00", "#2fa37a", "#1f5fd6", "#ff2fa8"];
const SKILLS = [
  ["HTML", 95],
  ["CSS", 95],
  ["Tailwind CSS", 95],
  ["JavaScript", 75],
  ["React", 95],
  ["Node.js", 75],
];
const INFO = [
  ["Birthday", "01 February 1990"],
  ["Age", "35"],
  ["Website", "www.baruchictsolution.com"],
  ["Email", "johnabe2004@gmail.com"],
  ["Degree", "CS"],
  ["Phone", "+251 938 484857"],
  ["City", "Addis Ababa, Ethiopia"],
  ["Freelance", "Available"],
];
const EDU = [
  [
    "2015 - 2020",
    "Bachelor in Computer Science",
    "Studied algorithms, programming and human-computer interaction. at Microlink College",
  ],
  [
    "2020 - 2021",
    "Certificate in Graphic Design and Web Development",
    "Learned Graphic design and web development fundamentals at AddisBits.",
  ],
];
const EXP = [
  [
    "2018 - Now",
    "Freelance Web Developer",
    "Building WordPress and custom sites for clients on Fiverr and beyond.",
  ],
  [
    "2016 - 2018",
    "Junior Front-End Developer",
    "Turned PSD designs into responsive pages for a local agency.",
  ],
  [
    "2015 - 2016",
    "Web Design Intern",
    "Supported the design team with layouts and assets.",
  ],
];
const SERVICES = [
  [
    "mobile",
    "Responsive Design",
    "Layouts that adapt cleanly from phone to widescreen.",
  ],
  [
    "monitor",
    "Web Development",
    "Fast, maintainable sites built with modern HTML, CSS and JavaScript.",
  ],
  [
    "layout",
    "UI Design",
    "Interfaces and mockups you can review before any code is written.",
  ],
  [
    "code",
    "WordPress",
    "Custom themes, plugins and store setups you can manage yourself.",
  ],
  [
    "search",
    "SEO",
    "Clean markup and speed work that helps your site get found.",
  ],
  [
    "mega",
    "Digital Marketing",
    "Landing pages built to turn visitors into enquiries.",
  ],
];
const WORKS = [
  ["PSD to Template", "Web design", "#6d28d9,#c026d3", "baruchictsolution.com"],
  ["WordPress Restaurant", "WordPress", "#2b2b2b,#8a5a2b"],
  ["Momo Pixel Brand", "Branding", "#1f1f1f,#b8893b"],
  ["Heartland Food", "Landing page", "#3b2a20,#d9531e"],
  ["Sayri Game Hub", "Web app", "#1e1b4b,#06b6d4"],
  ["Corporate Site", "WordPress", "#0f3d5e,#6366f1"],
];
const CONTACTS = [
  ["phone", "Call Us On", "+251 938 484857"],
  ["pin", "Office", "Addis Ababa, Ethiopia"],
  ["mail", "Email", "johnabe2004@gmail.com"],
  ["globe", "Website", "www.baruchictsolution.com"],
];

const read = (k) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* storage unavailable */
  }
};

const Timeline = ({ items }) => (
  <div className="tl">
    {items.map(([d, t, p]) => (
      <article key={t}>
        <small>
          <Icon n="cal" /> {d}
        </small>
        <h4>{t}</h4>
        <p>{p}</p>
      </article>
    ))}
  </div>
);

function Skills({ active }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
    if (!active) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setOn(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [active]);
  return (
    <div className="skills">
      {SKILLS.map(([n, v]) => (
        <div className="sk" key={n}>
          <div>
            <span>{n}</span>
            <span>{v}%</span>
          </div>
          <div className="bar">
            <i style={{ width: on ? `${v}%` : 0 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    e.target.reset();
    setSent(true);
  };
  return (
    <form onSubmit={submit}>
      <input required placeholder="Name" aria-label="Name" />
      <input required type="email" placeholder="Email" aria-label="Email" />
      <input
        className="w"
        required
        placeholder="Subject"
        aria-label="Subject"
      />
      <textarea
        className="w"
        required
        placeholder="Message"
        aria-label="Message"
      />
      <div className="w">
        <button className="btn" type="submit">
          Send Message
        </button>
        {sent && (
          <span id="ok" role="status">
            Message sent. I will reply soon.
          </span>
        )}
      </div>
    </form>
  );
}

export default function App() {
  const getPage = () => (location.hash || "#home").slice(1);
  const [page, setPage] = useState(getPage);
  const [palOpen, setPalOpen] = useState(false);
  const [accent, setAccent] = useState(() => read("atlas-c"));
  const [theme, setTheme] = useState(() => read("atlas-t"));
  const [sysDark, setSysDark] = useState(
    () => matchMedia("(prefers-color-scheme:dark)").matches,
  );

  useEffect(() => {
    const onHash = () => {
      setPage(getPage());
      scrollTo(0, 0);
    };
    addEventListener("hashchange", onHash);
    const mq = matchMedia("(prefers-color-scheme:dark)");
    const onMq = (e) => setSysDark(e.matches);
    mq.addEventListener("change", onMq);
    return () => {
      removeEventListener("hashchange", onHash);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  useEffect(() => {
    const r = document.documentElement;
    accent
      ? r.style.setProperty("--acc", accent)
      : r.style.removeProperty("--acc");
    theme ? (r.dataset.theme = theme) : delete r.dataset.theme;
  }, [accent, theme]);

  const isDark = theme ? theme === "dark" : sysDark;
  const pick = (c) => {
    setAccent(c);
    write("atlas-c", c);
  };
  const toggleMode = () => {
    const n = isDark ? "light" : "dark";
    setTheme(n);
    write("atlas-t", n);
  };
  const cur = NAV.some(([id]) => id === page) ? page : "home";
  const cls = (id) => (cur === id ? "on" : "");

  return (
    <>
      <div
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: sprite }}
      />

      <aside>
        <a className="logo" href="#home" aria-label="Atlas home">
          Atlas
        </a>
        <nav aria-label="Main">
          {NAV.map(([id, label, icon]) => (
            <a key={id} href={`#${id}`} className={cls(id)}>
              <Icon n={icon} />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="tools">
        <button onClick={() => setPalOpen((o) => !o)} aria-label="Theme colors">
          <Icon n="drop" />
        </button>
        <button onClick={toggleMode} aria-label="Toggle light and dark mode">
          <Icon n={isDark ? "sun" : "moon"} />
        </button>
        <div className={`pal ${palOpen ? "open" : ""}`}>
          <b>Theme Colors</b>
          <span>
            {COLORS.map((c) => (
              <i
                key={c}
                role="button"
                tabIndex={0}
                aria-label={c}
                style={{ background: c }}
                onClick={() => pick(c)}
                onKeyDown={(e) => e.key === "Enter" && pick(c)}
              />
            ))}
          </span>
        </div>
      </div>

      <main>
        <section className={cls("home")}>
          <div className="hero">
            <p>Hello, I'm</p>
            <h1>
              Yohannes Abebe,{" "}
              <span className="acc">Full-Stack Web Developer</span>
            </h1>
            <p>
              I build fast, responsive websites and web apps, from WordPress
              stores to custom front ends. Based in Addis Ababa, working with
              clients worldwide.
            </p>
            <div className="btns">
              <a className="btn" href="#portfolio">
                View my work
              </a>
              <a className="btn" href="#contact">
                Hire me
              </a>
            </div>
          </div>
        </section>

        <section className={cls("about")}>
          <h2>About Me</h2>
          <div className="about">
            <div className="intro">
              <h3>
                I'm Yohannes Abebe and{" "}
                <span className="acc">Full-Stack Web Developer</span>
              </h3>
              <p>
                I design and build websites that load quickly and work on every
                screen. I enjoy turning a rough idea into a clean, usable site,
                and I take projects from first sketch through launch and
                support.
              </p>
            </div>
            <div className="info">
              {INFO.map(([k, v]) => (
                <div key={k}>
                  <b>{k}:</b> <span>{v}</span>
                </div>
              ))}
            </div>
            <Skills active={cur === "about"} />
            <div className="btns">
              <a
                className="btn"
                href="#about"
                onClick={(e) => e.preventDefault()}
              >
                Download CV
              </a>
              <a className="btn" href="#contact">
                Hire Me
              </a>
            </div>
          </div>
          <div className="two">
            <div>
              <h3>Education</h3>
              <Timeline items={EDU} />
            </div>
            <div>
              <h3>Experience</h3>
              <Timeline items={EXP} />
            </div>
          </div>
        </section>

        <section className={cls("services")}>
          <h2>Services</h2>
          <div className="grid">
            {SERVICES.map(([i, t, p]) => (
              <div className="svc" key={t}>
                <div className="ic">
                  <Icon n={i} />
                </div>
                <h4>{t}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={cls("portfolio")}>
          <h2>Portfolio</h2>
          <p className="sub">My Last Projects:</p>
          <div className="grid">
            {WORKS.map(([t, c, g, url]) => (
              <div
                className="work"
                key={t}
                style={{ background: `linear-gradient(135deg,${g})` }}
              >
                <span>{t}</span>
                <small>{c}</small>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  open project
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className={cls("contact")}>
          <h2>Contact Me</h2>
          <div className="ct">
            <h3>Have You Any Questions?</h3>
            <p className="tag">I'm at your service</p>
            <div className="cards">
              {CONTACTS.map(([i, t, v]) => (
                <div key={t}>
                  <Icon n={i} />
                  <b>{t}</b>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <h3>Send me an email</h3>
            <p className="tag">I'm very responsive to messages</p>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
