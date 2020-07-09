import React from 'react';

/**
 * 通用TableList表格列表组件
 */
export default class TableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLoading: true,
    };
  }

  componentWillReceiveProps() {
    //第一次挂载的时候
    this.setState({
      firstLoading: false,
    })
  }

  render() {
    const {tableHeaderData, children} = this.props;
    const {firstLoading} = this.state;
    let tableHeader =
      <tr>
        {tableHeaderData && tableHeaderData.map((item, index) => {
          if (typeof item === 'object') {
            return <th key={index} width={item.width} className='text-center'>{item.name}</th>
          } else if (typeof item === 'string') {
            return <th key={index} className='text-center'>{item}</th>
          }
        })}
      </tr>;
    let listInfo =
      <tr>
        <th colSpan={tableHeaderData ? tableHeaderData.length : 5}
            className='text-center'>{firstLoading ? "加载数据中~~" : "没有找到相应的数据~"}</th>
      </tr>;
    let tableBody = children.length > 0 ? children : listInfo;
    return (
      <div className="row">
        <div className='col-md-12'>
          <table className="table table-striped table-bordered">
            <thead>
            {tableHeader}
            </thead>
            <tbody>
            {tableBody}
            </tbody>
          </table>
        </div>
      </div>

    )
  }

}
