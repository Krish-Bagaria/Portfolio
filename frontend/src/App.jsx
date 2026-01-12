import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Rocket,
  Sparkles,
  Zap,
  Heart,
  Coffee,
  Trophy,
  Star,
  MessageCircle,
  ArrowRight,
  Download,
  Palette,
  Terminal,
  Database,
  Globe,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  MonitorStop,
} from "lucide-react";

const SOCIAL_LINKS = {
  github: "https://github.com/Krish-Bagaria",
  linkedin: "https://linkedin.com/in/krish-bagaria",
  email: "mailto:krishbagaria086@gmail.com",
  twitter: "https://twitter.com/yourusername",
};

const API_URL = "http://localhost:5000";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Krish_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormStatus({ loading: false, success: false, error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please fill in all required fields",
      });
      return;
    }

    setFormStatus({ loading: true, success: false, error: "" });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: "" });
        }, 5000);
      } else {
        setFormStatus({
          loading: false,
          success: false,
          error: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error:
          "Failed to send message. Please try again or contact me directly via email.",
      });
    }
  };

  const stats = [
    {
      icon: <Code2 className="w-8 h-8" />,
      value: "50+",
      label: "Projects Completed",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: "5+",
      label: "Years Experience",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: "100+",
      label: "Happy Clients",
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      value: "∞",
      label: "Cups of Coffee",
    },
  ];

  const projects = [
    {
      title: "Movie Ticket Booking App",
      desc: "Book a ticket, See all shows available, confirm ticket by doing payment",
      icon: <MonitorStop className="w-10 h-10" />,

      linear: "from-violet-600 via-purple-600 to-fuchsia-600",
      tags: ["MERN-Stack", "AI", "JavaScript", "Tailwind"],
      github: "https://github.com/yourusername/ai-saas",
      live: "https://ai-saas-demo.netlify.app",
    },
    {
      title: "E-Commerce Empire",
      desc: "Full-stack shopping platform with 50K+ products and payment gateway",
      icon: <Rocket className="w-10 h-10" />,
      linear: "from-cyan-600 via-blue-600 to-indigo-600",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      github: "https://github.com/yourusername/ecommerce",
      live: "https://ecommerce-demo.vercel.app",
    },
    {
      title: "Chat App",
      desc: "Real time message, image, emojy send and receive app",
      icon: <MessageCircle className="w-10 h-10" />,
      linear: "from-pink-600 via-rose-600 to-red-600",
      tags: ["React", "Sokect.io", "MERN-Stack", "JavaScript"],
      github: "https://github.com/yourusername/social-app",
      live: "https://social-app-demo.com",
    },
  ];

  const skills = [
    {
      name: "React / Next.js",
      level: 90,
      icon: <Code2 className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "JavaScript",
      level: 85,
      icon: <Terminal className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Tailwind CSS",
      level: 90,
      icon: <Palette className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Node.js / Express",
      level: 88,
      icon: <Database className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "MongoDB / SQL ",
      level: 80,
      icon: <Database className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "REST ",
      level: 90,
      icon: <Globe className="w-5 h-5" />,
      color: "from-rose-500 to-red-500",
    },
  ];

  const services = [
    {
      icon: <Code2 className="w-12 h-12" />,
      title: "Web Development",
      desc: "Building responsive, fast, and modern web applications",
      linear: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Terminal className="w-12 h-12" />,
      title: "Backend Development",
      desc: "Scalable server-side solutions and APIs",
      linear: "from-green-500 to-emerald-500",
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Performance Optimization",
      desc: "Making your apps lightning fast and efficient",
      linear: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-linear-to-br from-purple-500/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-linear-to-tl from-cyan-500/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-slate-950/90 backdrop-blur-2xl shadow-2xl border-b border-white/5"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-2 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative px-6 py-3 bg-linear-to-r from-slate-900 to-slate-800 rounded-xl border border-white/10">
                  <span className="text-2xl font-black bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {"<Dev/>"}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {["Home", "About", "Skills", "Projects", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative font-bold transition-all duration-300 group ${
                      activeSection === item.toLowerCase()
                        ? "text-cyan-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-300 ${
                        activeSection === item.toLowerCase()
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </button>
                )
              )}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-2.5 bg-linear-to-r from-purple-600 to-cyan-600 rounded-full font-bold hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
              >
                Hire Me <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-6 space-y-3 pb-6">
              {["Home", "About", "Skills", "Projects", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-6 py-3 rounded-xl bg-linear-to-r from-purple-500/10 to-cyan-500/10 hover:from-purple-500/20 hover:to-cyan-500/20 transition-all font-semibold"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-300">
                Available for freelance
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-6xl font-black leading-tight">
              <span className="block text-white mb-2">Hi, I am</span>
              <span className="block bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Krish Bagaria
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
              A{" "}
              <span className="text-purple-400 font-bold">
                Creative Developer,
              </span>{" "}
              Who crafts stunning digital experiences that users love.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="group px-8 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 flex items-center gap-2"
              >
                Lets Work Together
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleDownloadResume}
                className="px-8 py-4 border-2 border-purple-500/50 rounded-full font-bold text-lg hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CV
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:text-purple-400"
              >
                <Github size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:text-cyan-400"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:text-pink-400"
              >
                <Mail size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:text-orange-400"
              >
                <Coffee size={24} />
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full blur-3xl opacity-30 group-hover:opacity-50 animate-pulse transition duration-1000"></div>
            <div className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10 backdrop-blur-xl">
              <div className="text-9xl text-center">👨‍💻</div>
              <div className="absolute -top-6 -right-6 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl p-4 shadow-xl animate-bounce">
                <Code2 className="w-8 h-8" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 bg-linear-to-br from-cyan-600 to-blue-600 rounded-2xl p-4 shadow-xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-slate-900 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                  <div className="text-cyan-400 mb-3 flex justify-center transform group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-purple-500"></div>
              <span className="text-purple-400 text-4xl font-bold uppercase tracking-wider">
                About Me
              </span>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-cyan-500"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hello, I’m Krish Bagaria, a developer who loves turning concepts
              into functional and engaging digital products. I blend creativity
              with technology to design and develop solutions that are not only
              efficient but also intuitive and impactful. From frontend design
              to backend logic, I enjoy every part of the development process
              and strive to write clean, maintainable code that brings ideas to
              life.
            </p>
            <h2 className="pt-1.5 mt-1.5 text-6xl md:text-5xl font-black mb-6">
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                What I Do Best
              </span>
            </h2>
          </div>

          <div
            className="text-center mx-auto max-w-7xl grid gap-6 
                md:grid-cols-2 lg:grid-cols-3 place-items-center"
          >
            {services.map((service, i) => (
              <div key={i} className="group relative">
                <div
                  className={`absolute -inset-0.5 bg-linear-to-r ${service.linear} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
                ></div>
                <div className="relative bg-slate-900 rounded-2xl p-8 h-full hover:scale-105 transition-all duration-300 border border-white/5">
                  <div
                    className={`inline-flex p-4 bg-linear-to-br ${service.linear} rounded-2xl mb-6 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="py-20 px-6 bg-linear-to-b from-transparent via-purple-950/10 to-transparent"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-cyan-500"></div>
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                My Arsenal
              </span>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-purple-500"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills and Technologies
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            {skills.map((skill, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 bg-linear-to-r ${skill.color} rounded-lg text-white`}
                    >
                      {skill.icon}
                    </div>
                    <span className="font-bold text-xl">{skill.name}</span>
                  </div>
                  <span className="text-2xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full bg-linear-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-purple-500"></div>
              <span className="text-purple-400 font-bold uppercase tracking-wider">
                Portfolio
              </span>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-cyan-500"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group relative overflow-hidden bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl hover:scale-105 transition-all duration-500 cursor-pointer border border-white/5"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${project.linear} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="p-8">
                  <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform">
                    {project.image}
                  </div>
                  <div
                    className={`inline-flex p-3 bg-linear-to-br ${project.linear} rounded-2xl mb-6 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm text-purple-300 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                    >
                      <Github size={18} />
                      <span className="text-sm font-semibold group-hover/link:underline">
                        Code
                      </span>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group/link"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm font-semibold group-hover/link:underline">
                        Live Demo
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - PASTE THIS AFTER YOUR PROJECTS SECTION */}
      <section
        id="contact"
        className="py-32 px-6 bg-linear-to-b from-transparent via-purple-950/10 to-transparent"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-cyan-500"></div>
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                Get In Touch
              </span>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-purple-500"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lets Create Together
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have an exciting project? Lets bring your ideas to life!
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-slate-900 rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your Name"
                    className="px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-gray-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Your Email"
                    className="px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  placeholder="Subject"
                  className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-gray-500"
                />

                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-gray-500 resize-none"
                  required
                ></textarea>

                {formStatus.error && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
                    <AlertCircle size={20} />
                    <span>{formStatus.error}</span>
                  </div>
                )}

                {formStatus.success && (
                  <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400">
                    <CheckCircle size={20} />
                    <span>
                      Message sent successfully! I will get back to you soon.
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={formStatus.loading}
                  className="w-full py-5 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus.loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-3xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                {"<Dev/>"}
              </div>
              <p className="text-gray-400 leading-relaxed">
                Creating digital experiences that make a difference. Lets build
                something amazing together.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {["Home", "About", "Skills", "Projects", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-xl hover:bg-linear-to-r hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-xl hover:bg-linear-to-r hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.email}
                  className="p-3 bg-slate-800 rounded-xl hover:bg-linear-to-r hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110"
                >
                  <Mail size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-xl hover:bg-linear-to-r hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110"
                >
                  <Coffee size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500">
              © 2025 <span className="text-cyan-400 font-bold">Your Name</span>.
              Built with{" "}
              <Heart className="inline w-4 h-4 text-pink-500 animate-pulse" />{" "}
              using React, Vite and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
