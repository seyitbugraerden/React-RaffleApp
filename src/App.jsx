import React, { useState, useRef } from "react";
import { Panel } from "primereact/panel";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import "./App.css";
import "primeicons/primeicons.css";
import { Tree } from "primereact/tree";

function App() {
  const [visible, setVisible] = useState(false);
  const [deger, setDeger] = useState();
  const [isCreated, setIsCreated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useRef(null);

  const [data, setData] = useState([
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]);
  const accept = () => {
    toast.current.show({
      severity: "success",
      summary: "Veriler Güncellendi",
      life: 3000,
    });
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
            {data.map((item, index) => (
              <p key={index}>
                {item.name} {item.code}
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
        accept={accept}
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
    </>
  );
}

export default App;
