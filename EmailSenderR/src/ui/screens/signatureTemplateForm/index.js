import React, { useState, createRef } from "react";
import { Formik, Form } from "formik";
import { useToast, withToastProvider } from "../../components/toast";
import Collapse from "react-bootstrap/Collapse";
import CustomInput from "../../components/input";
import RichText from "../../components/richText";
import CustomButton from "../../components/button";
import { useEffect } from "react";

const SignatureTemplateForm = ({ activeTab, validationSchema, editItem, onSubmit: handleSubmit }) => {
    const formikRef = createRef();
    const toast = useToast();
    const [open, setIsOpen] = useState(false);
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (editItem && Object.keys(editItem).length > 0) {
            setInitialValues({
                name: editItem.Name,
                body: editItem.Html,
            });
            setIsOpen(true);
        }
    }, [editItem]);

    const handleCancelClick = () => {
        setIsOpen(false);
        formikRef.current.resetForm();
    };

    const onFormSubmit = async (data) => {
        var isUpdating = editItem && Object.keys(editItem).length > 0;
        if (isUpdating) data.id = editItem.Id;
        var result = await handleSubmit(data);
        if (result) {
            setIsOpen(false);
            toast.success(`${activeTab} ${isUpdating ? "updated" : "created"} successfully!!`);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            formikRef.current.resetForm();
        }
    };

    return (
        <>
            {!open && (
                <div className="col-8">
                    <div
                        className="file btn btn-primary"
                        style={{ float: "right" }}
                        onClick={() => {
                            setIsOpen(true);
                        }}
                    >
                        Add new
                    </div>
                </div>
            )}

            <Formik
                innerRef={formikRef}
                enableReinitialize={editItem && Object.keys(editItem).length > 0}
                validateOnChange={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onFormSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Collapse in={open}>
                                <div className="card card-body" style={{ paddingTop: "25px" }}>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <CustomInput label={`${activeTab} Name`} id="name" name="name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <RichText label={`${activeTab} Body`} id="body" name="body" />
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12" style={{ marginTop: "10px" }}>
                                            <CustomButton
                                                type="submit"
                                                className="btn btn-primary"
                                                style={{ float: "right", marginLeft: "10px" }}
                                            >
                                                Save
                                            </CustomButton>
                                            <CustomButton
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleCancelClick}
                                                style={{ float: "right" }}
                                            >
                                                Cancel
                                            </CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default withToastProvider(SignatureTemplateForm);
