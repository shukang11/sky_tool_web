import * as React from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button } from "antd";
import { BASE_URL, getToken } from "src/utils/config";
import { UploadFile } from "antd/lib/upload/interface";
import { upload } from "src/services/upload";

const { Dragger } = Upload;

interface IFileUploadState {
  fileList: Array<UploadFile>;
  isUploading: boolean;
}

interface IFileUploadProps {}

class FileUploadComp extends React.Component<
  IFileUploadProps,
  IFileUploadState
> {
  state = {
    fileList: [],
    isUploading: false
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files", file);
    });
    this.setState({ isUploading: true });
    upload(formData).then(r => {
      if (!r || !r.data) {
        return;
      }
      console.log(r);
      this.setState({ fileList: [], isUploading: false });
    });
  };

  render() {
    const { isUploading, fileList } = this.state;
    return (
      <div>
        <Upload
          onRemove={file => {
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return { fileList: newFileList };
            });
          }}
          beforeUpload={file => {
            this.setState(state => ({
              fileList: [...state.fileList, file]
            }));
            return false;
          }}
          fileList={fileList}
        >
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={isUploading}
          style={{ marginTop: 16 }}
        >
          {isUploading ? "Uploading" : "Start Upload"}
        </Button>
      </div>
    );
  }
}

export default FileUploadComp;
