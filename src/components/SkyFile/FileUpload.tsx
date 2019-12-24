import * as React from "react";
import { connect } from "react-redux";
import { Upload, Icon, message } from "antd";
import { BASE_URL, getToken } from "src/utils/config";

const { Dragger } = Upload;

interface IFileUploadState {}

interface IFileUploadProps {}

class FileUploadComp extends React.Component<
  IFileUploadProps,
  IFileUploadState
> {

  render() {
    return (
      <div>
        Dragger
      </div>
    );
  }
}

export default FileUploadComp;
