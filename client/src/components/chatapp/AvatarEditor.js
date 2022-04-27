import { useState } from "react"
import Avatareditor from "react-avatar-editor"
import domain from "../../config/domain"
import "./css/avatareditor.css"
function AvatarEditor() {
  const [scale, setScale] = useState(1)
  const [urlDefault, setURLDefault] = useState()
  // const [editor, setEditor] = useState()
  const [urlCrop, setURLCrop] = useState()
  const [status, setStatus] = useState("Change Avatar")
  const [preventAction, setPreventAction] = useState(false)
  function scaleChange(e) {
    const v = e.target.value
    setScale(1 + v/100)
  }
  const handleFileChange = (e) => {
    let url
    try {
    if(!e || !e.target || !e.target.files) return
    url = URL.createObjectURL(e.target.files[0]);}
    catch(err) {

    }
    setURLDefault(url)
    console.log(url);
  };
  const setEditorRef = async (ed) => {
    // setEditor(ed)
    if(!ed || !ed.getImageScaledToCanvas) return
    const blob = await new Promise(resolve => ed.getImageScaledToCanvas().toBlob(resolve));
    setURLCrop(blob)
  };
  const changeAvatar = async () => {
    const formData = new FormData()
    formData.append("avatar", urlCrop)
    if(!urlDefault) return
    setPreventAction(true)
    setStatus("waiting")
    fetch(domain + "/upload/avatar", {
      method: "POST",
      credentials: "same-origin",
      body: formData
    })
    .then(() => {
      setPreventAction(false)
      setStatus("Changing success, refresh page to update new result")
      setTimeout(() => {
        setStatus("Change Avatar")
      }, 5000)
    })
    .catch(err => {
      setPreventAction(false)
      setStatus("Err, refresh page and upload again")
      setTimeout(() => {
        setStatus("Change Avatar")
      }, 5000)
      console.log(err)
    })
  }
  const classBTN = (!preventAction ? "Change-Avatar-Btn" : "Change-Avatar-Btn noClick")
  return (
    <>
      <Avatareditor
        ref = {setEditorRef}
        image= {urlDefault}
        width={250}
        height={250}
        border={10}
        borderRadius={"125"}
        color={[119, 124, 128, 0.6]} // RGBA
        scale={scale}
        rotate={0}
      />
      <div id="avatar-control">
          <div className="add-file">
          <form>
          <input accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} type="file" name="img" id="img" style={{"display": "none"}}/>
          <label className="add-btn" for="img">Add Img</label>
          </form>
          </div>
          <div className="Zoom">
            <div>Zoom: </div>
            <input onChange={scaleChange} type="range" id="volume" name="volume" min="0" max="100"></input>
          </div>
          <div onClick={changeAvatar} className={classBTN}>{status}</div>
      </div>
    </>
  )
}
export default AvatarEditor