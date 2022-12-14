import { useState, useEffect, useReducer } from "react";

function App() {
  //fetch data from api and set it to data
  const fetchData = async () => {
    const response = await fetch("https://api.publicapis.org/entries");
    const data = await response.json();
    setStoredData(data.entries);
  };

  const [storedData, setStoredData] = useState([]);
  const [filterName, setFilterName] = useState("");

  const filter = storedData.filter((entry) => {
    return entry.Category === filterName;
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="my-8 pb-4 text-center mx-auto text-2xl">
        Public API List
      </h1>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className="bg-slate-700 text-white font-bold p-2 rounded text-sm"
          onClick={() => setFilterName("")}
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
                  className="bg-slate-700 text-white font-bold p-2 rounded text-sm"
                  key={index}
                  onClick={() => setFilterName(entry)}
                >
                  {entry}
                </button>
              ))
          }
        </>
      </div>
      {storedData !== [] ? (
        <div className="grid grid-cols-3 gap-4 divide-y">
          {filter.length > 0
            ? filter.length + " results for " + filterName
            : null}
          {filter != ""
            ? filter.map((entry, index) => (
                <div
                  className="bg-slate-800 px-8 py-8 rounded text-white my-1"
                  key={index}
                >
                  <p className="text-xl font-bold mb-4">{entry.API}</p>
                  <div className="bg-slate-500 space-4 text-white py-2 rounded mb-4">
                    <p className="mb-4 text-md m-4">
                      <span className="font-bold">Note: </span>
                      {entry.Description}
                    </p>
                    <p className="mb-4 text-md m-4">
                      <span className="font-bold">Category:</span>{" "}
                      {entry.Category}
                    </p>
                    <p className="mb-4 text-md m-4">
                      <span className="font-bold">Auth:</span> {entry.Auth}
                    </p>
                  </div>
                  <a
                    className="tracking-tight text-slate-400 hover:text-slate-300 transition-all"
                    target={"_blank"}
                    rel="noreferrer"
                    href={entry.Link}
                  >
                    {entry.Link}
                  </a>
                </div>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
