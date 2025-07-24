import React, { useState, useRef } from "react";
import UserInput from "../components/userInput";
import Dashboard from "../components/Dashboard";
import SummaryApiMern from "../common/index_mern";

const Home = () => {
  const [receivedData, setReceivedData] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [mernData, setMernData] = useState([]);

  const final_data = useRef({}); // Use ref to persist across renders without reinitialization

  const basis_map = {
    "Type of Claim": {
      url: SummaryApiMern.tocFind.url,
      method: SummaryApiMern.tocFind.method,
    },
    "Customer Type": {
      url: SummaryApiMern.ctFind.url,
      method: SummaryApiMern.ctFind.method,
    },
    "Customer Name": {
      url: SummaryApiMern.cnFind.url,
      method: SummaryApiMern.cnFind.method,
    },
    "Customer Location": {
      url: SummaryApiMern.clFind.url,
      method: SummaryApiMern.clFind.method,
    },
    "Claim Responsibility": {
      url: SummaryApiMern.crFind.url,
      method: SummaryApiMern.crFind.method,
    },
    "Part Or Filter": {
      url: SummaryApiMern.pftFind.url,
      method: SummaryApiMern.pftFind.method,
    },
  };

  const handleDataFromUserInput = async (data) => {
    try {
      setReceivedData(data);

      const { selectedBasis } = data;
      const apiInfo = basis_map[selectedBasis];

      const mernResponse = await fetch(apiInfo.url, {
        method: apiInfo.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const mernDataResponse = await mernResponse.json();

      if (mernDataResponse.success) {
        const incomingData = mernDataResponse.data;
        console.log("MERN Data Response:", incomingData);
        setMernData(incomingData);

        const tempFinalData = {};

        incomingData.forEach((entry) => {
          const { claim_status, data } = entry;

          if (!tempFinalData[claim_status]) {
            tempFinalData[claim_status] = {};
          }

          Object.entries(data).forEach(([key, value]) => {
            if (!tempFinalData[claim_status][key]) {
              tempFinalData[claim_status][key] = [...value]; // clone the array
            } else {
              for (let i = 0; i < value.length; i++) {
                tempFinalData[claim_status][key][i] += value[i];
              }
            }
          });
        });

        final_data.current = tempFinalData;
        console.log("Processed Final Data:", final_data.current);

        setShowInput(false);
      } else {
        console.error("MERN API call failed:", mernDataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching MERN data:", error);
    }
  };

  const handleConfigureAgain = () => {
    final_data.current = {}; // Reset final data
    setMernData([]);
    setShowInput(true);
    setReceivedData(null);
  };

  return (
    <div className="min-h-screen">
      {showInput ? (
        <UserInput onDataSubmit={handleDataFromUserInput} />
      ) : (
        <Dashboard
          receivedData={receivedData}
          onConfigureAgain={handleConfigureAgain}
          finalData={final_data.current}
        />
      )}
    </div>
  );
};

export default Home;
