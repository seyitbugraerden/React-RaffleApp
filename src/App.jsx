import React, { useState, useRef } from "react";
import { Panel } from "primereact/panel";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "./App.css";

function App() {
  const [visible, setVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const toast = useRef(null);

  const [data, setData] = useState([
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
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
  return (
    <>
      <Panel header="Online Raffle Program">
        <Button
          onClick={() => setVisible(true)}
          icon="pi pi-check"
          label="Confirm"
        />
      </Panel>{" "}
      <Toast ref={toast} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message={
          <div>
            {data.map((item, index) => (
             {isValid ? (<i className="bi bi-pencil-square"></i>) : (
              <p key={index}>
                {item.name} {item.code}
                <span>
                  <i className="bi bi-pencil-square"></i>
                  <i
                    className="bi bi-trash"
                    onClick={() => {
                      deleteItem(item.name);
                    }}
                  ></i>
                </span>
              </p>
            )}
            
              
            ))}
          </div>
        }
        header="Raffle Elements"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
    </>
  );
}

export default App;
