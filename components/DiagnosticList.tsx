import { useEffect, useState } from "react";

interface DiagnosisEntry {
  name: string;
  description: string;
  status: string;
}

function DiagnosticList() {
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const username = "coalition";
      const password = "skills-test";
      const headers = new Headers();
      headers.set("Authorization", "Basic " + btoa(username + ":" + password));

      try {
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', { headers });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Find Jessica's data
        const jessica = data[3];
        console.log(jessica);

        if (jessica) {
          // Assuming diagnosis history is an array of diagnoses
          const diagnosisEntries = jessica.diagnostic_list.map((entry: any) => ({
            name: entry.name || "N/A", // Adjust according to the actual data structure
            description: entry.description || "N/A", // Adjust according to the actual data structure
            status: entry.status || "N/A", // Adjust according to the actual data structure
          }));
          
          setDiagnoses(diagnosisEntries);
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
      <h2 className="card-title-24pt font-extrabold">Diagnostic List</h2>
      <div className="mt-[40px] rounded-[16px]">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex bg-[#F6F7F8] rounded-[24px] py-[15px] px-[20px]">
            <div className="flex-1 font-bold text-[14px] text-left">Problem/Diagnosis</div>
            <div className="flex-1 font-bold text-[14px] ">Description</div>
            <div className="flex-1 font-bold text-[14px] text-right">Status</div>
          </div>
          {/* Scrollable Content */}
          <div className=" overflow-y-scroll  h-[150px] mt-[10px] custom-scrollbar">
            {diagnoses.map((diagnosis, index) => (
              <div key={index} className="flex py-[21px] px-[20px] border-b border-[#F6F7F8] ">
                <div className="flex-1 text-[14px] text-left">{diagnosis.name}</div>
                <div className="flex-1 text-[14px]">{diagnosis.description}</div>
                <div className="flex-1 text-[14px]  text-right">{diagnosis.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticList;
