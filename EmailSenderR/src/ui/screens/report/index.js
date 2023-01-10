import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import CustomLoader from "../../components/loader";
import CustomPager from "../../components/pagination";

const Screen = ({ onLoad: loadData, getTotalHistoryCount }) => {
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        const getTotalCount = async () => {
            var count = await getTotalHistoryCount();
            let pagesCount = parseInt(count / limit);
            if (count % limit > 0) pagesCount += 1;
            setTotalPages(pagesCount);
        };
        getTotalCount();
    }, []);

    useEffect(() => {
        getData();
    }, [page]);

    const getData = async () => {
        setLoading(true);
        var l = await loadData(page);
        setList(l);
        setLoading(false);
    };

    const handlePreviewClick = (item) => {
        var win = window.open(
            "",
            "Title",
            "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" +
                (screen.height - 400) +
                ",left=" +
                (screen.width - 840)
        );
        win.document.body.innerHTML = item.Html;
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
                                                    <th className="border-top-0">Id</th>
                                                    <th className="border-top-0">Date Send</th>
                                                    <th className="border-top-0">Template Name</th>
                                                    <th className="border-top-0">Status</th>
                                                    <th className="border-top-0">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((item, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <th scope="row">{item.Id}</th>
                                                            <td>
                                                                <label className="badge bg-danger">{item.FormattedSendAt}</label>
                                                            </td>
                                                            <td>
                                                                <label className="badge bg-purple">{item.RecipientTemplateName}</label>
                                                            </td>
                                                            <td>
                                                                <label className="badge bg-success">{item.Status}</label>
                                                            </td>
                                                            <td>
                                                                <i
                                                                    title="Preview"
                                                                    style={{ cursor: "pointer", fontSize: "20px" }}
                                                                    className="mdi mdi-eye mdi-18px"
                                                                    onClick={() => {
                                                                        handlePreviewClick(item);
                                                                    }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="row" style={{ marginTop: "20px" }}>
                                    <CustomPager
                                        onClick={(page) => {
                                            setPage(page);
                                        }}
                                        totalPages={totalPages}
                                        currentPage={page}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Screen;
