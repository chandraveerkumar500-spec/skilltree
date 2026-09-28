export const webDevTree = {
  id: "webdev",
  name: "Full Stack Web Developer",
  icon: "🌐",
  nodes: [
    {
      id: "html",
      label: "HTML",
      x: 0, y: 0, xp: 100,
      children: ["css", "git"],
      description: "The skeleton of every webpage. Learn tags, attributes, semantic structure.",
      notes: `
# HTML — HyperText Markup Language

## What is HTML?
HTML is the **standard markup language** for creating web pages. It describes the **structure** of a page using **elements** (tags).

## Basic Structure
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
\`\`\`

## Common Tags
- \`<h1>\` to \`<h6>\` — headings (h1 largest)
- \`<p>\` — paragraph
- \`<a href="url">\` — hyperlink
- \`<img src="url" alt="text">\` — image
- \`<ul>\`, \`<ol>\`, \`<li>\` — lists
- \`<div>\`, \`<span>\` — containers

## Semantic HTML (Modern Best Practice)
Instead of \`<div>\` everywhere, use:
- \`<header>\` — top section
- \`<nav>\` — navigation
- \`<main>\` — main content
- \`<section>\` — thematic grouping
- \`<article>\` — standalone content
- \`<footer>\` — bottom section

## Why It Matters
- **SEO** — search engines understand your content better
- **Accessibility** — screen readers work better
- **Maintainability** — you and others can read the code

## Attributes
- \`id\` — unique identifier
- \`class\` — reusable styling hook
- \`href\`, \`src\`, \`alt\` — link/image metadata
- \`data-*\` — custom data attributes
      `,
      resources: [
        { title: "MDN HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
        { title: "HTML Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=UB1O30fR-EE" },
      ],
      flashcards: [
        { front: "What does HTML stand for?", back: "HyperText Markup Language" },
        { front: "Which tag creates a hyperlink?", back: "<a href='...'>" },
        { front: "Difference between <div> and <section>?", back: "<section> is semantic, <div> is generic" },
      ],
      quiz: [
        {
          q: "What does HTML stand for?",
          options: ["Hyper Trainer Markup Language", "Hyper Text Markup Language", "High Text Machine Language"],
          answer: 1,
          explanation: "HTML = HyperText Markup Language — it structures web content.",
        },
        {
          q: "Which tag creates a hyperlink?",
          options: ["<link>", "<a>", "<href>"],
          answer: 1,
          explanation: "<a> is the anchor tag. href is an attribute on it.",
        },
        {
          q: "Which is the correct HTML5 doctype?",
          options: ["<!DOCTYPE html>", "<!DOCTYPE HTML5>", "<doctype html>"],
          answer: 0,
          explanation: "HTML5 uses the short <!DOCTYPE html> declaration.",
        },
        {
          q: "Which tag is best for site navigation?",
          options: ["<div>", "<nav>", "<menu>"],
          answer: 1,
          explanation: "<nav> is the semantic tag for navigation blocks.",
        },
        {
          q: "What does the alt attribute on <img> do?",
          options: ["Sets the width", "Provides text if image fails / for screen readers", "Adds a tooltip"],
          answer: 1,
          explanation: "alt is critical for accessibility and SEO.",
        },
      ],
      task: "Build a semantic personal profile page with <header>, <nav>, <main>, <section>, and <footer>.",
      challenge: {
        title: "Build a Semantic Profile Page",
        description: "Write HTML for a personal profile with a heading, a bio paragraph, and a list of 3 hobbies.",
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My Profile</title>
</head>
<body>
  <!-- Add your code here -->

</body>
</html>`,
        expectedKeywords: ["<h1", "<p", "<ul", "<li"],
        hint: "Use <h1> for your name, <p> for bio, <ul><li> for hobbies.",
      },
      game: {
  type: "memory",
  title: "HTML Term Memory",
  description: "Match each tag with its meaning!",
  pairs: [
    { term: "<a>", definition: "Hyperlink" },
    { term: "<img>", definition: "Image" },
    { term: "<ul>", definition: "Unordered list" },
    { term: "<p>", definition: "Paragraph" },
    { term: "<h1>", definition: "Heading" },
    { term: "<div>", definition: "Container" },
  ],
  maxMoves: 14,
},
 },
{
      id: "css",
      label: "CSS",
      x: 220, y: -80, xp: 100,
      children: ["js", "tailwind"],
      description: "Style your HTML with colors, layouts, animations, and responsive design.",
      notes: `
# CSS — Cascading Style Sheets

## What is CSS?
CSS controls how HTML **looks** — colors, spacing, layout, animations.

## Three Ways to Add CSS
1. **Inline**: \`<p style="color:red">\`
2. **Internal**: \`<style>...</style>\` in <head>
3. **External**: \`<link rel="stylesheet" href="style.css">\` ← best practice

## Selectors
\`\`\`css
p { color: blue; }              /* tag */
.card { border: 1px solid; }    /* class */
#header { height: 60px; }       /* id */
a:hover { text-decoration: none; } /* pseudo-class */
\`\`\`

## Box Model
Every element has:
- **Content** (the text/image)
- **Padding** (space inside border)
- **Border**
- **Margin** (space outside border)

\`\`\`css
.box {
  padding: 16px;
  border: 2px solid #333;
  margin: 20px;
  width: 200px;
}
\`\`\`

## Flexbox (1D layouts)
\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* horizontal */
  align-items: center;            /* vertical */
  gap: 16px;
}
\`\`\`

## Grid (2D layouts)
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Responsive Design
\`\`\`css
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
\`\`\`

## CSS Variables
\`\`\`css
:root { --primary: #6d28d9; }
.btn { background: var(--primary); }
\`\`\`
      `,
      resources: [
        { title: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS" },
        { title: "Flexbox Froggy", url: "https://flexboxfroggy.com/" },
        { title: "Grid Garden", url: "https://cssgridgarden.com/" },
      ],
      flashcards: [
        { front: "What is the CSS box model?", back: "content → padding → border → margin" },
        { front: "When to use Flexbox vs Grid?", back: "Flex: 1D (row OR column). Grid: 2D (rows AND columns)" },
        { front: "What does 'cascading' mean in CSS?", back: "Rules cascade down — later/more specific rules override earlier ones" },
      ],
      quiz: [
        {
          q: "Which property changes text color?",
          options: ["font-color", "text-color", "color"],
          answer: 2,
          explanation: "The 'color' property changes text color.",
        },
        {
          q: "Which display value gives you a 1D layout?",
          options: ["grid", "flex", "block"],
          answer: 1,
          explanation: "Flexbox handles one dimension at a time.",
        },
        {
          q: "How do you make a class selector?",
          options: ["#name", ".name", "@name"],
          answer: 1,
          explanation: "Classes use a dot: .card { }",
        },
        {
          q: "What does CSS stand for?",
          options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System"],
          answer: 1,
        },
      ],
      task: "Style your profile page with flexbox layout, custom colors, and hover effects.",
      challenge: {
        title: "Center a Div (The Classic)",
        description: "Write CSS to center a box both horizontally and vertically inside its parent.",
        starterCode: `.parent {
  height: 100vh;
  /* make this center its child */
}

.child {
  width: 200px;
  height: 100px;
  background: purple;
}`,
        expectedKeywords: ["display: flex", "justify-content: center", "align-items: center"],
        hint: "Use flex on the parent with justify-content AND align-items.",
      },
      game: {
        type: "typing",
        title: "CSS Property Sprint",
        description: "Type CSS properties fast!",
        words: ["color", "padding", "margin", "display:flex", "border", "background", "width", "height", "position", "font-size"],
        timeLimit: 20,
      },
    },
    {
      id: "git",
      label: "Git",
      x: 220, y: 80, xp: 80,
      children: ["github"],
      description: "Version control — track changes and collaborate without losing code.",
      notes: `
# Git Basics

## What is Git?
Git tracks **every change** to your code. You can undo, branch, and merge safely.

## Setup (One-time)
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
\`\`\`

## The Three Areas
1. **Working Directory** — your files
2. **Staging Area** — files ready to commit
3. **Repository (.git)** — committed history

## Essential Commands
\`\`\`bash
git init                  # start a repo
git status                # see changes
git add file.js           # stage a file
git add .                 # stage everything
git commit -m "message"   # save a snapshot
git log --oneline         # view history
\`\`\`

## Branching
\`\`\`bash
git branch feature        # create
git checkout feature      # switch
git checkout -b new-feat  # create + switch
git merge feature         # merge into current
\`\`\`

## Remote (GitHub)
\`\`\`bash
git remote add origin <url>
git push -u origin main
git pull
\`\`\`

## Golden Rules
- Commit often, with clear messages
- Never commit passwords or keys (.gitignore)
- Pull before you push
      `,
      resources: [
        { title: "Git Book", url: "https://git-scm.com/book/en/v2" },
        { title: "Git & GitHub Crash Course", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" },
      ],
      flashcards: [
        { front: "Difference between git add and git commit?", back: "add stages files; commit saves the snapshot" },
        { front: "How do you create AND switch to a new branch?", back: "git checkout -b branch-name" },
      ],
      quiz: [
        { q: "Which command stages all changes?", options: ["git add .", "git push", "git commit"], answer: 0 },
        { q: "Which command shows history?", options: ["git history", "git log", "git show-all"], answer: 1 },
        { q: "Which creates a new branch and switches to it?", options: ["git branch new", "git checkout -b new", "git new branch"], answer: 1 },
      ],
      task: "Initialize a Git repo for your profile page and make 3 meaningful commits.",
      challenge: {
        title: "Commit Message Rules",
        description: "What is the maximum recommended length of a commit subject line? (Answer in code as a comment)",
        starterCode: `# Write the number as a comment
# Example: # 42`,
        expectedKeywords: ["50"],
        hint: "The classic rule is 50 characters.",
      },
    },
    {
      id: "github", label: "GitHub", x: 440, y: 80, xp: 60, children: [],
      description: "Host your code online, collaborate, and build your portfolio.",
      notes: `# GitHub\n\nGitHub is where the world stores Git repositories. You'll use it for every project.\n\n## Key Features\n- **Repositories** — project folders\n- **Pull Requests** — propose changes\n- **Issues** — track bugs/tasks\n- **Actions** — CI/CD automation\n- **Pages** — free static hosting\n\n## First Repo\n1. Create repo on github.com\n2. \`git remote add origin <url>\`\n3. \`git push -u origin main\`\n\n## README.md\nEvery repo needs one — it explains what the project is.`,
      resources: [{ title: "GitHub Docs", url: "https://docs.github.com/" }],
      flashcards: [{ front: "What is a Pull Request?", back: "A proposal to merge changes from one branch into another" }],
      quiz: [
        { q: "What file explains a GitHub repo?", options: ["index.html", "README.md", "about.txt"], answer: 1 },
        { q: "What auto-runs tests on GitHub?", options: ["Issues", "Actions", "Pages"], answer: 1 },
      ],
      task: "Create a GitHub repo, push your profile page, and enable GitHub Pages.",
      challenge: {
        title: "Markdown Basics",
        description: "Write markdown for a heading 'My Project' followed by a bullet list of 2 items.",
        starterCode: `# your markdown here`,
        expectedKeywords: ["#", "-"],
        hint: "Use # for heading, - for bullets.",
      },
    },
    {
      id: "tailwind", label: "Tailwind CSS", x: 440, y: -140, xp: 80, children: [],
      badge: "CSS Master",
      description: "Utility-first CSS framework for rapidly building modern UIs.",
      notes: `# Tailwind CSS\n\nInstead of writing CSS, you compose utility classes directly in HTML.\n\n\`\`\`html\n<button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">\n  Click me\n</button>\n\`\`\`\n\n## Common Utilities\n- \`p-4\`, \`m-2\` — padding / margin\n- \`text-xl\`, \`font-bold\` — typography\n- \`bg-blue-500\` — background color\n- \`flex\`, \`grid\`, \`gap-4\` — layout\n- \`md:flex-row\` — responsive prefix\n\n## Why Tailwind?\n- Faster to build\n- No naming headaches\n- Consistent design system`,
      resources: [{ title: "Tailwind Docs", url: "https://tailwindcss.com/docs" }],
      flashcards: [{ front: "What does `p-4` mean in Tailwind?", back: "padding: 1rem (16px)" }],
      quiz: [
        { q: "What does the class `md:flex` do?", options: ["Always flex", "Flex only on medium+ screens", "Never flex"], answer: 1 },
      ],
      task: "Rebuild your profile page using only Tailwind classes.",
      challenge: {
        title: "Tailwind Button",
        description: "Write a button with purple background, white text, and rounded corners.",
        starterCode: `<button class="">Click</button>`,
        expectedKeywords: ["bg-purple", "text-white", "rounded"],
        hint: "bg-purple-600, text-white, rounded-lg",
      },
    },
    {
      id: "js", label: "JavaScript", x: 440, y: -20, xp: 150, children: ["react"],
      description: "The language of the web. Variables, functions, DOM, async, and more.",
      notes: `# JavaScript\n\nJS makes webpages interactive. It runs in the browser AND on servers (Node.js).\n\n## Variables\n\`\`\`js\nconst name = "Raj";     // cannot reassign\nlet age = 20;           // can reassign\nvar old = "avoid";      // legacy\n\`\`\`\n\n## Data Types\n- Primitive: string, number, boolean, null, undefined, symbol, bigint\n- Objects: {}, []\n\n## Functions\n\`\`\`js\nfunction greet(n) { return "Hi " + n; }\nconst greet2 = (n) => "Hi " + n;\n\`\`\`\n\n## Array Methods (crucial!)\n\`\`\`js\nconst nums = [1,2,3,4];\nnums.map(n => n*2)        // [2,4,6,8]\nnums.filter(n => n%2===0) // [2,4]\nnums.reduce((a,b) => a+b, 0) // 10\n\`\`\`\n\n## Async / Await\n\`\`\`js\nasync function load() {\n  const res = await fetch("/api/data");\n  const data = await res.json();\n  return data;\n}\n\`\`\`\n\n## DOM Manipulation\n\`\`\`js\ndocument.querySelector(".btn").addEventListener("click", () => {\n  console.log("clicked");\n});\n\`\`\``,
      resources: [
        { title: "JavaScript.info", url: "https://javascript.info/" },
        { title: "MDN JS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      ],
      flashcards: [
        { front: "Difference between let and const?", back: "let can be reassigned; const cannot" },
        { front: "What does .map() return?", back: "A new array of the same length" },
        { front: "What does == vs === do?", back: "== compares value; === compares value AND type" },
      ],
      quiz: [
        { q: "Which keyword declares a constant?", options: ["var", "let", "const"], answer: 2 },
        { q: "What does '===' check?", options: ["Value only", "Value and type", "Reference only"], answer: 1 },
        { q: "What does [1,2,3].map(n => n*2) return?", options: ["[1,2,3]", "[2,4,6]", "6"], answer: 1 },
        { q: "Which method removes items from an array based on a test?", options: ["map", "filter", "reduce"], answer: 1 },
        { q: "How do you make a function async?", options: ["async function f()", "function async f()", "f().async"], answer: 0 },
        { q: "What does 'await' do?", options: ["Pauses until a promise resolves", "Skips a function", "Blocks forever"], answer: 0 },
      ],
      task: "Build a to-do app with add/delete/complete functionality using vanilla JS.",
      challenge: {
        title: "Double Every Number",
        description: "Write a function that returns a new array with each number doubled.",
        starterCode: `function doubleAll(arr) {\n  // your code\n}\n\n// doubleAll([1,2,3]) → [2,4,6]`,
        expectedKeywords: ["map"],
        hint: "Use arr.map(n => n * 2)",
      },
    },
    {
  type: "typing",
  title: "JS Keyword Sprint",
  description: "Type JavaScript keywords fast!",
  words: ["const", "let", "function", "return", "async", "await", "class", "new", "typeof", "instanceof"],
  timeLimit: 20,
},
    {
      id: "react", label: "React", x: 660, y: -20, xp: 180, children: ["next"],
      description: "Component-based UI library by Meta. The industry standard for frontends.",
      notes: `# React\n\nReact builds UIs from **components** — reusable pieces of UI.\n\n## Component\n\`\`\`jsx\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\`\`\`\n\n## State with useState\n\`\`\`jsx\nconst [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>+1</button>\n\`\`\`\n\n## Effects with useEffect\n\`\`\`jsx\nuseEffect(() => {\n  console.log("mounted");\n  return () => console.log("cleanup");\n}, []);\n\`\`\`\n\n## Props\nPass data: \`<Card title="Hi" count={3} />\`\n\n## Lists\n\`\`\`jsx\n{items.map(i => <li key={i.id}>{i.name}</li>)}\n\`\`\``,
      resources: [{ title: "React Official Tutorial", url: "https://react.dev/learn" }],
      flashcards: [
        { front: "Which hook manages state?", back: "useState" },
        { front: "Which hook runs side effects?", back: "useEffect" },
        { front: "Why do we need 'key' in lists?", back: "So React can identify which items changed" },
      ],
      quiz: [
        { q: "Which hook manages state?", options: ["useEffect", "useState", "useContext"], answer: 1 },
        { q: "How do you pass data to a child?", options: ["state", "props", "context"], answer: 1 },
        { q: "When does useEffect run with [] deps?", options: ["Every render", "Once on mount", "Never"], answer: 1 },
      ],
      task: "Rebuild your to-do app as a React component with state and props.",
      challenge: {
        title: "Counter Component",
        description: "Write a React component with a button that increments a counter.",
        starterCode: `function Counter() {\n  // your code\n  return <button>Count</button>;\n}`,
        expectedKeywords: ["useState", "setCount", "onClick"],
        hint: "useState(0) + onClick handler + setCount(prev => prev+1)",
      },
    },
    {
  type: "typing",
  title: "React Hook Sprint",
  description: "Type React hooks and keywords fast!",
  words: ["useState", "useEffect", "useContext", "useRef", "useMemo", "useCallback", "props", "component", "render", "state"],
  timeLimit: 20,
},
{
  type: "quizrush",
  title: "JavaScript Speed Round",
  description: "Answer fast — beat the clock!",
  timePerQuestion: 8,
  questions: [
    { q: "Which keyword makes a variable constant?", options: ["var", "let", "const"], answer: 2 },
    { q: "What does === check?", options: ["Value", "Value & type", "Reference"], answer: 1 },
    { q: "Which returns a new array?", options: ["forEach", "map", "push"], answer: 1 },
    { q: "Which is async?", options: ["await", "async function", "both"], answer: 2 },
    { q: "What is null + 1?", options: ["null", "1", "NaN"], answer: 1 },
  ],
},
    {
      id: "next", label: "Next.js", x: 880, y: -20, xp: 180, children: ["boss"],
      description: "Full-stack React framework with SSR, routing, and API routes.",
      notes: `# Next.js\n\nThe production framework for React.\n\n## Features\n- **File-based routing** (\`app/page.jsx\`)\n- **Server-side rendering** (SSR)\n- **API routes** (\`app/api/x/route.js\`)\n- **Image / font optimization**\n\n## Pages\n\`\`\`jsx\n// app/about/page.jsx\nexport default function About() { return <h1>About</h1>; }\n\`\`\`\n\n## Server Components (default)\nRun on server, no client JS. Add "use client" for interactivity.`,
      resources: [{ title: "Next.js Learn", url: "https://nextjs.org/learn" }],
      flashcards: [{ front: "How does Next.js route?", back: "File-based — the folder structure is the URL" }],
      quiz: [
        { q: "How does Next.js route?", options: ["Config file", "File-based", "URL string only"], answer: 1 },
      ],
      task: "Convert your React to-do app to Next.js.",
      challenge: {
        title: "Folder Routing",
        description: "What folder name creates the /about route? (as comment)",
        starterCode: `// answer`,
        expectedKeywords: ["about"],
        hint: "app/about/page.jsx",
      },
    },
    {
      id: "boss", label: "🏆 Final Project", x: 1100, y: -20, xp: 500, children: [],
      boss: true, badge: "Full Stack Boss",
      description: "Build and deploy a full-stack app with auth, database, and a live URL.",
      notes: `# Final Project\n\nCombine everything: HTML, CSS, JS, React, Next.js, Git.\n\n## Requirements\n- Full-stack (frontend + backend)\n- Real database\n- Auth\n- Deployed live\n- Clean Git history\n- README with screenshots`,
      resources: [{ title: "Deploy on Vercel", url: "https://vercel.com/docs" }],
      flashcards: [],
      quiz: [],
      task: "Build a full-stack app (with DB + auth), deploy it, and share the live link.",
      challenge: {
        title: "Ship It",
        description: "Paste your deployed URL below and submit for peer review.",
        starterCode: `https://your-app.vercel.app`,
        expectedKeywords: ["http"],
        hint: "Must be a working URL.",
      },
    },
  ],
};

// ============ DSA TREE ============
export const dsaTree = {
  id: "dsa",
  name: "Data Structures & Algorithms",
  icon: "🧠",
  nodes: [
    {
      id: "arrays", label: "Arrays", x: 0, y: 0, xp: 100, children: ["strings", "sorting"],
      description: "Contiguous memory, indexing, traversal.",
      notes: `# Arrays\n\nAn array stores elements in **contiguous memory**, accessed by index in O(1).\n\n## Common Operations\n| Operation | Time |\n|---|---|\n| Access by index | O(1) |\n| Search (unsorted) | O(n) |\n| Insert at end | O(1) |\n| Insert at start | O(n) |\n\n## Two-Pointer Technique\n\`\`\`js\nfunction twoSum(arr, target) {\n  let l = 0, r = arr.length - 1;\n  while (l < r) {\n    const s = arr[l] + arr[r];\n    if (s === target) return [l, r];\n    s < target ? l++ : r--;\n  }\n}\n\`\`\`\n\n## Sliding Window\nFor subarray problems — maintain a window and slide it.`,
      resources: [{ title: "Arrays — GeeksforGeeks", url: "https://www.geeksforgeeks.org/array-data-structure/" }],
      flashcards: [
        { front: "Access time for array[i]?", back: "O(1)" },
        { front: "When to use two pointers?", back: "Sorted arrays, pairs, or palindrome checks" },
      ],
      quiz: [
        { q: "Time complexity of accessing array[i]?", options: ["O(1)", "O(log n)", "O(n)"], answer: 0 },
        { q: "Inserting at start of array is?", options: ["O(1)", "O(n)", "O(log n)"], answer: 1 },
        { q: "Two-pointer works best on?", options: ["Unsorted", "Sorted", "Empty arrays"], answer: 1 },
        { q: "Sliding window is used for?", options: ["Sorting", "Subarray problems", "Trees"], answer: 1 },
      ],
      task: "Solve 10 easy array problems on LeetCode.",
      challenge: {
        title: "Find Max",
        description: "Write a function returning the maximum element of an array.",
        starterCode: `function findMax(arr) {\n  // your code\n}`,
        expectedKeywords: ["Math.max", "for", "reduce"],
        hint: "Loop or Math.max(...arr)",
      },
    },
    {
      type: "typing",
      title: "Array Method Sprint",
      description: "Type array methods fast!",
      words: ["map", "filter", "reduce", "forEach", "find", "push", "pop", "shift", "slice", "splice"],
      timeLimit: 20,
    },
    {
      id: "strings", label: "Strings", x: 220, y: -80, xp: 90, children: ["hashing"],
      description: "Character arrays, palindromes, anagrams.",
      notes: `# Strings\n\nStrings are sequences of characters. Immutable in most languages.\n\n## Common Techniques\n- **Two pointers** — palindrome check\n- **HashMap** — count characters\n- **Sliding window** — longest substring\n\n## Palindrome\n\`\`\`js\nfunction isPal(s) {\n  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return s === [...s].reverse().join("");\n}\n\`\`\``,
      resources: [],
      flashcards: [{ front: "How to check if two strings are anagrams?", back: "Sort both or use a char-count HashMap" }],
      quiz: [
        { q: "Two-pointer palindrome checks from?", options: ["Middle", "Both ends", "Random"], answer: 1 },
        { q: "Best DS to count char frequency?", options: ["Array of arrays", "HashMap", "Linked list"], answer: 1 },
      ],
      task: "Solve 5 string problems.",
      challenge: {
        title: "Reverse a String",
        description: "Return the reverse of a string.",
        starterCode: `function reverse(s) {\n  // your code\n}`,
        expectedKeywords: ["reverse", "split"],
        hint: "s.split('').reverse().join('')",
      },
    },
    {
      id: "sorting", label: "Sorting", x: 220, y: 80, xp: 100, children: ["hashing"],
      description: "Bubble, Merge, Quick sort and their complexities.",
      notes: `# Sorting Algorithms\n\n| Algo | Time | Space | Stable? |\n|---|---|---|---|\n| Bubble | O(n²) | O(1) | Yes |\n| Insertion | O(n²) | O(1) | Yes |\n| Merge | O(n log n) | O(n) | Yes |\n| Quick | O(n log n) avg | O(log n) | No |\n| Heap | O(n log n) | O(1) | No |\n\n## Merge Sort\nDivide → conquer → merge. Recursive.`,
      resources: [],
      flashcards: [{ front: "Time complexity of merge sort?", back: "O(n log n) — always" }],
      quiz: [
        { q: "Which sort is O(n log n) worst case?", options: ["Bubble", "Merge", "Insertion"], answer: 1 },
        { q: "Quick sort worst case?", options: ["O(n log n)", "O(n²)", "O(n)"], answer: 1 },
      ],
      task: "Implement merge sort and quick sort from scratch.",
      challenge: {
        title: "Bubble Sort",
        description: "Implement bubble sort.",
        starterCode: `function bubbleSort(arr) {\n  // your code\n}`,
        expectedKeywords: ["for", "swap"],
        hint: "Two nested loops, swap if arr[j] > arr[j+1].",
      },
    },
    {
      id: "hashing", label: "Hashing", x: 440, y: 0, xp: 120, children: ["trees"],
      description: "Hash maps, sets, and collision handling.",
      notes: `# Hashing\n\nHash function maps keys to buckets → O(1) average lookup.\n\n## Collisions\n- **Chaining** — each bucket is a linked list\n- **Open addressing** — probe next slot\n\n## Use Cases\n- Frequency counting\n- Two-sum problem\n- Caching`,
      resources: [],
      flashcards: [{ front: "Average time for HashMap lookup?", back: "O(1)" }],
      quiz: [
        { q: "Average lookup in HashMap?", options: ["O(1)", "O(log n)", "O(n)"], answer: 0 },
      ],
      task: "Solve 10 hashing problems.",
      challenge: {
        title: "Frequency Counter",
        description: "Return an object mapping each element to its count.",
        starterCode: `function count(arr) {\n  // your code\n}`,
        expectedKeywords: ["{}", "for"],
        hint: "Loop and increment counts.",
      },
    },
    {
      id: "trees", label: "Trees", x: 660, y: 0, xp: 150, children: ["graphs"],
      description: "Binary trees, BST, traversals.",
      notes: `# Trees\n\nHierarchical structure: each node has children.\n\n## Binary Tree Traversals\n- **Inorder** (L, Root, R) → sorted for BST\n- **Preorder** (Root, L, R)\n- **Postorder** (L, R, Root)\n- **Level-order** (BFS with queue)\n\n## BST Property\nLeft < Root < Right. Search in O(log n) if balanced.`,
      resources: [],
      flashcards: [{ front: "Inorder traversal of BST gives?", back: "Sorted order" }],
      quiz: [
        { q: "Inorder traversal of a BST gives?", options: ["Reverse sorted", "Sorted order", "Random"], answer: 1 },
        { q: "BST search time (balanced)?", options: ["O(1)", "O(log n)", "O(n)"], answer: 1 },
      ],
      task: "Implement BST with insert/delete/search.",
      challenge: {
        title: "Tree Depth",
        description: "Return the max depth of a binary tree.",
        starterCode: `function depth(node) {\n  // your code\n}`,
        expectedKeywords: ["Math.max", "null"],
        hint: "1 + Math.max(depth(left), depth(right))",
      },
    },
    {
      id: "graphs", label: "Graphs", x: 880, y: 0, xp: 180, children: ["boss-dsa"],
      description: "BFS, DFS, shortest paths.",
      notes: `# Graphs\n\nNodes + edges. Can be directed, undirected, weighted.\n\n## Representations\n- **Adjacency list** — space efficient, common\n- **Adjacency matrix** — fast edge check, O(V²) space\n\n## Traversals\n- **BFS** — queue, shortest path in unweighted\n- **DFS** — stack/recursion, cycle detection`,
      resources: [],
      flashcards: [{ front: "BFS uses which DS?", back: "Queue" }],
      quiz: [
        { q: "BFS uses which structure?", options: ["Stack", "Queue", "Heap"], answer: 1 },
        { q: "DFS uses which structure?", options: ["Stack/recursion", "Queue", "Array"], answer: 0 },
      ],
      task: "Implement BFS and DFS.",
      challenge: {
        title: "BFS Order",
        description: "Return nodes visited by BFS as an array.",
        starterCode: `function bfs(graph, start) {\n  // your code\n}`,
        expectedKeywords: ["queue", "visited"],
        hint: "Use an array as queue, track visited set.",
      },
    },
    {
      id: "boss-dsa", label: "🏆 DSA Boss", x: 1100, y: 0, xp: 500, children: [], boss: true,
      badge: "DSA Champion",
      description: "Solve 100 curated problems across topics.",
      notes: `# DSA Championship\n\nTime to prove mastery. Solve 100 problems.\n\n## Where to Practice\n- LeetCode\n- Codeforces\n- HackerRank\n\n## Topics to cover\nArrays, Strings, Trees, Graphs, DP, Greedy, Backtracking`,
      resources: [],
      flashcards: [],
      quiz: [],
      task: "Complete 100 problems on LeetCode.",
      challenge: {
        title: "Share Progress",
        description: "Paste your LeetCode profile URL.",
        starterCode: `https://leetcode.com/your-username`,
        expectedKeywords: ["leetcode"],
        hint: "Any LeetCode URL works.",
      },
    },
  ],
};

// Python / ML / DevOps — abbreviated (same rich structure, shorter content)
export const pythonTree = {
  id: "python", name: "Python Developer", icon: "🐍",
  nodes: [
    { id: "py-basics", label: "Python Basics", x: 0, y: 0, xp: 100, children: ["py-oop", "py-files"],
      description: "Variables, loops, functions, data types.",
      notes: `# Python Basics\n\n## Hello World\n\`\`\`python\nprint("Hello, world")\n\`\`\`\n\n## Variables\n\`\`\`python\nname = "Raj"    # str\nage = 20         # int\npi = 3.14        # float\nok = True        # bool\n\`\`\`\n\n## Loops\n\`\`\`python\nfor i in range(5): print(i)\nwhile x < 10: x += 1\n\`\`\`\n\n## Functions\n\`\`\`python\ndef greet(name):\n    return f"Hi {name}"\n\`\`\``,
      resources: [{ title: "Python.org Tutorial", url: "https://docs.python.org/3/tutorial/" }],
      flashcards: [{ front: "How do you define a function in Python?", back: "def name(args):" }],
      quiz: [
        { q: "Correct way to define a function?", options: ["function f()", "def f():", "fn f()"], answer: 1 },
        { q: "How do you print in Python?", options: ["echo", "console.log", "print()"], answer: 2 },
        { q: "Python uses ___ for code blocks?", options: ["Braces {}", "Indentation", "BEGIN/END"], answer: 1 },
      ],
      task: "Write a CLI calculator.",
      challenge: { title: "Sum Function", description: "Write a function that returns the sum of two numbers.", starterCode: `def add(a, b):\n    # your code`, expectedKeywords: ["return"], hint: "return a + b" },
    },
    { id: "py-oop", label: "OOP", x: 220, y: -80, xp: 120, children: ["py-web"], description: "Classes, inheritance, dunder methods.",
      notes: `# Python OOP\n\n\`\`\`python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name} says woof"\n\nd = Dog("Rex")\nprint(d.bark())\n\`\`\`\n\n## Inheritance\n\`\`\`python\nclass Puppy(Dog):\n    def play(self): return "playing"\n\`\`\``,
      resources: [], flashcards: [{ front: "What is __init__?", back: "Constructor method — runs on object creation" }],
      quiz: [{ q: "What is the constructor in Python?", options: ["__new__", "__init__", "construct"], answer: 1 }],
      task: "Build a class hierarchy for a library system.",
      challenge: { title: "Class Basics", description: "Create a class with a method returning 'hi'.", starterCode: `class Greeter:\n    # your code`, expectedKeywords: ["def", "self"], hint: "Define a method inside the class." },
    },
    { id: "py-files", label: "File I/O", x: 220, y: 80, xp: 80, children: ["py-web"], description: "Read/write files, JSON, CSV.",
      notes: `# File I/O\n\n\`\`\`python\nwith open("data.txt", "r") as f:\n    content = f.read()\n\nwith open("out.txt", "w") as f:\n    f.write("hello")\n\`\`\`\n\n## JSON\n\`\`\`python\nimport json\nwith open("data.json") as f:\n    data = json.load(f)\n\`\`\``,
      resources: [], flashcards: [],
      quiz: [{ q: "Which mode overwrites a file?", options: ["r", "w", "a"], answer: 1 }],
      task: "Build a CSV journal app.",
      challenge: { title: "Read File", description: "Read a file and return its content.", starterCode: `def read(path):\n    # your code`, expectedKeywords: ["open"], hint: "Use with open(path) as f: return f.read()" },
    },
    { id: "py-web", label: "Flask / FastAPI", x: 440, y: 0, xp: 150, children: ["py-db"], description: "Build REST APIs with Python.",
      notes: `# Flask / FastAPI\n\n## Flask\n\`\`\`python\nfrom flask import Flask\napp = Flask(__name__)\n\n@app.route("/")\ndef home(): return {"msg": "hi"}\n\`\`\`\n\n## FastAPI (modern)\n\`\`\`python\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/")\ndef home(): return {"msg": "hi"}\n\`\`\``,
      resources: [], flashcards: [],
      quiz: [{ q: "FastAPI is based on?", options: ["Django", "Starlette + Pydantic", "Flask"], answer: 1 }],
      task: "Create a REST API with 3 endpoints.",
      challenge: { title: "First Route", description: "Write a Flask route returning 'hello'.", starterCode: `@app.route("/hello")\ndef hello():\n    # your code`, expectedKeywords: ["return"], hint: "return 'hello'" },
    },
    { id: "py-db", label: "Databases", x: 660, y: 0, xp: 120, children: ["py-boss"], description: "SQLite, PostgreSQL, ORMs.",
      notes: `# Databases in Python\n\n## SQLAlchemy (ORM)\n\`\`\`python\nfrom sqlalchemy import Column, Integer, String\nclass User(Base):\n    __tablename__ = "users"\n    id = Column(Integer, primary_key=True)\n    name = Column(String)\n\`\`\``,
      resources: [], flashcards: [],
      quiz: [{ q: "ORM stands for?", options: ["Object-Relational Mapping", "Only Raw MySQL", "Ordered Rows Mode"], answer: 0 }],
      task: "Persist API data with SQLAlchemy.",
      challenge: { title: "Define Model", description: "Define a Book model with id + title.", starterCode: `class Book(Base):\n    # your code`, expectedKeywords: ["__tablename__", "Column"], hint: "Use Column(Integer) and Column(String)." },
    },
    { id: "py-boss", label: "🏆 Python Boss", x: 880, y: 0, xp: 400, children: [], boss: true, badge: "Pythonista", description: "Ship a full backend project.",
      notes: `# Python Final Project\n\nBuild and deploy a full backend.`,
      resources: [], flashcards: [], quiz: [],
      task: "Deploy a Python API to Render.",
      challenge: { title: "Deploy URL", description: "Paste your deployed API URL.", starterCode: `https://your-api.onrender.com`, expectedKeywords: ["http"], hint: "" },
    },
  ],
};

export const mlTree = {
  id: "ml", name: "Machine Learning", icon: "🤖",
  nodes: [
    { id: "ml-math", label: "Math Foundations", x: 0, y: 0, xp: 120, children: ["ml-numpy"],
      description: "Linear algebra, probability, calculus.",
      notes: `# Math for ML\n\n## Linear Algebra\n- Vectors, matrices\n- Dot product, matrix multiply\n- Eigenvalues (PCA)\n\n## Probability\n- Distributions\n- Bayes' theorem\n\n## Calculus\n- Derivatives (gradient descent!)`,
      resources: [], flashcards: [], quiz: [{ q: "Gradient descent uses?", options: ["Derivatives", "Integrals", "Logs"], answer: 0 }],
      task: "Complete Khan Academy linear algebra.",
      challenge: { title: "Matrix Multiply", description: "Multiply two 2x2 matrices (as comment).", starterCode: `# answer`, expectedKeywords: ["row", "column"], hint: "Row × column dot products." },
    },
    { id: "ml-numpy", label: "NumPy + Pandas", x: 220, y: 0, xp: 130, children: ["ml-sklearn"], description: "Data manipulation libraries.",
      notes: `# NumPy & Pandas\n\n\`\`\`python\nimport numpy as np\nimport pandas as pd\n\na = np.array([1,2,3])\ndf = pd.read_csv("data.csv")\ndf.head()\ndf.describe()\n\`\`\``,
      resources: [], flashcards: [], quiz: [{ q: "Which library for DataFrames?", options: ["NumPy", "Pandas", "SciPy"], answer: 1 }],
      task: "Analyze a Kaggle CSV dataset.",
      challenge: { title: "Mean with NumPy", description: "Compute the mean of an array.", starterCode: `import numpy as np\ndef mean(arr):\n    # your code`, expectedKeywords: ["np.mean"], hint: "np.mean(arr)" },
    },
    { id: "ml-sklearn", label: "Scikit-Learn", x: 440, y: 0, xp: 140, children: ["ml-dl"], description: "Classic ML algorithms.",
      notes: `# Scikit-Learn\n\n\`\`\`python\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npreds = model.predict(X_test)\n\`\`\``,
      resources: [], flashcards: [], quiz: [{ q: "What does .fit() do?", options: ["Predicts", "Trains", "Loads data"], answer: 1 }],
      task: "Train a classifier on Iris dataset.",
      challenge: { title: "Fit and Predict", description: "Train a model and predict.", starterCode: `model.fit(X, y)\n# next line?`, expectedKeywords: ["predict"], hint: "model.predict(X_test)" },
    },
    { id: "ml-dl", label: "Deep Learning", x: 660, y: 0, xp: 180, children: ["ml-boss"], description: "Neural networks with PyTorch/TensorFlow.",
      notes: `# Deep Learning\n\nNeural networks = layers of neurons.\n\n\`\`\`python\nimport torch.nn as nn\nmodel = nn.Sequential(\n  nn.Linear(784, 128),\n  nn.ReLU(),\n  nn.Linear(128, 10)\n)\n\`\`\``,
      resources: [], flashcards: [], quiz: [{ q: "Activation function used most in hidden layers?", options: ["Softmax", "ReLU", "Sigmoid"], answer: 1 }],
      task: "Build a CNN for MNIST.",
      challenge: { title: "Neural Net Layer", description: "Write a Linear layer 10 → 5.", starterCode: `# your code`, expectedKeywords: ["Linear(10, 5)", "nn.Linear"], hint: "nn.Linear(10, 5)" },
    },
    { id: "ml-boss", label: "🏆 ML Boss", x: 880, y: 0, xp: 500, children: [], boss: true, badge: "ML Engineer", description: "Deploy an ML model as an API.",
      notes: `# Deploy ML Model\n\nWrap your model in FastAPI:\n\n\`\`\`python\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.post("/predict")\ndef predict(data: dict):\n    return {"prediction": model.predict([data["features"]])}\n\`\`\``,
      resources: [], flashcards: [], quiz: [],
      task: "Serve a trained model via FastAPI.",
      challenge: { title: "Deploy URL", description: "Paste deployed ML API URL.", starterCode: `https://`, expectedKeywords: ["http"], hint: "" },
    },
  ],
};

export const devopsTree = {
  id: "devops", name: "DevOps Engineer", icon: "⚙️",
  nodes: [
    { id: "linux", label: "Linux Basics", x: 0, y: 0, xp: 100, children: ["docker"], description: "Shell, permissions, processes.",
      notes: `# Linux Basics\n\n\`\`\`bash\nls -la              # list files\ncd /var/log\nchmod 755 script.sh\nps aux | grep node\n\`\`\`\n\n## Permissions\n- rwx = 4+2+1\n- 755 = owner rwx, others r-x`,
      resources: [], flashcards: [], quiz: [{ q: "chmod 755 means?", options: ["rwxr-xr-x", "rwxrwxrwx", "rw-------"], answer: 0 }],
      task: "Set up a Linux VM and complete 20 shell exercises.",
      challenge: { title: "List All Files", description: "Which command lists all files including hidden?", starterCode: `# answer`, expectedKeywords: ["ls -la", "ls -a"], hint: "-a shows hidden." },
    },
    { id: "docker", label: "Docker", x: 220, y: 0, xp: 150, children: ["k8s", "ci"], description: "Containers, images, Docker Compose.",
      notes: `# Docker\n\nA container packages your app + dependencies.\n\n## Dockerfile\n\`\`\`dockerfile\nFROM node:18\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["node", "server.js"]\n\`\`\`\n\n\`\`\`bash\ndocker build -t myapp .\ndocker run -p 3000:3000 myapp\n\`\`\``,
      resources: [], flashcards: [], quiz: [{ q: "Dockerfile FROM specifies?", options: ["App name", "Base image", "Port"], answer: 1 }],
      task: "Dockerize a Node app.",
      challenge: { title: "Dockerfile CMD", description: "Write the CMD line to run server.js.", starterCode: `CMD `, expectedKeywords: ["node", "server.js"], hint: "CMD [\"node\", \"server.js\"]" },
    },
    { id: "ci", label: "CI/CD", x: 440, y: -80, xp: 140, children: ["k8s"], description: "GitHub Actions, automated testing.",
      notes: `# CI/CD\n\nGitHub Actions — YAML files in \`.github/workflows/\`.\n\n\`\`\`yaml\nname: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm install\n      - run: npm test\n\`\`\``,
      resources: [], flashcards: [], quiz: [{ q: "GitHub Actions config lives in?", options: [".github/workflows", "actions/", "config/"], answer: 0 }],
      task: "Add a CI pipeline to your repo.",
      challenge: { title: "Trigger", description: "Which YAML key defines what triggers a workflow?", starterCode: `# answer`, expectedKeywords: ["on"], hint: "on: [push, pull_request]" },
    },
    { id: "k8s", label: "Kubernetes", x: 440, y: 60, xp: 200, children: ["cloud"], description: "Pods, services, deployments.",
      notes: `# Kubernetes\n\nOrchestrates containers across many machines.\n\n\`\`\`yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: my-pod\nspec:\n  containers:\n    - name: app\n      image: myapp\n\`\`\``,
      resources: [], flashcards: [], quiz: [{ q: "Smallest deployable unit in K8s?", options: ["Container", "Pod", "Node"], answer: 1 }],
      task: "Deploy an app to a local k8s cluster.",
      challenge: { title: "K8s Kind", description: "Which field specifies the type of resource?", starterCode: `# answer`, expectedKeywords: ["kind"], hint: "kind: Pod" },
    },
    { id: "cloud", label: "Cloud (AWS)", x: 660, y: 60, xp: 150, children: ["devops-boss"], description: "EC2, S3, IAM basics.",
      notes: `# AWS Basics\n\n- **EC2** — virtual machines\n- **S3** — object storage\n- **IAM** — permissions\n- **Lambda** — serverless functions`,
      resources: [], flashcards: [], quiz: [{ q: "S3 is for?", options: ["VMs", "Object storage", "DNS"], answer: 1 }],
      task: "Host a static site on S3.",
      challenge: { title: "Which service for VMs?", description: "Write the AWS service for virtual machines.", starterCode: `# answer`, expectedKeywords: ["ec2"], hint: "EC2" },
    },
    { id: "devops-boss", label: "🏆 DevOps Boss", x: 880, y: 60, xp: 500, children: [], boss: true, badge: "DevOps Pro", description: "Full CI/CD + Kubernetes deploy.",
      notes: `# Final DevOps Challenge\n\nShip a containerized app with auto-deploy to K8s.`,
      resources: [], flashcards: [], quiz: [],
      task: "Ship a containerized app with auto-deploy.",
      challenge: { title: "Live URL", description: "Paste your deployed app URL.", starterCode: `https://`, expectedKeywords: ["http"], hint: "" },
    },
  ],
};

export const allTrees = {
  webdev: webDevTree,
  dsa: dsaTree,
  python: pythonTree,
  ml: mlTree,
  devops: devopsTree,
};