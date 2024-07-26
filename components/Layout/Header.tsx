import Image from "next/image";
import React from "react";
import Logo from "/public/assets/TestLogo.png";
import OverviewIcon from "/public/assets/home_FILL0_wght300_GRAD0_opsz24.svg"
import ProfileIcon from "/public/assets/group_FILL0_wght300_GRAD0_opsz24.svg"
import ScheduleIcon from "/public/assets/calendar_today_FILL0_wght300_GRAD0_opsz24.svg"
import MessageIcon from "/public/assets/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg"
import TransactionsIcon from "/public/assets/credit_card_FILL0_wght300_GRAD0_opsz24.svg"
import SettingsIcon from "/public/assets/settings_FILL0_wght300_GRAD0_opsz24.svg"
import MoreIcon from "/public/assets/more_vert_FILL0_wght300_GRAD0_opsz24.svg"
import Avartar from "/public/assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"

function Header() {
  return (
    <div className="bg-secondary rounded-[70px] w-full px-[32px] flex justify-between items-center h-[72px]">
      <div>
        <Image src={Logo} alt="Tech care Logo" />
      </div>
      <div className="flex items-center gap-[40px]">
        <div className="flex items-center gap-[9px]">
            <Image src={OverviewIcon} alt="overview icon"/>
            <p className="body-emphasized-14pt">Overview</p>
        </div>
        <div className="flex items-center gap-[9px] bg-[#01F0D0] rounded-[41px] py-[11px] px-[16px]">
            <Image src={ProfileIcon} alt="overview icon"/>
            <p className="body-emphasized-14pt">Patients</p>
        </div>
        <div className="flex items-center gap-[9px]">
            <Image src={ScheduleIcon} alt="overview icon"/>
            <p className="body-emphasized-14pt">Schedule</p>
        </div>
        <div className="flex items-center gap-[9px]">
            <Image src={MessageIcon} alt="overview icon"/>
            <p className="body-emphasized-14pt">Message</p>
        </div>
        <div className="flex items-center gap-[9px]">
            <Image src={TransactionsIcon} alt="overview icon"/>
            <p className="body-emphasized-14pt">Transactions</p>
        </div>
      </div>

      <div className="flex items-center gap-[12px]">
        <Image src={Avartar} alt="User image"/>
        <div>
            <p className="body-emphasized-14pt">Dr. Jose Simmons</p>
            <p className="body-secondary-info-14pt">General Practitioner</p>
        </div>
        <div className="bg-[#EDEDED] w-[1px] h-[44px]"/>
        <Image src={SettingsIcon} alt="icon"/>
        <Image src={MoreIcon} alt="icon"/>
      </div>
    </div>
  );
}

export default Header;
