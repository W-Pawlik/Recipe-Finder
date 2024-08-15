import { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const areaOptions = [
  { code: "US", name: "American" },
  { code: "GB", name: "British" },
  { code: "CA", name: "Canadian" },
  { code: "CN", name: "Chinese" },
  { code: "HR", name: "Croatian" },
  { code: "NL", name: "Dutch" },
  { code: "EG", name: "Egyptian" },
  { code: "FR", name: "French" },
  { code: "GR", name: "Greek" },
  { code: "IN", name: "Indian" },
  { code: "IE", name: "Irish" },
  { code: "IT", name: "Italian" },
  { code: "JM", name: "Jamaican" },
  { code: "JP", name: "Japanese" },
  { code: "KE", name: "Kenyan" },
  { code: "MY", name: "Malaysian" },
  { code: "MX", name: "Mexican" },
  { code: "MA", name: "Moroccan" },
  { code: "PL", name: "Polish" },
  { code: "PT", name: "Portuguese" },
  { code: "RU", name: "Russian" },
  { code: "ES", name: "Spanish" },
  { code: "TH", name: "Thai" },
  { code: "TN", name: "Tunisian" },
  { code: "TR", name: "Turkish" },
  { code: "VN", name: "Vietnamese" },
];

export default function CountrySearch({ setRecipes, setError, setIsLoading }) {
  const [selected, setSelected] = useState("");

  function handleSelect(code) {
    const selected = areaOptions.find((area) => area.code === code);
    setSelected(selected.name);
  }

  useEffect(
    function () {
      async function fetchRecByCountry() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`
          );
          if (!res.ok) throw new Error("Problem with fetching recipes");

          const data = await res.json();
          if (data.meals === null) throw new Error("Recipe not found");
          setRecipes(data.meals);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (selected === "") return;
      fetchRecByCountry();
    },
    [selected, setRecipes, setError, setIsLoading]
  );

  return (
    <div className="countrySeach">
      <p>Choose country</p>
      <ReactFlagsSelect
        selected={selected}
        onSelect={handleSelect}
        searchable
        countries={areaOptions.map((country) => country.code)}
        customLabels={areaOptions.reduce((acc, area) => {
          acc[area.code] = area.name;
          return acc;
        }, {})}
      />
    </div>
  );
}
