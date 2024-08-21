import React, {useState} from "react";



export default function Balance(){
    const[details,setDetails] = useState({
        title: "Welcome Back Wajahat",
        bal: "$2,500.00",
        safe:"$2,000.00",
        set: "$500.00"
    })

    return(
        <>
        <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">
          {details.title}
        </h1>
        <div className="flex flex-wrap gap-3 px-4 py-3">
          <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#d0dbe7] p-3 items-start">
            <p className="text-[#0e141b] tracking-light text-2xl font-bold leading-tight">{details.bal}</p>
            <div className="flex items-center gap-2">
              <p className="text-[#4e7397] text-sm font-normal leading-normal">Total Balance</p>
            </div>
          </div>
          <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#d0dbe7] p-3 items-start">
            <p className="text-[#0e141b] tracking-light text-2xl font-bold leading-tight">{details.safe}</p>
            <div className="flex items-center gap-2">
              <p className="text-[#4e7397] text-sm font-normal leading-normal">Safe-to-Spend</p>
            </div>
          </div>
          <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#d0dbe7] p-3 items-start">
            <p className="text-[#0e141b] tracking-light text-2xl font-bold leading-tight">{details.set}</p>
            <div className="flex items-center gap-2">
              <p className="text-[#4e7397] text-sm font-normal leading-normal">Set Aside</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}