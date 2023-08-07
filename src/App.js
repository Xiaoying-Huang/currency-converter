// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [outputCurrency, setOutputCurrency] = useState("EUR");
  const [convertAmount, setConvertAmount] = useState(1);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchConvertedCurrency() {
      setIsLoading(true);
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${convertAmount}&from=${inputCurrency}&to=${outputCurrency}`);
      const data = await res.json();
      if (data.message === "not found") {
        return;
      }
      setOutput(current => data["rates"][outputCurrency] + " " + outputCurrency);
      setIsLoading(false);
    }
    if (inputCurrency === outputCurrency) {
      return setOutput(convertAmount + " " + inputCurrency);
    }
    fetchConvertedCurrency();
  }, [inputCurrency, outputCurrency, convertAmount]);

  return (
    <div>
      <input type="text" onChange={(e) => setConvertAmount(Number(e.target.value))} value={convertAmount} disabled={isLoading} />
      <select onChange={(e) => setInputCurrency(current => e.target.value)} value={inputCurrency} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => setOutputCurrency(current => e.target.value)} value={outputCurrency} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Loading..." : output}</p>
    </div>
  );
}
