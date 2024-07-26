import { useEffect, useState } from "react";
import BloodPressure from "./Charts/BloodPressure";
import DropIcon from "/public/assets/expand_more_FILL0_wght300_GRAD0_opsz24.svg";
import ArrowUp from "/public/assets/ArrowUp.svg";
import ArrowDown from "/public/assets/ArrowDown.svg";
import RespiratoryImage from "/public/assets/respiratory rate.png";
import TemperatureImage from "/public/assets/temperature.png";
import HeartImage from "/public/assets/HeartBPM.png";
import Image from "next/image";

interface BloodPressureData {
  labels: string[];
  systolic: number[];
  diastolic: number[];
}

interface DiagnosisEntry {
  month: string;
  year: number;
  blood_pressure: {
    systolic: {
      value: number;
      levels: string;
    };
    diastolic: {
      value: number;
      levels: string;
    };
  };
  heart_rate: {
    value: number;
    levels: string;
  };
  respiratory_rate: {
    value: number;
    levels: string;
  };
  temperature: {
    value: number;
    levels: string;
  };
}

interface UserData {
  name: string;
  diagnosis_history: DiagnosisEntry[];
}

function DiagnosticHistory() {
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureData>({
    labels: [],
    systolic: [],
    diastolic: [],
  });

  const [jessicaData, setJessicaData] = useState<UserData | null>(null);

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
          setJessicaData(jessica);

          // Format data for BloodPressure component
          const labels = jessica.diagnosis_history.slice(0, 6).map((entry: DiagnosisEntry) => `${entry.month} ${entry.year}`);
          const systolic = jessica.diagnosis_history.slice(0, 6).map((entry: DiagnosisEntry) => entry.blood_pressure.systolic.value);
          const diastolic = jessica.diagnosis_history.slice(0, 6).map((entry: DiagnosisEntry) => entry.blood_pressure.diastolic.value);

          setBloodPressureData({ labels, systolic, diastolic });
        } else {
          console.error("Jessica's data not found.");
        }
      } catch (error) {
        console.error("Error fetching diagnostic data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateAverage = (data: number[]) => {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
  };

  const renderJessicaInfo = () => {
    if (!jessicaData) return null;

    const lastSixMonths = jessicaData.diagnosis_history.slice(0, 6);
    const averageSystolic = calculateAverage(lastSixMonths.map(entry => entry.blood_pressure.systolic.value));
    const averageDiastolic = calculateAverage(lastSixMonths.map(entry => entry.blood_pressure.diastolic.value));
    const averageRespiratoryRate = calculateAverage(lastSixMonths.map(entry => entry.respiratory_rate.value));
    const averageHeartRate = calculateAverage(lastSixMonths.map(entry => entry.heart_rate.value));
    const averageTemperature = calculateAverage(lastSixMonths.map(entry => entry.temperature.value));

    return (
      <>
        <div className="space-y-[8px]">
          <div className="flex gap-[4px] items-center">
            <div className="w-[14px] h-[14px] rounded-full bg-[#E66FD2]" />
            <h2 className="font-bold text-[14px]">Systolic</h2>
          </div>
          <h2 className="text-[22px] font-bold">{averageSystolic.toFixed(1)}</h2>
          <div className="flex gap-[8px] items-center">
            <Image src={ArrowUp} alt="arrow" />
            <p className="body-regular-14">Higher than Average</p>
          </div>
        </div>
        <hr className="w-full border-[#CBC8D4] mt-[16px]" />
        <div className="space-y-[8px] mt-[16px]">
          <div className="flex gap-[4px] items-center">
            <div className="w-[14px] h-[14px] rounded-full bg-[#8C6FE6]" />
            <h2 className="font-bold text-[14px]">Diastolic</h2>
          </div>
          <h2 className="text-[22px] font-bold">{averageDiastolic.toFixed(1)}</h2>
          <div className="flex gap-[8px] items-center">
            <Image src={ArrowDown} alt="arrow" />
            <p className="body-regular-14">Lower than Average</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="h-[743px] bg-secondary p-[20px] rounded-[16px]">
      <h2 className="card-title-24pt font-extrabold">Diagnosis History</h2>
      <div className="bg-[#F4F0FE] w-full rounded-[12px] mt-[40px] p-[16px] flex items-start gap-[39px]">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="inner-card-title-18pt">Blood Pressure</h2>
            <div className="flex items-center gap-[16px]">
              <p className="body-regular-14 font-normal">Last 6 months</p>
              <Image src={DropIcon} alt="icon" />
            </div>
          </div>
          <div className="mt-[28px] w-full">
            <BloodPressure 
              labels={bloodPressureData.labels}
              systolic={bloodPressureData.systolic}
              diastolic={bloodPressureData.diastolic}
            />
          </div>
        </div>

        <div className="max-w-[208px] w-full">
          {renderJessicaInfo()}
        </div>
      </div>
      <div className="flex mt-[20px] gap-[21px]">
        <div className="rounded-[12px] bg-[#E0F3FA] w-full p-[16px]">
          <Image src={RespiratoryImage} alt="image" />
          <div className="mt-[16px]">
            <h2 className="font-medium">Respiratory Rate</h2>
            <p className="text-[30px] font-extrabold">{jessicaData ? calculateAverage(jessicaData.diagnosis_history.slice(0, 6).map(entry => entry.respiratory_rate.value)).toFixed(1) : "N/A"} bpm</p>
          </div>
          <p className="mt-[17px] font-normal">Normal</p>
        </div>

        <div className="rounded-[12px] bg-[#FFE6E9] w-full p-[16px] ">
          <Image src={TemperatureImage} alt="image" />
          <div className="mt-[16px]">
            <h2 className="font-medium">Temperature</h2>
            <p className="text-[30px] font-extrabold">{jessicaData ? calculateAverage(jessicaData.diagnosis_history.slice(0, 6).map(entry => entry.temperature.value)).toFixed(1) : "N/A"}°F</p>
          </div>
          <p className="mt-[17px] font-normal">Normal</p>
        </div>

        <div className="rounded-[12px] bg-[#FFE6E9] w-full p-[16px] ">
          <Image src={HeartImage} alt="image" />
          <div className="mt-[16px]">
            <h2 className="font-medium">Heart Rate</h2>
            <p className="text-[30px] font-extrabold">{jessicaData ? calculateAverage(jessicaData.diagnosis_history.slice(0, 6).map(entry => entry.heart_rate.value)).toFixed(1) : "N/A"} bpm</p>
          </div>
          <p className="mt-[17px] font-normal">Average</p>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticHistory;
