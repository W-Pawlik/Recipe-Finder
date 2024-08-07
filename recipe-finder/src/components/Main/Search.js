export default function Search({ query, setQuery, ref }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search recipe..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={ref}
    ></input>
  );
}
