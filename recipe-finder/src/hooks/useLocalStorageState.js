import { useEffect, useState } from "react";

export function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(function () {
    const savedData = localStorage.getItem(key);
    if (savedData === null) {
      return initialValue;
    } else {
      return JSON.parse(savedData);
    }
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
