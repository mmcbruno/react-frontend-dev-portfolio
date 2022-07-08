import React, {useEffect, useState} from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import {Flag} from "./components/Flag";
import {updateFilter} from "./utils";

const App = () => {
    const [resumeData, setResumeData] = useState({})
    const [sharedData, setSharedData] = useState({})
    const [currentLang, setCurrentLang] = useState("")


    useEffect(() => {
        const currentLang = window.sessionStorage.getItem("lang") || window.$primaryLanguage;
        setCurrentLang( currentLang);
        loadSharedData();
        loadResumeFromPath(`res_${currentLang}.json`);
        updateFilter(currentLang, true);
    }, [])

    useEffect(() => {
        window.sessionStorage.setItem("lang", currentLang);
    }, [currentLang]);

    const loadResumeFromPath = (path) => {
        $.ajax({
            url: path,
            dataType: "json",
            cache: false,
            success: function (data) {
                setResumeData(data)
            },
            error: function (xhr, status, err) {
                alert(err);
            },
        });
    }


    const loadSharedData = () => {
        $.ajax({
            url: `portfolio_shared_data.json`,
            dataType: "json",
            cache: false,
            success: function (data) {
                setSharedData(data)
                document.title = `${data.basic_info.name}`;
            },
            error: function (xhr, status, err) {
                alert(err);
            },
        });
    }


    const applyPickedLanguage = (pickedLanguage) => {
        const languages = [window.$primaryLanguage, window.$secondaryLanguage, window.$thirdLanguage];
        var restLangIconIds = languages.filter(lang => lang !== pickedLanguage);
        updateFilter(pickedLanguage, true);
        restLangIconIds.map(langId => {
            updateFilter(langId, false);
        })
        setCurrentLang(pickedLanguage);
        document.documentElement.lang = pickedLanguage;
        loadResumeFromPath(`res_${pickedLanguage}.json`);
    }






    return (
        <div>
            <Header sharedData={sharedData.basic_info}/>
            <div className="col-md-12 mx-auto text-center language">
                <Flag country={"italy"} lang={window.$secondaryLanguage}
                      applyPickedLanguage={applyPickedLanguage}/>
                <Flag country={"united-kingdom"} lang={window.$primaryLanguage}
                      applyPickedLanguage={applyPickedLanguage}/>
                <Flag country={"spain"} lang={window.$thirdLanguage}
                      applyPickedLanguage={applyPickedLanguage}/>
            </div>
            <About
                resumeBasicInfo={resumeData.basic_info}
                sharedBasicInfo={sharedData.basic_info}
            />
            {/*<Projects*/}
            {/*  resumeProjects={resumeData.projects}*/}
            {/*  resumeBasicInfo={resumeData.basic_info}*/}
            {/*/>*/}
            <Skills
                sharedSkills={sharedData.skills}
                resumeBasicInfo={resumeData.basic_info}
            />
            <Experience
                resumeExperience={resumeData.experience}
                resumeBasicInfo={resumeData.basic_info}
            />
            <Footer sharedBasicInfo={sharedData.basic_info}/>
        </div>
    );


}

export default App;
