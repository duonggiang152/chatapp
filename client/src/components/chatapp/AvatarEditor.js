import { useState } from "react"
import Avatareditor from "react-avatar-editor"
import domain from "../../config/domain"
import "./css/avatareditor.css"
function AvatarEditor() {
  const [scale, setScale] = useState(1)
  const [urlDefault, setURLDefault] = useState()
  const [editor, setEditor] = useState()
  const [urlCrop, setURLCrop] = useState()
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
  const setEditorRef = (ed) => {
    setEditor(ed)
    if(!ed || !ed.getImageScaledToCanvas) return
    console.log(ed.getImageScaledToCanvas().toDataURL())
    setURLCrop(ed.getImageScaledToCanvas().toDataURL())
  };
  const changeAvatar = () => {
    const formData = new FormData()
    if(!urlDefault) return
    formData.append("avatar", urlCrop)
    // await fetch(domain)
  }
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
          <div className="Change-Avatar-Btn">Change Avatar</div>
          <img src={urlCrop}></img>
      </div>
    </>
  )
}
export default AvatarEditor