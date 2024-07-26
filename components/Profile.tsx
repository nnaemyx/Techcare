import { useEffect, useState } from "react";
import Image from "next/image";
import BirthIcon from "/public/assets/BirthIcon.svg";
import FemaleIcon from "/public/assets/FemaleIcon.svg";
import PhoneIcon from "/public/assets/PhoneIcon.svg";
import InsuranceIcon from "/public/assets/InsuranceIcon.svg";
import JessicaImage from "/public/assets/Layer 2.png";

interface UserProfile {
  name: string;
  dateOfBirth: string;
  gender: string;
  contactInfo: string;
  emergencyContact: string;
  insuranceProvider: string;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

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
          const userProfile: UserProfile = {
            name: jessica.name || "Jessica Taylor",
            dateOfBirth: "August 23, 1996", // Example value, adjust if data is available
            gender: "Female", // Example value, adjust if data is available
            contactInfo: "(415) 555-1234", // Example value, adjust if data is available
            emergencyContact: "(415) 555-5678", // Example value, adjust if data is available
            insuranceProvider: "Sunrise Health Assurance" // Example value, adjust if data is available
          };

          setProfile(userProfile);
        } else {
          console.error("Jessica's data not found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[740px] bg-secondary rounded-[16px] p-[20px]">
      <Image src={JessicaImage} alt="Profile picture" className="mx-auto" />
      <h2 className="card-title-24pt mt-[24px] text-center">
        {profile?.name || "Jessica Taylor"}
      </h2>
      <div className="mt-[32px] text-[14px] space-y-[24px]">
        <div className="flex items-center gap-[16px]">
          <Image src={BirthIcon} alt="birth icon" />
          <div>
            <p className="font-medium">Date Of Birth</p>
            <p className="font-bold">{profile?.dateOfBirth || "August 23, 1996"}</p>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={FemaleIcon} alt="gender icon" />
          <div>
            <p className="font-medium">Gender</p>
            <p className="font-bold">{profile?.gender || "Female"}</p>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={PhoneIcon} alt="phone icon" />
          <div>
            <p className="font-medium">Contact Info.</p>
            <p className="font-bold">{profile?.contactInfo || "(415) 555-1234"}</p>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={PhoneIcon} alt="phone icon" />
          <div>
            <p className="font-medium">Emergency Contacts</p>
            <p className="font-bold">{profile?.emergencyContact || "(415) 555-5678"}</p>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={InsuranceIcon} alt="insurance icon" />
          <div>
            <p className="font-medium">Insurance Provider</p>
            <p className="font-bold">{profile?.insuranceProvider || "Sunrise Health Assurance"}</p>
          </div>
        </div>
      </div>
      <button className="body-emphasized-14pt bg-[#01F0D0] items-center flex rounded-[41px] px-[40px] py-[11px] mt-[40px] mx-auto">
        Show All Information
      </button>
    </div>
  );
}

export default Profile;
