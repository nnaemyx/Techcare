import Image from "next/image";
import { useEffect, useState } from "react";
import DownloadIcon from "/public/assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg";
function LabResult() {
  const [labResults, setLabResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const username = "coalition";
      const password = "skills-test";
      const headers = new Headers();
      headers.set("Authorization", "Basic " + btoa(username + ":" + password));

      try {
        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          { headers }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Find Jessica's data
        const jessica = data[3];
        console.log(jessica);

        if (jessica) {
          // Assuming lab_results is an array of lab result names
          setLabResults(jessica.lab_results || []);
        } else {
          console.error("Jessica's data not found.");
        }
      } catch (error) {
        console.error("Error fetching diagnostic data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-secondary rounded-[16px] p-[20px] mt-[32px]">
      <h2 className="card-title-24pt font-extrabold">Lab Results</h2>
      <ul className="mt-[27px] px-[16px] overflow-y-scroll  h-[150px] custom-scrollbar ">
        {labResults.map((result, index) => (
          <div className="flex py-[11px] px-[16px] justify-between">
            <li key={index} className=" text-[13px]">
              {result}
            </li>
            <Image src={DownloadIcon} alt="icon" />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LabResult;
