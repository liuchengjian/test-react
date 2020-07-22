import React from 'react'
import Fileupload from './react-fileupload.jsx';

export default class FileUpLoader extends React.Component {
  render() {
    const options = {
      baseUrl: '/manage/product/upload.do',
      fileFieldName: 'upload_file',
      chooseAndUpload:true,
      dataType: 'json',
      uploadSuccess:(res)=> this.props.uploadSuccess(res.data),
      uploadError:(err)=>this.props.uploadError(err.message || '上传图片失败'),
    };
    return (
      <Fileupload options={options}>
        <button className='btn btn-xs btn-default' ref="chooseAndUpload">请选择图片</button>
      </Fileupload>
    )
  }
}
