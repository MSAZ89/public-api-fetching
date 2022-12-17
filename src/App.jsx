import { useState, useEffect, useRef } from "react";

function App() {
  //fetch data from api and set it to data
  const fetchData = async () => {
    const response = await fetch("https://api.publicapis.org/entries");
    const data = await response.json();
    setStoredData(data.entries);
  };

  const [storedData, setStoredData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [active, setActive] = useState("");

  const filter = storedData.filter((entry) => {
    return entry.Category === filterName;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const updateFilter = (filterName, buttonIndex) => {
    setFilterName(filterName);
    setActive(buttonIndex);
  };

  return (
    <div className="p-4">
      <h1 className="my-8 pb-4 text-center mx-auto text-2xl">
        Public API List
      </h1>
      <div className="flex flex-wrap gap-2 mb-8 justify-center items-center">
        <button
          className="bg-slate-700 transition-all text-white p-1 rounded text-sm border-2 border-slate-700"
          onClick={() => updateFilter("")}
        >
          Clear
        </button>
        {/*Filters*/}
        <>
          {
            //map all categories to a form select option, reduce to unique values
            storedData
              .map((entry) => entry.Category)
              .reduce((unique, item) => {
                return unique.includes(item) ? unique : [...unique, item];
              }, [])
              .map((entry, index) => (
                <button
                  className={
                    active === index
                      ? "bg-slate-100 transition-all text-black p-1 rounded border border-slate-500"
                      : "bg-slate-700 transition-all text-white p-1 rounded border border-slate-700"
                  }
                  key={index}
                  onClick={() => updateFilter(entry, index)}
                >
                  {entry}
                </button>
              ))
          }
        </>
      </div>
      <p className="font-bold tracking-tighter text-xl uppercase">
        {filter.length > 0
          ? filter.length + " results for " + filterName
          : null}
      </p>
      {storedData !== [] ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 divide-y">
          {filter != ""
            ? filter.map((entry, index) => (
                <div
                  className="bg-slate-800 px-8 py-8 rounded text-white my-1"
                  key={index}
                >
                  <p className="text-xl font-bold mb-2">{entry.API}</p>
                  <a
                    className="tracking-tight text-slate-400 hover:text-slate-300 transition-all break-words"
                    target={"_blank"}
                    rel="noreferrer"
                    href={entry.Link}
                  >
                    {entry.Link}
                  </a>
                  <div className="bg-slate-700 space-4 text-white py-2 rounded mt-4">
                    <p className="mb-4 text-md m-4">{entry.Description}</p>
                    <p className="mb-4 text-sm m-4">
                      <span className="font-bold">Category:</span>{" "}
                      {entry.Category}
                    </p>
                    <p className="mb-4 text-sm m-4">
                      <span className="font-bold">Auth:</span> {entry.Auth}
                    </p>
                    <p className="mb-4 text-sm m-4">
                      <span className="font-bold">HTTPS:</span>{" "}
                      {entry.HTTPS.toString()}
                    </p>
                    <p className="text-sm m-4">
                      <span className="font-bold">CORS:</span>{" "}
                      {entry.Cors === "yes" ? (
                        <span className="text-orange-400">Yes</span>
                      ) : (
                        <span className="text-lime-400">No</span>
                      )}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
