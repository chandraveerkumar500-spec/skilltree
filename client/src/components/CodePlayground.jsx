import { useState, useEffect, useRef } from "react";

export default function CodePlayground({ initialHtml = "", initialCss = "", initialJs = "" }) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [tab, setTab] = useState("html");
  const [srcDoc, setSrcDoc] = useState("");
  const iframeRef = useRef(null);

  // Debounced live preview
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (err) {
                document.body.innerHTML += '<pre style="color:red;background:#1a1a2e;padding:10px;border-radius:8px;margin-top:10px;">❌ Error: ' + err.message + '</pre>';
              }
            <\/script>
          </body>
        </html>
      `);
    }, 400);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const openFullscreen = () => {
    const win = window.open();
    win.document.write(srcDoc);
    win.document.close();
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-200">💻 Live Code Playground</p>
        <button
          onClick={openFullscreen}
          className="text-xs text-purple-400 hover:text-purple-300"
        >
          ⛶ Fullscreen
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* EDITOR */}
        <div className="bg-[#0a0a1a] rounded-xl border border-purple-500/30 overflow-hidden">
          <div className="flex border-b border-purple-500/20 text-xs">
            {["html", "css", "js"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 uppercase font-semibold transition ${
                  tab === t
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-purple-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <textarea
            value={tab === "html" ? html : tab === "css" ? css : js}
            onChange={(e) =>
              tab === "html"
                ? setHtml(e.target.value)
                : tab === "css"
                ? setCss(e.target.value)
                : setJs(e.target.value)
            }
            spellCheck={false}
            className="w-full h-64 p-3 bg-[#0a0a1a] font-mono text-sm text-gray-100 outline-none resize-none"
            placeholder={`Write your ${tab.toUpperCase()} here…`}
          />
        </div>

        {/* PREVIEW */}
        <div className="bg-white rounded-xl border border-purple-500/30 overflow-hidden">
          <div className="bg-[#0a0a1a] border-b border-purple-500/20 px-4 py-2 text-xs text-purple-300 uppercase font-semibold">
            ▶️ Live Preview
          </div>
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            title="preview"
            sandbox="allow-scripts"
            className="w-full h-64 bg-white"
          />
        </div>
      </div>

      <div className="flex gap-2 text-xs">
        <button
          onClick={() => { setHtml(initialHtml); setCss(initialCss); setJs(initialJs); }}
          className="px-3 py-1 rounded-lg border border-gray-700 text-gray-400 hover:border-purple-500/50"
        >
          🔄 Reset
        </button>
        <button
          onClick={() => { setHtml(""); setCss(""); setJs(""); }}
          className="px-3 py-1 rounded-lg border border-gray-700 text-gray-400 hover:border-red-500/50"
        >
          🗑 Clear All
        </button>
      </div>
    </div>
  );
}