import React, { useState, useRef } from "react";
import { Panel } from "primereact/panel";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import "./App.css";
import "primeicons/primeicons.css";
import { Tree } from "primereact/tree";

function App() {
  const [visible, setVisible] = useState(false);
  const [deger, setDeger] = useState();
  const [isCreated, setIsCreated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const toast = useRef(null);

  const [data, setData] = useState([
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]);
  const accept = () => {
    if (value.trim() === "") {
      // Display a message or handle the empty value case as needed
      toast.current.show({
        severity: "warn",
        summary: "Please enter a value",
        life: 3000,
      });
      return;
    }

    setData((prevData) => {
      const newData = [...prevData, { name: value, code: value }];
      toast.current.show({
        severity: "success",
        summary: "Veriler Güncellendi",
        life: 3000,
      });
      return newData;
    });

    setValue("");
    setShow(false);
  };
  const deleteItem = (deletedVeri) => {
    setData(data.filter((item) => item.name !== deletedVeri));
  };
  const generate = () => {
    setDeger(Math.floor(Math.random() * data.length));
    setIsOpen(true);
    setTimeout(() => {
      setIsCreated(false);
    }, 1000);
    setIsCreated(true);
  };

  return (
    <>
      <Panel header="Online Raffle Program">
        <Button
          onClick={() => setVisible(true)}
          icon="pi pi-user"
          label="Element List"
        />
        <Button onClick={() => generate()} icon="pi pi-bolt" label="Generate" />
        <br />
        {isOpen ? (
          isCreated ? (
            <ProgressSpinner
              style={{
                width: "50px",
                height: "50px",
                marginTop: "50px",
                marginBottom: "20px",
              }}
              strokeWidth="4"
              animationDuration=".5s"
            />
          ) : (
            <p>{data[deger] && data[deger].name}</p>
          )
        ) : (
          ""
        )}
      </Panel>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message={
          <div>
            <ConfirmDialog
              className="center"
              visible={show}
              header="Add New Data"
              accept={accept}
              message={
                <InputText
                  className="center"
                  placeholder="New Data"
                  accept={accept}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{
                    width: "50%",
                    backgroundColor: "transparent",
                    border: "0px",
                    borderBottom: "2px solid black",
                    outline: "0px",
                    boxShadow: "0px",
                  }}
                />
              }
              style={{ width: "50vw" }}
              breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
            />
            <button
              className="add_data"
              onClick={() => {
                setShow(true);
              }}
            >
              Add New Data
            </button>
            {data.map((item, index) => (
              <p key={index}>
                {item.name}
                {data.length === 1 ? (
                  <i
                    className="bi bi-trash"
                    style={{ cursor: "not-allowed" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-trash"
                    onClick={() => {
                      deleteItem(item.name);
                    }}
                  ></i>
                )}
              </p>
            ))}
            <i
              onClick={() => {
                setVisible(false);
              }}
              className="bi bi-x-lg"
            ></i>
          </div>
        }
        header="Raffle Elements"
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
    </>
  );
}

export default App;
