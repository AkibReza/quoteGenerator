import { useState, useEffect, useMemo } from "react";

function App() {
  const [text, updateText] = useState("");
  const [author, updateAuthor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState();

  const colors = useMemo(
    () => [
      "hsl(347,100%,69.4%)",
      "hsl(204,81.9%,56.7%)",
      "hsl(43,100%,66.9%)",
      "hsl(180,48.1%,52.4%)",
      "hsl(260,100%,70%)",
      "hsl(30,100%,62.5%)",
      "hsl(205,70.6%,41.4%)",
      "hsl(320,100%,70%)",
      "hsl(89,55.7%,62%)",
      "hsl(354,80.9%,63.1%)",
      "hsl(10,96.6%,65.3%)",
      "hsl(165,58.4%,54.7%)",
      "hsl(214,79%,64.5%)",
      "hsl(257,70.3%,74.9%)",
      "hsl(326,72.7%,72.7%)",
      "hsl(42,100%,73.3%)",
    ],
    []
  );

  useEffect(() => {
    setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [colors]);

  const quoteData = async () => {
    const response = await fetch("https://api.quotable.io/quotes/random");
    const data = await response.json();
    const newData = data[Math.floor(Math.random() * data.length)];

    return newData;
  };

  const quoteGenerator = async () => {
    const data = await quoteData();
    setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
    updateText('"' + data.content + '"');
    if (data.author == null) {
      updateAuthor("- Unknown");
    } else {
      updateAuthor("- " + data.author);
    }
  };
  const isDarkMode = backgroundColor
    ? parseInt(backgroundColor.split(",")[2].slice(0, -2)) < 65
    : false;

  return (
    <div className="App font-mono" style={{ backgroundColor: backgroundColor }}>
      <h1 className="text-4xl text-center">Famous Quotes Generator</h1>
      <div className="max-w-lg my-8 mx-auto">
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={quoteGenerator}
        >
          Click Me!
        </button>
      </div>
      <div className="text-center px-12 md:px-32 lg:px-48 ">
        <p className="lg:text-2xl">{text}</p>
        <p
          className={`lg:text-xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {author}
        </p>
      </div>
    </div>
  );
}

export default App;
