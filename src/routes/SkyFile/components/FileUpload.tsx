import * as React from "react";
import { Upload, Icon, Avatar, Button, List, Card } from "antd";
import { BASE_URL, getToken } from "src/utils/config";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { upload, getFileList as fetchFileList } from "src/services/upload";
import { getDateStringFromTimestrap } from "src/utils/helper";
import * as InfiniteScroll from "react-infinite-scroller";

const { Dragger } = Upload;

interface IFileModel {
  file_id: number;
  create_time: string;
  file_state: number;
  file_type: string;
  file_name: string;
  file_url: string;
}

interface IFileUploadState {
  prepareUploadingFileList: Array<UploadFile>;
  isUploading: boolean;
  page: number;
  limit: number;
  fileList: Array<IFileModel>;
  hasMore: boolean;
}

interface IFileUploadProps {}

class FileUploadComp extends React.Component<
  IFileUploadProps,
  IFileUploadState
> {
  state = {
    fileList: [],
    prepareUploadingFileList: [],
    isUploading: false,
    page: 0,
    limit: 11,
    hasMore: true
  };
  componentDidMount() {
    this.getFileList(this.state.page);
  }

  getFileList = (page: number) => {
    fetchFileList(page, this.state.limit).then(r => {
      if (!r || !r.data) {
        return;
      }
      var append: Array<IFileModel> = r.data.map(item => ({
        file_id: item.file_id,
        create_time: item.create_time,
        file_name: item.file_name,
        file_type: item.file_type,
        file_state: item.file_state,
        file_url: item.file_url
      }));
      this.setState({
        page: page,
        fileList: this.state.fileList.concat(append),
        hasMore: append.length >= 11
      });
    });
  };

  handleUpload = () => {
    const { prepareUploadingFileList } = this.state;
    const formData = new FormData();
    prepareUploadingFileList.forEach(file => {
      formData.append("files", file);
    });
    this.setState({ isUploading: true });
    upload(formData).then(r => {
      var isUploading: boolean = false;
      if (!r || !r.data) {
        isUploading = true;
      }
      this.setState({ prepareUploadingFileList: [], isUploading: isUploading });
    });
  };

  draggerProps = (): UploadProps => ({
    multiple: true,
    fileList: this.state.prepareUploadingFileList,
    beforeUpload: file => {
      this.setState(state => ({
        prepareUploadingFileList: [...state.prepareUploadingFileList, file]
      }));
      return false;
    },
    onChange(info) {
      console.log(info);
    },
    onRemove: file => {
      this.setState(state => {
        const index = state.prepareUploadingFileList.indexOf(file);
        const newFileList = state.prepareUploadingFileList.slice();
        newFileList.splice(index, 1);
        return { prepareUploadingFileList: newFileList };
      });
    }
  });
  render() {
    const { isUploading, fileList } = this.state;
    const dragP = this.draggerProps();
    return (
      <div>
        <Card>
          <Dragger {...dragP}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-hint">点击或拖拽文件以上传</p>
          </Dragger>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={isUploading}
            style={{ marginTop: 16, float: "right" }}
          >
            {isUploading ? "上传中" : "开始上传"}
          </Button>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <InfiniteScroll
            pageStart={0}
            hasMore={this.state.hasMore}
            loadMore={() => {
              this.getFileList(this.state.page + 1);
            }}
          >
            <List
              size="large"
              dataSource={this.state.fileList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="large"
                        src={`${BASE_URL}${item.file_url}`}
                      ></Avatar>
                    }
                    title={item.file_name}
                    description={
                      <p>
                        {" "}
                        上传于 {getDateStringFromTimestrap(
                          item.create_time
                        )}{" "}
                      </p>
                    }
                  ></List.Item.Meta>
                </List.Item>
              )}
            ></List>
          </InfiniteScroll>
        </Card>
      </div>
    );
  }
}

export {FileUploadComp} ;
