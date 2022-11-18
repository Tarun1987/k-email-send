import React, { useEffect, useState } from "react";
import { useToast, withToastProvider } from "../../components/toast";
import CustomButton from "../../components/button";
import BreadCrumb from "../../components/breadcrumb";
import CustomCheckBox from "../../components/checkbox";
import CustomLoader from "../../components/loader";

const Screen = ({
    onLoad: loadData,
    onMasterLoad: loadMasterRecipients,
    onUpdate: handleUpdate,
    masterTemplateUrl,
    onMasterUpload: handleMasterFileSubmit,
    onDelete: deleteRecipient,
}) => {
    const [masterRecipients, setMasterRecipients] = useState([]);
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const toast = useToast();

    useEffect(() => {
        getMasterRecipientsData();
    }, []);

    const getData = async (templateName) => {
        setLoading(true);
        var l = await loadData(templateName, true);
        setList(l);
        setLoading(false);
    };

    const getMasterRecipientsData = async () => {
        setLoading(true);
        var l = await loadMasterRecipients();
        setMasterRecipients(l);
        setLoading(false);
    };

    const handleMasterRecipientChange = (e) => {
        if (e.target.value) {
            getData(e.target.value);
            setSelectedTemplate(e.target.value);
        } else {
            setList([]);
            setSelectedTemplate(null);
        }
    };

    const toggleEditMode = (id, value) => {
        const newList = list.map((item) => {
            if (item.TemplateId === id) {
                const updatedItem = {
                    ...item,
                    Editing: value,
                    ClientEmailNew: item.ClientEmail,
                    ClientNameNew: item.ClientName,
                    BCCNew: item.BCC,
                    CCNew: item.CC,
                    ShareNew: item.Share,
                    IsActiveNew: item.IsActive,
                };
                return updatedItem;
            }
            return item;
        });
        setList(newList);
    };

    const handleInputChange = (id, e) => {
        const key = e.target.name;
        var value = e.target.value;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const newList = list.map((item) => {
            if (item.TemplateId === id) {
                const updatedItem = {
                    ...item,
                    [key]: value,
                };
                return updatedItem;
            }
            return item;
        });
        setList(newList);
    };

    const handleSave = async (item) => {
        const data = {
            TemplateId: item.TemplateId,
            ClientName: item.ClientNameNew,
            ClientEmail: item.ClientEmailNew,
            Share: item.ShareNew,
            IsActive: item.IsActiveNew,
            CC: item.CCNew,
            BCC: item.BCCNew,
        };
        var result = await handleUpdate(data);
        if (result === "OK") {
            toast.success("Information updated successfully!!");
            const newList = list.map((item) => {
                if (item.TemplateId === data.TemplateId) {
                    const updatedItem = {
                        ...item,
                        ...data,
                        Editing: false,
                    };
                    return updatedItem;
                }
                return item;
            });
            setList(newList);
        } else {
            toast.danger("Something went wrong");
        }
    };

    const handleFileSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", selectedFile);
            var result = await handleMasterFileSubmit(formData);
            setLoading(false);
            if (result === "OK") {
                toast.success("File data updated successfully!!");
                const templateName = selectedFile.name.split(".")[0];
                getData(templateName);
                setSelectedFile(null);
            } else {
                toast.danger("Something went wrong");
            }
        } catch (error) {
            setLoading(false);
            toast.danger("Something went wrong");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this template?")) return;

        setLoading(true);
        const result = await deleteRecipient(selectedTemplate);
        getMasterRecipientsData();
        setList([]);
        setSelectedTemplate(null);
    };

    return (
        <>
            <BreadCrumb activeTab={"Master Recipients"}>
                <div className="col-8">
                    <div className="text-end upgrade-btn">
                        <div className="row">
                            <div className={selectedTemplate ? "col-4" : "col-6"} style={{ float: "left" }}>
                                <select className="form-select shadow-none form-control-linel" onChange={handleMasterRecipientChange}>
                                    <option value="">Recipient Template</option>
                                    {masterRecipients.map((m, key) => {
                                        return (
                                            <option key={key} value={`${m}`}>
                                                {m}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {selectedTemplate && (
                                <div className="col-2">
                                    <CustomButton type="button" className="btn btn-primary" onClick={handleDelete}>
                                        Delete
                                    </CustomButton>
                                </div>
                            )}
                            <div className="col-6" style={{ float: "left" }}>
                                {!selectedFile && (
                                    <div className="btn btn-primary _FileUpload" style={{ marginRight: "5px" }}>
                                        <i className="mdi mdi-upload"></i>
                                        Upload new
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                        />
                                    </div>
                                )}
                                <a href={masterTemplateUrl} target={"_blank"} className="btn btn-primary text-white">
                                    <i className="mdi mdi-download"></i>
                                    Download master
                                </a>
                            </div>
                        </div>

                        {selectedFile && (
                            <div className="row" style={{ marginTop: "6px" }}>
                                <div className="col-12">
                                    <div>
                                        <span style={{ marginRight: "5px" }}>{selectedFile.name}</span>
                                        <CustomButton
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            style={{ marginRight: "5px" }}
                                            onClick={handleFileSubmit}
                                        >
                                            Submit
                                        </CustomButton>
                                        <CustomButton
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            style={{ marginRight: "5px" }}
                                            onClick={() => {
                                                setSelectedFile(null);
                                            }}
                                        >
                                            Cancel
                                        </CustomButton>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </BreadCrumb>

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
                                                    <th className="border-top-0">Share</th>
                                                    <th className="border-top-0">Active</th>
                                                    <th className="border-top-0">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((item, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                {item.Editing ? (
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-box single-line"
                                                                        name={"ClientEmailNew"}
                                                                        value={item.ClientEmailNew}
                                                                        onChange={(e) => {
                                                                            handleInputChange(item.TemplateId, e);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <span> {item.ClientEmail}</span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.Editing ? (
                                                                    <input
                                                                        type="text"
                                                                        name={"CCNew"}
                                                                        className="form-control text-box single-line"
                                                                        value={item.CCNew}
                                                                        onChange={(e) => {
                                                                            handleInputChange(item.TemplateId, e);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <span> {item.CC}</span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.Editing ? (
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-box single-line"
                                                                        value={item.BCCNew}
                                                                        name={"BCCNew"}
                                                                        onChange={(e) => {
                                                                            handleInputChange(item.TemplateId, e);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <span> {item.BCC}</span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.Editing ? (
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-box single-line"
                                                                        value={item.ClientNameNew}
                                                                        name={"ClientNameNew"}
                                                                        onChange={(e) => {
                                                                            handleInputChange(item.TemplateId, e);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <span> {item.ClientName}</span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.Editing ? (
                                                                    <CustomCheckBox
                                                                        checked={item.ShareNew}
                                                                        className="form-check-input"
                                                                        name={"ShareNew"}
                                                                        onChange={(e) => {
                                                                            handleInputChange(item.TemplateId, e);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <label className={`badge bg-${item.Share ? "success" : "danger"}`}>
                                                                        {item.Share ? "True" : "False"}
                                                                    </label>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.Editing ? (
                                                                    <CustomCheckBox
                                                                        checked={item.IsActiveNew}
                                                                        name={"IsActiveNew"}
                                                                        className="form-check-input"
                                                                        onChange={(e) => {
                                                                            handleInputChange(item.TemplateId, e);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <label className={`badge bg-${item.IsActive ? "success" : "danger"}`}>
                                                                        {item.IsActive ? "True" : "False"}
                                                                    </label>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.Editing ? (
                                                                    <>
                                                                        <CustomButton
                                                                            type="button"
                                                                            className="btn btn-sm btn-primary"
                                                                            style={{ marginRight: "5px" }}
                                                                            onClick={() => {
                                                                                handleSave(item);
                                                                            }}
                                                                        >
                                                                            Ok
                                                                        </CustomButton>
                                                                        <CustomButton
                                                                            type="button"
                                                                            className="btn btn-sm btn-secondary"
                                                                            onClick={() => {
                                                                                toggleEditMode(item.TemplateId, false);
                                                                            }}
                                                                        >
                                                                            Reset
                                                                        </CustomButton>
                                                                    </>
                                                                ) : (
                                                                    <i
                                                                        style={{ cursor: "pointer" }}
                                                                        title="Edit this"
                                                                        className="mdi mdi-pencil mdi-18px"
                                                                        onClick={() => {
                                                                            toggleEditMode(item.TemplateId, true);
                                                                        }}
                                                                    />
                                                                )}
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

export default withToastProvider(Screen);
