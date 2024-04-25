"use client";
import { useEffect, useState } from "react";
import Tradercard from "../components/TraderCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function discoverPage() {
  const router = useRouter();
  const data = [
    { date: "jan 1", amt: 0 },
    { date: "jan 13", amt: 246 },
    { date: "jan 9", amt: 50 },

    { date: "jan 27", amt: 738 },
    { date: "jan 27", amt: 489 },
    { date: "jan 26", amt: 587 },
    { date: "jan 22", amt: 690 },
    { date: "jan 8", amt: 448 },
    { date: "jan 22", amt: 734 },

    { date: "jan 30", amt: 892 },
    { date: "jan 10", amt: 711 },
  ];
  const [value, setValue] = useState("0000000");

  const getTraderData = (e, id) => {
    e.stopPropagation();
    router.push(`/discover/${id}`, { shallow: false });
  };

  useEffect(() => {
    const finalValue = "1000687"; // Your desired final number
    const intervalId = setInterval(() => {
      const newValue = generateRandomValue(finalValue);
      setValue(newValue);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  const generateRandomValue = (finalValue) => {
    const randomValue = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, "0");
    const steps = 50; // Number of steps for the transition
    const stepDelay = 30; // Delay between each step

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const interpolatedValue = finalValue
          .split("")
          .map((digit, index) => {
            const startDigit = randomValue[index];
            const endDigit = digit;
            const progress = i / steps;
            const interpolatedDigit = Math.round(
              parseInt(startDigit, 10) +
                progress * (parseInt(endDigit, 10) - parseInt(startDigit, 10))
            );
            return interpolatedDigit.toString();
          })
          .join("");
        setValue(interpolatedValue);
      }, i * stepDelay);
    }

    return finalValue;
  };
  return (
    <section className="w-full flex justify-center items-center h-full">
      <div className="w-11/12 flex flex-col h-full p-4 pl-8 pr-8 pt-8">
        <div className="w-full search-bar-parent flex h-10 items-center">
          <input
            className="w-full p-3 search-bar primary-color-bar rounded-xl"
            placeholder="Enter a value"
            data-cursor-text="Search"
            data-cursor-size="100px"
          />
          <img
            className="h-5 search-bar-icon"
            alt="logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuklEQVR4nO2Zy05TURSGNwNx6oTWcBmgj+AAxMsrmCiYQk2I+gAmqLEhAZ0BL2DiSB2YkMaBWsJYixNvb+DEqTrCiEKrn1l0nbg9aaAb1ml76vmTk5708v/rb/dae+1V5zJk6D4Ax4FrwGPgA/AV2NHrC/BeX7sK5F23ATgPVIAarUPe+wI41w0GTgLrXnB14BUwB4wBOeCIXnI/DtwEqvreCGvAiU6ZKALfNJDvwBIwEPB5MbYMbCnHJjCdbNQxAIvet7kKDLkDAhgGyh7fwkG5ggDcU8Hfet9nxHsD+NUWMzSWEyo4mQD/lGemYM3vJ3aUE3cSEWnolLycGU1CIKpOq+bk/+r0eTlTSWKfQCvMiCl5c70hrYSCs5bEstkJlsxI99eU0ix4btl21HQDa3mfMNCVfaau7U3OgvC6fjMvTSIM095Q7VkLMmnyBHMm0YVp31LthxZk0sUKxkyiC9OeUO23FmTSitPO/PC086r92YJsW8n6TaIL0z6q2j97xchmryytj5bJPm4SXZj2GdXe6JXy+8CCTIYJgqpJdGHar1X7otU6jVqUw7cK4S1KDThmRSrTDsGyCWFrmiuqWbYkPa2kPzrQxp+yJo9a+bLVOX2Pg9VT1XqWhMCoHj8FJXOBvzrzqiGTycGkRKZVRAYEUwnwX/aGDxes+eNiC56ZksUy0+U075mQx6JNxK2ZiXJm+BBcI15O+JDSO2MbefMACl7ObOkZOxe4T6xoJdxtDGPz4MhM8mNULQCVmHBVW4sJ3Uz79crrc7f1CFuPjV0H5RfomBmBjGxk2hH4t4IcD57Em9E9zBRcu6DLZRZ4BLzTErqtm9sn4A1wX5flwD7VsbNmjOfAtSZmrrgeMlN0aQM9ZmbyfzAz41JqZiczk5ICsOjSCOCSt8zuujSDRs605+/sDBncLv4AqVXBkihc3DUAAAAASUVORK5CYII="
          ></img>
        </div>
        <hr className="h-px my-8 bg-white border-0 dark:bg-gray-700" />
        <Tradercard
          data={data}
          getTraderData={getTraderData}
          id={"563E3A78CDBAFB4E"}
        />
      </div>
      <div className="w-full">
        <Link href="/">Home</Link>
        <Link href="/discover/1">dic1</Link>
      </div>
    </section>
  );
}
