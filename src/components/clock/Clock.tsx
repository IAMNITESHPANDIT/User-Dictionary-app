import { useEffect, useState } from "react";

import "./clock.style.scss";

interface ClockProps {}

interface Country {
  label: string;
  value: string;
}

const Clock: React.FC<ClockProps> = () => {
  const [countries, setCountries] = useState<Country[]>();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [time, setTime] = useState<string | undefined>();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://worldtimeapi.org/api/timezone");
        const data = await response.json();
        const countryOptions: Country[] = data.map((country: string) => ({
          label: country,
          value: country,
        }));
        setCountries(countryOptions);
        setSelectedCountry(countryOptions[0]?.value || "");
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchTime = async () => {
      if (!selectedCountry) {
        return;
      }
      try {
        const response = await fetch(
          `https://worldtimeapi.org/api/timezone/${selectedCountry}`
        );
        const data = await response.json();
        const dateTime = new Date(data.datetime);
        const timeZone = selectedCountry;
        const options: Intl.DateTimeFormatOptions = {
          timeZone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        setTime(dateTime.toLocaleTimeString("en-US", options));
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };
    fetchTime();
  }, [selectedCountry]);

  useEffect(() => {
    if (!isPaused) {
      const id = setInterval(() => {
        setTime((prevTime: string | undefined) => {
          if (!prevTime) {
            return prevTime;
          }
          const [hours, minutes, seconds] = prevTime
            .split(":")
            .map(Number);
          const newSeconds = (seconds + 1) % 60;
          const newMinutes =
            (minutes + Math.floor((seconds + 1) / 60)) % 60;
          const newHours = (hours + Math.floor((minutes + 1) / 60)) % 24;
          return `${String(newHours).padStart(2, "0")}:${String(
            newMinutes
          ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isPaused]);

  return (
    <div className="clock">
      <select
        onChange={handleCountryChange}
        value={selectedCountry}
        className="dropdown"
      >
        {countries &&
          countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
      </select>
      <div className="time">{time}</div>
      <button className="control" onClick={togglePause}>
        {isPaused ? "Start" : "Pause"}
      </button>
    </div>
  );
};

export default Clock;
