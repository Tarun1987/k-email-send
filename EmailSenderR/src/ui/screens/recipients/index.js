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
      <BreadCrumb activeTab={"Master Recipients"} />

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
                          <th className="border-top-0">Client Email</th>
                          <th className="border-top-0">CC</th>
                          <th className="border-top-0">BCC</th>
                          <th className="border-top-0">Client Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item, key) => {
                          return (
                            <tr key={key}>
                              <th scope="row">{item.id}</th>
                              <td>
                                <label className="badge bg-danger">
                                  {item.userId}
                                </label>
                              </td>
                              <td>
                                <label className="badge bg-success">
                                  {item.title}
                                </label>
                              </td>
                              <td>
                                <label className="badge bg-purple">1</label>
                              </td>
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
