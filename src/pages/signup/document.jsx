import React, {useState, useEffect} from "react";

import Input from "../../components/shared/input";
import PrevIcon from "../../assets/icon/prev-green.svg";

const Document = ({ setForm, formData, navigation }) => {

  const {
    documents
  } = formData;

  const [files, setFiles] = useState([]);
  const { previous } = navigation;

  const onFileUpload = async (e) => {
    e.preventDefault();
    let files_selected = e.target.files;
    for (let i=0; i < files_selected.length; i++) {
      readFile(files_selected[i]);
    }
  }

  const readFile = (file) => {
    var name = file.name;
    var reader = new FileReader();
    reader.onload = function() {
      setFiles(files => [...files, { name, uploaded_file: reader.result }]);
    }
    reader.readAsDataURL(file);
  }

  const updateFormData = () => {
    const e = {
      target: {
        name: 'documents',
        value: files
      }
    };
    setForm(e);
  }

  const submit = () => {
    console.log(formData);
  }

  useEffect(() => {
    updateFormData();
  }, [files])

  return (
    <div className="form">
      <h4>Upload Documents</h4>
      <Input
        label="Documents"
        name="documents"
        type="file"
        onChange={onFileUpload}
        multiple
      />
      <div className="d-flex align-items-center justify-content-end nav">
        <button className="prev mr-5" onClick={previous}><img src={PrevIcon} alt="" /> <span>Previous Step</span></button>
        <button className="submit" onClick={submit}>Submit</button> 
      </div>
    </div>
  );
};

export default Document;