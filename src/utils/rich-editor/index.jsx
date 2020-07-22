import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.css'
import './index.css'

export default class RichEditor extends React.Component {
  componentDidMount() {
    this.loadEditor();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.simditor.setValue(nextProps.defaultValue)
    }
  }

  loadEditor() {
    let element = this.refs['textarea'];
    this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || '请输入',
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    });
    this.bindEditorEvent()
  }

  /**
   * 初始化富文本编辑事件
   */
  bindEditorEvent() {
    this.simditor.on('valuechanged', e => {
      this.props.onValueChange(this.simditor.getValue())
    })
  }

  render() {
    return (
      <div className='rich-editor'>
        <textarea ref='textarea'></textarea>

      </div>
    );
  }

}
