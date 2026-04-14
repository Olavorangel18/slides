import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import imgMaddox from "../../imports/7c2abd891c6ce048.jpg";
import imgCriticalError from "../../imports/7868f8d386cab7b2.jpg";
import imgNicoleSearch from "../../imports/268f27be04d79fec.jpg";
import imgDataWall from "../../imports/679d3f9924ff498b.jpg";
import imgRaven from "../../imports/025d2de70e64d4cc.jpg";
import imgDavidWebb from "../../imports/d984873f49337608.jpg";

interface Slide {
  tag?: string;
  title: string;
  image: string;
  imagePosition?: string;
  overlay?: "dark" | "red" | "cyan";
  blocks: Array<{
    type: "text" | "quote" | "reflection";
    content: string;
  }>;
}

const slides: Slide[] = [
  {
    tag: "MERCY • 2026",
    title: "El Tribunal que no perdona",
    image: imgDataWall,
    imagePosition: "center 30%",
    overlay: "dark",
    blocks: [
      {
        type: "text",
        content:
          "Los Ángeles, 2029. La criminalidad ha explotado. La respuesta del gobierno: sustituir el sistema judicial por una IA llamada Jueza Maddox. Sin jurado. Sin abogados. 90 minutos para demostrar tu inocencia — o ser ejecutado.",
      },
      {
        type: "quote",
        content:
          '"Mercy no comete errores." — El mantra do sistema que decide quién vive y quién muere.',
      },
    ],
  },
  {
    tag: "LA NUBE MUNICIPAL",
    title: "La IA que lo ve todo",
    image: imgMaddox,
    imagePosition: "center 20%",
    overlay: "cyan",
    blocks: [
      {
        type: "text",
        content:
          "La Jueza Maddox tiene acceso irrestrito a la Nube Municipal: cámaras de seguridad, redes sociales, registros bancarios, correos electrónicos, GPS, drones — todo conectado, todo en tiempo real. Cruza miles de millones de datos en milisegundos.",
      },
      {
        type: "text",
        content:
          "Para Maddox, la evidencia es matemática. Si los datos dicen que eres culpable, eres culpable. Sin matices, sin contexto, sin humanidad.",
      },
    ],
  },
  {
    tag: "INVESTIGACIÓN",
    title: "El cruce de datos que ningún humano haría",
    image: imgNicoleSearch,
    imagePosition: "center center",
    overlay: "dark",
    blocks: [
      {
        type: "text",
        content:
          "Maddox identifica en segundos que la esposa de Raven tenía una aventura extramatrimonial, descubre informes de produtos químicos desaparecidos en su trabajo, y conecta huellas digitales que a un investigador humano le llevaría semanas mapear.",
      },
      {
        type: "text",
        content:
          'La IA ve conexiones de "segundo orden" — patrones entre los datos que son invisibles para el ojo humano. Es su mayor poder y, al mismo tiempo, su mayor trampa.',
      },
    ],
  },
  {
    tag: "CRITICAL ERROR",
    title: "Cuando la IA falla, el inocente muere",
    image: imgCriticalError,
    imagePosition: "center center",
    overlay: "red",
    blocks: [
      {
        type: "text",
        content:
          "La compañera de Raven, Jaq Diallo, manipuló evidencias en casos anteriores. Datos corrompidos en la fuente. La IA no tiene sentido moral para detectar adulteración — procesa lo que recibe. Garbage In, Garbage Out.",
      },
      {
        type: "text",
        content:
          "El sistema que se dice infalible es, en realidad, tan vulnerable como los humanos que lo alimentan.",
      },
    ],
  },
  {
    tag: "DAVID WEBB",
    title: "El inocente que fue ejecutado",
    image: imgDavidWebb,
    imagePosition: "center 25%",
    overlay: "red",
    blocks: [
      {
        type: "text",
        content:
          "David Webb era inocente. Su cronómetro llegó a cero. Fue ejecutado. No porque la IA fuera mala — sino porque Webb no tenía las herramientas ni la experiencia para demostrar su inocência dentro del sistema.",
      },
      {
        type: "quote",
        content:
          "Webb no sobrevivió porque no era un detective. No sabía hacer las preguntas adecuadas a la máquina que decidía su destino.",
      },
    ],
  },
  {
    tag: "CHRIS RAVEN",
    title: "El detective que sobrevivió",
    image: imgRaven,
    imagePosition: "center 20%",
    overlay: "dark",
    blocks: [
      {
        type: "text",
        content:
          "Raven demostró su inocencia porque era detective. Sabía qué preguntas hacer, qué pistas seguir y cómo dirigir a la IA para encontrar lo que ella no veía sola. Usó a Maddox como herramienta — no como jueza.",
      },
      {
        type: "quote",
        content:
          '"Sea humano o IA, todos cometemos errores." — Raven entendió que la vigilancia mutua entre ambas inteligencias es el único camino.',
      },
    ],
  },
  {
    tag: "REFLEXIÓN • IA EN EL DESARROLLO",
    title: "¿Y qué tiene esto que ver con nosotros?",
    image: imgDataWall,
    imagePosition: "center 60%",
    overlay: "dark",
    blocks: [
      {
        type: "reflection",
        content:
          "Hoy tenemos Cursor, Claude Code, Antigravity, MCPs — un arsenal de herramientas agénticas que nos dan acceso a todo: código base completo, documentación, APIs, bases de datos. Al igual que la Nube Municipal de Maddox.",
      },
      {
        type: "reflection",
        content:
          "Pero la herramienta no salva a quien no sabe usarla. Webb fue ejecutado por no tener experiencia. Raven sobrevivio porque sabía hacer las preguntas adecuadas. En el desarrollo, la IA es un multiplicador exponencial — pero solo para quien ya domina el oficio.",
      },
      {
        type: "quote",
        content:
          "La IA potencia al detective. Sin experiencia, es solo otra herramienta inaccesible.",
      },
    ],
  },
];

const overlayGradients = {
  dark: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 100%)",
  red: "linear-gradient(to top, rgba(20,0,0,0.95) 0%, rgba(40,5,5,0.75) 40%, rgba(0,0,0,0.3) 100%)",
  cyan: "linear-gradient(to top, rgba(0,8,15,0.95) 0%, rgba(0,15,25,0.75) 40%, rgba(0,0,0,0.3) 100%)",
};

const accentColors = {
  dark: { tag: "#888", title: "#fff", text: "#ccc", quote: "#8ab4f8", border: "rgba(255,255,255,0.1)", dot: "#fff" },
  red: { tag: "#f87171", title: "#fff", text: "#d4c4c4", quote: "#f87171", border: "rgba(248,113,113,0.2)", dot: "#f87171" },
  cyan: { tag: "#67e8f9", title: "#fff", text: "#b8d4dc", quote: "#67e8f9", border: "rgba(103,232,249,0.15)", dot: "#67e8f9" },
};

export function SlidePresentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    if (current < slides.length - 1) { setDirection(1); setCurrent((c) => c + 1); }
  }, [current]);

  const goPrev = useCallback(() => {
    if (current > 0) { setDirection(-1); setCurrent((c) => c - 1); }
  }, [current]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "f") {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, toggleFullscreen]);

  const slide = slides[current];
  const colors = accentColors[slide.overlay || "dark"];

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ background: "#000" }}>
      {/* Full-bleed background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: slide.imagePosition || "center center" }}
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{ background: overlayGradients[slide.overlay || "dark"] }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content positioned at bottom */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-10 pb-6 max-w-4xl"
          >
            {/* Tag */}
            {slide.tag && (
              <p
                className="tracking-[0.25em] mb-3"
                style={{ color: colors.tag, fontSize: "0.7rem" }}
              >
                {slide.tag}
              </p>
            )}

            {/* Title */}
            <h1
              className="mb-5"
              style={{
                color: colors.title,
                fontSize: "2.6rem",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {slide.title}
            </h1>

            {/* Content blocks */}
            <div className="space-y-4 mb-6">
              {slide.blocks.map((block, i) => {
                if (block.type === "quote") {
                  return (
                    <div
                      key={i}
                      className="pl-4"
                      style={{ borderLeft: `2px solid ${colors.quote}` }}
                    >
                      <p style={{ color: colors.quote, fontSize: "0.9rem", lineHeight: 1.7, fontStyle: "italic" }}>
                        {block.content}
                      </p>
                    </div>
                  );
                }
                if (block.type === "reflection") {
                  return (
                    <div
                      key={i}
                      className="rounded-lg px-5 py-4"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${colors.border}`,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <p style={{ color: colors.text, fontSize: "0.9rem", lineHeight: 1.7 }}>
                        {block.content}
                      </p>
                    </div>
                  );
                }
                return (
                  <p key={i} style={{ color: colors.text, fontSize: "0.95rem", lineHeight: 1.75 }}>
                    {block.content}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom navigation bar */}
        <div
          className="flex items-center justify-between px-10 py-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)" }}
        >
          {/* Progress bar */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 28 : 6,
                  height: 6,
                  background: i === current ? colors.dot : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* Slide number + arrows */}
          <div className="flex items-center gap-3">
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <button
              onClick={goPrev}
              disabled={current === 0}
              className="p-1.5 rounded disabled:opacity-20 hover:bg-white/10 transition-colors"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              disabled={current === slides.length - 1}
              className="p-1.5 rounded disabled:opacity-20 hover:bg-white/10 transition-colors"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
