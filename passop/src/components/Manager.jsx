import React, { useState, useEffect } from "react";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const savePassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex flex-col p-4 text-black items-center">
        <input
          value={form.site}
          onChange={handleChange}
          placeholder="Enter Website URL"
          className="rounded-full border border-green-500 w-full p-4 py-1"
          type="text"
          name="site"
          id=""
        />
        <div className="flex mt-3">
          <input
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="username"
            id=""
          />
          <input
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="password"
            id=""
          />
        </div>
        <button
          onClick={savePassword}
          className="flex justify-center items-center bg-green-500 p-1.5 py-1 w-fit rounded-full gap-1 hover:font-bold mt-3 hover:border-green-600 hover:border-[3px]"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          Add Password
        </button>
        <div className="table">
          {passwordArray.length===0 && <div>No Passwords To Show</div>}
          {passwordArray.length!=0 && 
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead>
              <tr>
                <th className="py-2">Website</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item,index)=>{
                return <tr key={index}>
                <td className="text-center py-2"><a href={item.site} target="_blank">{item.site}</a></td>
                <td className="text-center py-2">{item.username}</td>
                <td className="text-center py-2 p-1">{item.password}</td>
              </tr> 
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;
