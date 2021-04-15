import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from "../shared/input";
import PrevIcon from "../../assets/icon/prev-green.svg";
import { signUp } from "../../actions/auth";

const Document = ({  setForm, formData, navigation }) => {
  const { documents } = formData;
  const { previous } = navigation;
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const onFileUpload = async (e) => {
    e.preventDefault();
    const files_selected = e.target.files;
    for (let i=0; i < files_selected.length; i++) {
      var file = files_selected[i];
      var name = file.name;
      documents.push({name, uploaded_file: await readFile(file)});
    }
    Promise.all(documents).then((values) => {
      values.length > 0 ? setDisabled(false) : setDisabled(true);
    });
  }

  const readFile = (file) => {
    return new Promise(function(resolve,reject){
      var reader = new FileReader();
      reader.onload = function(){
        resolve(reader.result);
      };
      reader.onerror = function(){
        reject(reader);
      };
      reader.readAsDataURL(file);
    });
  }

  const submit = () => {
    dispatch(signUp(formData, history));
  }

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
        <button className="submit" onClick={submit} disabled={isDisabled}>Submit</button> 
      </div>
    </div>
  );
};

export default Document;