import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { API } from "../config/api/api.config";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { headerConfig } from "../config/headerConfig";
import "./Car.css";
export const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
};

const Car = () => {
    const [showForm, setShowForm] = useState(true);
    const [carMakeDropdown, setCarMakeDropdown] = useState([]);
    const [carModelDropdown, setCarModelDropdown] = useState([]);
    const [carVariantDropdown, setCarVariantDropdown] = useState([]);
    const [carRegDropdown, setCarRegDropdown] = useState([]);
    const [shouldReload, setShouldReload] = useState(1);

    const [carMakeSelected, setCarMakeSelected] = useState("");
    const [carModelSelected, setCarModelSelected] = useState("");
    const [carVariantSelected, setCarVariantSelected] = useState("");
    const [carRegNuSelected, setCarRegNuSelected] = useState("");

    useEffect(() => {
        async function getMakeDropdown() {
            return await axios({
                url: API.endpoint + "/car/get-make-dropdown",
                ...headerConfig,
            });
        }
        async function getModelDropdown() {
            return await axios({
                url: API.endpoint + "/car/get-model-dropdown",
                ...headerConfig,
            });
        }
        async function getVariantDropdown() {
            return await axios({
                url: API.endpoint + "/car/get-variant-dropdown",
                ...headerConfig,
            });
        }
        async function getReg() {
            return await axios({
                url: API.endpoint + "/car/get-reg-nu-dropdown",
                ...headerConfig,
            });
        }
        getMakeDropdown()
            .then((result) => {
                setCarMakeDropdown(result.data.data);
            })
            .catch((err) => {
                // do nothing
            });
        getModelDropdown()
            .then((result) => {
                setCarModelDropdown(result.data.data);
            })
            .catch((err) => {
                // do nothing
            });

        getVariantDropdown()
            .then((result) => {
                setCarVariantDropdown(result.data.data);
            })
            .catch((err) => {
                // do nothing
            });
        getReg()
            .then((result) => {
                setCarRegDropdown(result.data.data);
            })
            .catch((err) => {
                // do nothing
            });
    }, [shouldReload]);
    const addCarHandler = () => {
        axios
            .post(
                API.endpoint + "/car/add-car",
                {
                    make: carMakeSelected,
                    model: carModelSelected,
                    variant: carVariantSelected,
                    reg_number: carRegNuSelected,
                },
                {
                    ...headerConfig,
                    validateStatus: () => true,
                }
            )
            .then((result) => {
                if (result.data.success) {
                    toast.success(result.data.message, toastOptions);
                    setShouldReload((prevState) => ++prevState);
                } else toast.error(result.data.message, toastOptions);
            })
            .catch((err) => {
                console.log(err.message);
                toast.error("Something went wrong", toastOptions);
            });
    };
    return (
        <div className="d-flex align-items-center mt-3 w-100 flex-column">
            <div
                className="border border-light-subtle p-3"
                style={{ width: "30%", backgroundColor: "white" }}
            >
                <div className="d-flex justify-content-between">
                    <div>ADD CAR</div>
                    <i className="pi pi-times align-self-center"></i>
                </div>
                <div
                    className="d-flex justify-content-between mt-4 w-100"
                    style={{ height: "3.4rem" }}
                >
                    <button
                        className="m-1 py-1 px-auto submit-button"
                        onClick={() => setShowForm((prevState) => !prevState)}
                    >
                        ADD CAR
                    </button>
                    <button
                        className="m-1 py-1 px-auto rounded-3 submit-button reg-button"
                        style={{
                            backgroundColor: "#FFCC00",
                            borderStyle: "none",
                            color: "#000000",
                            width: "33%",
                        }}
                    >
                        {carRegNuSelected ? carRegNuSelected : "REG NU"}
                    </button>
                    <button
                        className="m-1 py-1 px-auto submit-button"
                        onClick={() => addCarHandler()}
                    >
                        SUBMIT
                    </button>
                </div>
                <div className="row mt-4 w-100 text-below-button">
                    <div className="col-4 text-center">{carMakeSelected}</div>
                    <div className="col-4 text-center">{carModelSelected}</div>
                    <div className="col-4 text-center">
                        {carVariantSelected}
                    </div>
                </div>
            </div>
            <div className="mt-4" hidden={showForm}>
                <Card>
                    <div className="container text-sm">
                        <div className="row g-6">
                            <div className="col-3 d-flex flex-column">
                                <InputText
                                    value={carMakeSelected}
                                    onChange={(e) =>
                                        setCarMakeSelected(e.target.value)
                                    }
                                    className="p-inputtext-sm w-100"
                                    placeholder="Add Vehicle Make"
                                />
                                <Dropdown
                                    value={carMakeSelected}
                                    onChange={(e) =>
                                        setCarMakeSelected(e.value)
                                    }
                                    options={carMakeDropdown}
                                    placeholder="Select Vehicle Make"
                                    className="p-inputtext-sm mt-2 p-0"
                                    optionValue="make"
                                    optionLabel="make"
                                />
                            </div>
                            <div className="col-3  d-flex flex-column">
                                <InputText
                                    value={carModelSelected}
                                    onChange={(e) =>
                                        setCarModelSelected(e.target.value)
                                    }
                                    className="p-inputtext-sm  w-100"
                                    placeholder="Add Vehicle Model"
                                />
                                <Dropdown
                                    value={carModelSelected}
                                    onChange={(e) =>
                                        setCarModelSelected(e.value)
                                    }
                                    options={carModelDropdown}
                                    placeholder="Select Vehicle Model"
                                    className={`p-inputtext-sm mt-2 p-0`}
                                    optionValue="car_model"
                                    optionLabel="car_model"
                                />
                            </div>
                            <div className="col-3  d-flex flex-column">
                                <InputText
                                    value={carVariantSelected}
                                    onChange={(e) =>
                                        setCarVariantSelected(e.target.value)
                                    }
                                    className="p-inputtext-sm  w-100"
                                    placeholder="Add Vehicle Variant"
                                />
                                <Dropdown
                                    value={carVariantSelected}
                                    onChange={(e) =>
                                        setCarVariantSelected(e.value)
                                    }
                                    options={carVariantDropdown}
                                    placeholder="Select Vehicle Variant"
                                    className={`p-inputtext-sm mt-2 p-0`}
                                    optionValue="variant"
                                    optionLabel="variant"
                                />
                            </div>
                            <div className="col-3  d-flex flex-column">
                                <InputText
                                    value={carRegNuSelected}
                                    onChange={(e) =>
                                        setCarRegNuSelected(
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    className="p-inputtext-sm  w-100"
                                    placeholder="Add Reg Number"
                                />
                                <Dropdown
                                    value={carRegNuSelected}
                                    onChange={(e) =>
                                        setCarRegNuSelected(e.value)
                                    }
                                    options={carRegDropdown}
                                    placeholder="Select Reg Number"
                                    className={`p-inputtext-sm mt-2 p-0`}
                                    optionValue="reg_number"
                                    optionLabel="reg_number"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default Car;
