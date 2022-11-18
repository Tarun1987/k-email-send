import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { useToast, withToastProvider } from "../../components/toast";
import CustomCheckBox from "../../components/checkbox";
import SignatureTemplateLayout from "../../layout/SignatureTemplateLayout";
import SignatureTemplateForm from "../signatureTemplateForm";
import ValidationSchema from "./validationSchema";

const Screen = ({ onLoad: loadData, onSubmit: handleFormSubmit, onShareUpdate: handleShareUpdate, onDelete: handleDelete }) => {
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [editItem, setEditItem] = useState({});

    const toast = useToast();

    useEffect(() => {
        if (!isLoading) getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        var l = await loadData();
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

    const handleEdit = (item) => {
        setEditItem(item);
    };

    const handleSubmit = async (data) => {
        try {
            setLoading(true);
            var result = await handleFormSubmit(data);
            setLoading(false);
            getData();
            return true;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };

    const handleShareStatusChange = async (id, value) => {
        try {
            setLoading(true);
            var result = await handleShareUpdate(id, value);
            if (result === "OK") {
                const newList = list.map((item) => {
                    if (item.Id === id) {
                        const updatedItem = {
                            ...item,
                            Share: value,
                        };
                        return updatedItem;
                    }
                    return item;
                });
                setList(newList);
                toast.success("Status updated successfully!!");
                setLoading(false);
            }
        } catch (error) {
            toast.danger("Something went wrong");
            setLoading(false);
        }
    };

    const confirmDelete = async (item) => {
        if (!confirm("Are you sure you want to delete this signature?")) return;

        setLoading(true);
        var result = await handleDelete(item);
        setLoading(false);
    };

    return (
        <>
            <BreadCrumb activeTab={"Signatures"}>
                <SignatureTemplateForm
                    activeTab={"Signatures"}
                    editItem={editItem}
                    validationSchema={ValidationSchema}
                    onSubmit={handleSubmit}
                />
            </BreadCrumb>
            <SignatureTemplateLayout isLoading={isLoading} activeTab="Signatures">
                <table className="table mb-0 table-hover align-middle text-nowrap">
                    <thead>
                        <tr>
                            <th className="border-top-0">Id</th>
                            <th className="border-top-0">Name</th>
                            <th className="border-top-0">Owner</th>
                            <th className="border-top-0">Share</th>
                            <th className="border-top-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{item.Id}</th>
                                    <td>{item.Name}</td>
                                    <td>{item.OwnerId}</td>
                                    <td>
                                        <CustomCheckBox
                                            checked={item.Share}
                                            className="form-check-input"
                                            style={{ cursor: "pointer" }}
                                            disabled={!item.IsEditable}
                                            onChange={(e) => {
                                                handleShareStatusChange(item.Id, !item.Share);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <i
                                            title="Preview"
                                            style={{ cursor: "pointer" }}
                                            className="mdi mdi-eye mdi-18px"
                                            onClick={() => {
                                                handlePreviewClick(item);
                                            }}
                                        />
                                        {item.IsEditable && (
                                            <i
                                                style={{ cursor: "pointer", marginLeft: "9px" }}
                                                title="Edit this"
                                                className="mdi mdi-pencil mdi-18px"
                                                onClick={() => {
                                                    handleEdit(item);
                                                }}
                                            />
                                        )}
                                        {item.IsEditable && (
                                            <i
                                                style={{ cursor: "pointer", marginLeft: "9px" }}
                                                title="Detete?"
                                                className="mdi mdi-delete mdi-18px"
                                                onClick={() => {
                                                    confirmDelete(item);
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </SignatureTemplateLayout>
        </>
    );
};

export default withToastProvider(Screen);
