import React from "react";

export const Flag = (props) => {

 const {lang,   country,  applyPickedLanguage} = props;

    return <div
        onClick={() =>
             applyPickedLanguage(lang)
        }
        style={{display: "inline"}}
    >
            <span
                className="iconify language-icon mr-5"
                data-icon={`twemoji-flag-for-flag-${country}`}
                data-inline="false"
                id={lang}
            ></span>
    </div>

}