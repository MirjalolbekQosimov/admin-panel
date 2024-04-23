import React, { useState, useEffect } from "react";
import axios from 'axios'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

function NewTeacher() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [selectedOptions4, setSelectedOptions4] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const teacherCer = [
        { value: 'cefr_b1', label: 'Cefr B1' },
        { value: 'cefr_b2', label: 'Cefr B2' },
        { value: 'cefr_c1', label: 'Cefr C1' },
        { value: 'ielts_5_5', label: 'IELTS 5.5' },
        { value: 'ielts_6', label: 'IELTS 6' },
        { value: 'ielts_6_5', label: 'IELTS 6.5' },
        { value: 'ielts_7', label: 'IELTS 7' },
        { value: 'ielts_7_5', label: 'IELTS 7.5' },
        { value: 'ielts_8', label: 'IELTS 8' },
        { value: 'ielts_8_5', label: 'IELTS 8.5' },
        { value: 'ielts_9', label: 'IELTS 9' },
    ]

    const otherSubCer = [
        { value: 'cefr_b1', label: 'Cefr B1' },
        { value: 'cefr_b2', label: 'Cefr B2' },
        { value: 'cefr_c1', label: 'Cefr C1' }
    ]
    const handleChangeTechCer = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        teacher.certificate = selectedOptions.map(option => option.value).join(" ") // yoki join(",")
    };
    const handleChangePupCer = (selectedOptions2) => {
        setSelectedOptions2(selectedOptions2);
    };
    const handleChangeTechOtherCer = (selectedOptions3) => {
        setSelectedOptions3(selectedOptions3);
        teacher.certificate = selectedOptions3.map(option => option.value).join(" ")
    };
    const handleChangePupOtherCer = (selectedOptions4) => {
        setSelectedOptions4(selectedOptions4);
    };
    const [teacher, setTeacher] = useState({
        name: "",
        firstName: "",
        job: "",
        skill: "",
        pupil: 0,
        successful: 0,
        certificate: '',
    });
    let pupilCerEngStr = selectedOptions2.map(option => option.value).join(" ")
    let pupilCerOthStr = selectedOptions4.map(option => option.value).join(" ")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prevTeacher) => ({
            ...prevTeacher,
            [name]: value
        }));
    };
    const objResult = {
        name: "test2",
        firstName: "aliiiiiiiiiiii",
        job: "english",
        skill: "20 yil+",
        certificate: "cefr_c2 ielts_9",
        eng_cefr_b1: "10",
        pupil: "100",
        successful: "35"
    }
    const sendRating = () => {
        axios.post('https://shy-plum-alligator-yoke.cyclic.app/teacher', teacher)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(teacher);
        sendRating()
    };
    const options = [
        { value: 'english', label: 'Ingliz tili' },
        { value: 'otherSubject', label: 'Boshqa' }
    ];
    const handleChangeSelect = selectedOption => {
        setSelectedOption(selectedOption);
        teacher.job = selectedOption.value;
    };
    function newInput(type, name, placeholder) {
        return (
            <input
                type={type}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
            />
        )
    }
    function newIfEnglish(includes, text, inpName) {
        return (
            pupilCerEngStr.includes(includes) ? <label>
                Nechta o'quvchisida {text} darajasi bor:
                {newInput("number", inpName, "0")}
            </label> : ""
        )
    }
    function newIfOther(includes, text, inpName) {
        return (
            pupilCerOthStr.includes(includes) ? <label>
                Nechta o'quvchisida {text} darajasi bor:
                {newInput("number", inpName, "0")}
            </label> : ""
        )
    }

    return (
        <>
            <div className='admin-panel'>
                <form className="teacher-form" onSubmit={handleSubmit}>
                    <label>
                        Ism:
                        {newInput("text", "name", "O'qituvchining ismi")}
                    </label>
                    <label>
                        Familya:
                        {newInput("text", "firstName", "O'qituvchining familyasi")}
                    </label>
                    <label>
                        Kasbi:
                        <Select
                            value={selectedOption}
                            onChange={handleChangeSelect}
                            options={options}
                            placeholder="Qidirish..."
                        />
                    </label>
                    <label>
                        Tajribasi:
                        {newInput("text", "skill", "5yil+")}
                    </label>
                    {teacher.job == 'english' ? <label>
                        O'qituvchining sertifikatlari
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={teacherCer}
                            onChange={handleChangeTechCer}
                        />
                    </label> : (teacher.job == 'otherSubject') ? <label>
                        O'qituvchining sertifikatlari
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={otherSubCer}
                            onChange={handleChangeTechOtherCer}
                        />
                    </label> : ""}
                    <label>
                        O'quvchilari soni:
                        {newInput("number", "pupil", "0")}
                    </label>
                    <label>
                        Nechta o'quvchisi o'qishga kirganligi:
                        {newInput("number", "successful", "0")}
                    </label>
                    {teacher.job == 'english' ? <label>
                        O'quvchilarning sertifikatlari
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={teacherCer}
                            onChange={handleChangePupCer}
                        />
                    </label> : (teacher.job == 'otherSubject') ? <label>
                        O'quvchilarning sertifikatlari
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={otherSubCer}
                            onChange={handleChangePupOtherCer}
                        />
                    </label> : ""}
                    {newIfOther('cefr_b1', "Cefr B1", "oth_cefr_b1")}
                    {newIfOther('cefr_b2', "Cefr B2", "oth_cefr_b2")}
                    {newIfOther('cefr_c1', "Cefr C1", "oth_cefr_c1")}
                    {newIfEnglish('cefr_b1', "Cefr B1", "eng_cefr_b1")}
                    {newIfEnglish('cefr_b2', "Cefr B2", "eng_cefr_b2")}
                    {newIfEnglish('cefr_c1', "Cefr C1", "eng_cefr_c1")}
                    {newIfEnglish('ielts_5_5', "IELTS 5.5", "eng_ielts_5_5")}
                    {newIfEnglish('ielts_6', "IELTS 6", "eng_ielts_6")}
                    {newIfEnglish('ielts_6_5', "IELTS 6.5", "eng_ielts_6_5")}
                    {newIfEnglish('ielts_7', "IELTS 7", "eng_ielts_7")}
                    {newIfEnglish('ielts_7_5', "IELTS 7.5", "eng_ielts_7_5")}
                    {newIfEnglish('ielts_8', "IELTS 8", "eng_ielts_8")}
                    {newIfEnglish('ielts_8_5', "IELTS 8.5", "eng_ielts_8_5")}
                    {newIfEnglish('ielts_9', "IELTS 9", "eng_ielts_9")}
                    <button type="submit">Submit</button>
                </form >
            </div >
        </>
    );
}
export default NewTeacher;