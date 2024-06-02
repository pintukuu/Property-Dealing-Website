import "./newProp.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { propInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewProp = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [bp, setBp] = useState([]);
  const { data, loading, error } = useFetch('/bps')

  const handleChange = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }
  console.log(info);

  const handleSelect = e => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    // console.log(value);
    setBp(value);
  }
  // console.log(bp);
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData()
          data.append("file", file)
          data.append("upload_preset", "upload")
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dt31ckcqg/image/upload", data)
          const { url } = uploadRes.data;
          return url
        }))
      const newProp = {
        ...info,
        rooms: bp,
        photos: list
      }
      console.log(newProp);
      await axios.post("/props", newProp)
    } catch (err) {

    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Property</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {propInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>

              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>NO</option>
                  <option value={true}>YES</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Bp</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? "Loading please wait" : data && data.map(bp => (
                    <option key={bp._id} value={bp._id}>{bp.title}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProp;
