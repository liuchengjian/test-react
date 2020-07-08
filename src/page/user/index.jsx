import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import {Link} from "react-router-dom";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.less'
export default class UserList extends React.Component {

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={"用户列表"}/>
        <div className='row'>
          <div className='col-md-12'>
           <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                </tr>
              </thead>
             <tbody>
             <tr>
               <th>123</th>
               <th>324</th>
               <th>24</th>
               <th>523</th>
               <th>5252</th>
             </tr>
             </tbody>
           </table>
          </div>
        </div>
        <Pagination/>
      </div>
    );
  }

}
