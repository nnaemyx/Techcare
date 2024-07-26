"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import SearchIcon from "/public/assets/search_FILL0_wght300_GRAD0_opsz24.svg";
import MoreIcon from "/public/assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg";

import DiagnosticHistory from "@/components/DiagnosticHistory";
import DiagnosticList from "@/components/DiagnosticList";
import Profile from "@/components/Profile";
import LabResult from "@/components/LabResult";

interface User {
  name: string;
  gender: string;
  age: number;
  profile_picture: string | StaticImageData;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const username = "coalition";
  const password = "skills-test";

  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(username + ":" + password));

  useEffect(() => {
    // Fetch users data
    fetch("https://fedskillstest.coalitiontechnologies.workers.dev/api/users", {
      headers,
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="flex gap-[33px] w-full mt-[32px]">
      <div className="bg-secondary rounded-[16px] w-full max-w-[367px] ">
        <div className="flex justify-between items-center p-[20px]">
          <h2 className="card-title-24pt font-extrabold">Patients</h2>
          <Image src={SearchIcon} alt="icon" />
        </div>
        <div className="mt-[40px] pb-[40px] space-y-[32px] overflow-y-scroll  h-[1000px] custom-scrollbar">
          {users.map((user, index) => (
            <div
              key={index}
              className={`flex justify-between px-[20px] items-center ${
                index === 3 ? "bg-[#D8FCF7] py-[16px]" : ""
              }`}
            >
              <div className="flex gap-[12px] items-center">
                <Image
                  src={user.profile_picture}
                  alt="icon"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="body-emphasized-14pt">{user.name}</p>
                  <p className="body-secondary-info-14pt">
                    {user.gender}, {user.age}
                  </p>
                </div>
              </div>
              <div>
                <Image src={MoreIcon} alt="icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-[890px] ">
      <DiagnosticHistory/>
      <DiagnosticList/>
      </div>
      <div className=" w-full flex flex-col max-w-[367px] ">
          <Profile/>
       <LabResult/>
      </div>
    </div>
  );
}
