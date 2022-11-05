import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import CustomLoader from "../../components/loader";

const Screen = ({ onLoad: loadData }) => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    var l = await loadData();
    setList(l);
    setLoading(false);
  };

  return (
    <>
      <BreadCrumb activeTab={"Report"} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body" style={{ position: "relative" }}>
                {isLoading && <CustomLoader />}
                <div className="d-md-flex align-items-center">
                  <div className="table-responsive" style={{ width: "100%" }}>
                    <table className="table mb-0 table-hover align-middle text-nowrap">
                      <thead>
                        <tr>
                          <th className="border-top-0">Date Send</th>
                          <th className="border-top-0">Failed Count</th>
                          <th className="border-top-0">Delivered Count</th>
                          <th className="border-top-0">Pending Count</th>
                          <th className="border-top-0">File Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((x, key) => {
                          return (
                            <tr key={key}>
                              <th scope="row">2</th>
                              <td>
                                <label className="badge bg-danger">2</label>
                              </td>
                              <td>
                                <label className="badge bg-success">2</label>
                              </td>
                              <td>
                                <label className="badge bg-purple">1</label>
                              </td>
                              <td>a</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="amp-pxl mt-4" style={{ height: "350px" }}>
                <div className="chartist-tooltip"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Screen;
