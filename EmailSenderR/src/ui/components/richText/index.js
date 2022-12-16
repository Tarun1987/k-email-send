import React, { useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { useField } from "formik";
import PropTypes from "prop-types";

/**
 * @param {Jodit} jodit
 */
function preparePaste(jodit) {
    jodit.e.on(
        "paste",
        (e) => {
            jodit.e.stopPropagation("paste");
            jodit.s.insertHTML(Jodit.modules.Helpers.getDataTransfer(e).getData(Jodit.constants.TEXT_HTML).replace(/a/g, "b"));
            return false;
        },
        { top: true }
    );
}
Jodit.plugins.add("preparePaste", preparePaste);

const RichText = (props) => {
    const editor = useRef(null);
    // const config = {
    //     readonly: false,
    //     height: 400,
    //     autofocus: true,
    //     toolbarAdaptive: true,
    //     buttons:
    //         "bold,italic,underline,strikethrough,eraser,|,ul,ol,|,font,fontsize,paragraph,classSpan,lineHeight,|,superscript,subscript,image,\n,table,cut,copy,paste,selectall,copyformat,hr",
    // };
    const config = {
        zIndex: 100,
        colorPickerDefaultTab: "background",
        height: 400,
        buttons: [
            "bold",
            "strikethrough",
            "underline",
            "italic",
            "|",
            "ul",
            "ol",
            "|",
            "outdent",
            "indent",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "\n",
            "image",
            "table",
            "link",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "eraser",
            "copyformat",
            "|",
            "fullsize",
            "print",
        ],
        buttonsXS: ["bold", "image", "|", "brush", "paragraph", "|", "align", "|", "undo", "redo", "|", "eraser", "dots"],
        textIcons: false,
    };
    const [field, meta, helpers] = useField(props.name);

    const { value } = meta;
    const { setValue, setTouched } = helpers;

    const handleUpdate = (innerHTML) => {
        setValue(innerHTML);
        setTouched(true);
    };

    const handleChange = (html) => {};

    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <br />
            <div className="_RichText">
                <JoditEditor ref={editor} value={value} config={config} onBlur={handleUpdate} onChange={handleChange} />
            </div>

            {meta.touched && meta.error && (
                <>
                    <span className="text-danger field-validation-error">
                        <span id="Subject-error" className="">
                            {meta.error}
                        </span>
                    </span>
                </>
            )}
        </>
    );
};

RichText.propTypes = {
    label: PropTypes.string,
};

export default RichText;
