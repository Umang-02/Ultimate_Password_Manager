import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white flex h-13 justify-between items-center text-center mt-5">
        
      <div className="name flex items-center">
        <div className="logo p-4 ml-2">
        <svg className="text-[#F33027] font-bold" fill="none" viewBox="0 0 15 15" height="2em" width="2em">
      <path
        stroke="currentColor"
        d="M12.5 8.5v-1a1 1 0 00-1-1h-10a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1v-1m0-4h-4a2 2 0 100 4h4m0-4a2 2 0 110 4m-9-6v-3a3 3 0 016 0v3m2.5 4h1m-3 0h1m-3 0h1"
      />
    </svg>
        </div>
        <div className="title">PassOp</div>
      </div>
      <ul>
        <li className="p-[4px] hover:text-[#F33027] hover:font-bold cursor-pointer"> 
          <svg 
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z" />
          </svg>
          <a className="text-[13px]">Dashboard</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
