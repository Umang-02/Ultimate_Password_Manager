import React, { useState, useEffect } from "react";
import { FaCopy , FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {v4 as uuidv4} from 'uuid';

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: ""});
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords=async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords=await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  }

  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async() => {
    let res=await fetch("http://localhost:3000/",{method:"POST", headers:{"content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})});
    
    setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    console.log([...passwordArray, form]);
  };

  const deletePassword = async(id) => {
    console.log("The password with id:",id);
    let res=await fetch("http://localhost:3000/",{method:"DELETE", headers:{"content-Type":"application/json"},body:JSON.stringify({...form,id})});
    
    setPasswordArray(passwordArray.filter(item=>item.id!=id));
    
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
  };

  const editPassword = (id) => {
    console.log("The password with id:",id);
    setForm(passwordArray.filter(item=>item.id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id!=id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
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
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead>
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <FaCopy />
                          </div>
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                        </div>
                      </td>
                      <td className="text-center py-2">
                        <div
                          className="flex items-center justify-center"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <div className="cursor-pointer">
                            <FaCopy />
                          </div>
                          {item.username}
                        </div>
                      </td>
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <FaCopy />
                          </div>
                          {item.password}
                        </div>
                      </td>
                      <td className="text-center py-2">
                        <div className="icons flex justify-center align-center items-center">
                          <div className="delete cursor-pointer mr-2 p-1" onClick={()=>{deletePassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{"height":"20px","width":"20px"}}
                            ></lord-icon>
                          </div>
                          <div className="edit cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                            <FaRegEdit/>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
