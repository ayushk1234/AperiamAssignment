// import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import BarGraph from './BarGraph';

const GptResponse = () => {
  const [gptExcelData, setGptExcelData] = useState(null);
  const [uniqueObjects,setUniqueObjects]=useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [arrByID, setArrById] = useState(null);
//   var arrByID=null;

  var count = 0;
//   const handleItemClick =  (item) => {

   
//     setSelectedItem(item);
//     console.log(selectedItem)
//     // setArrById(excelData.filter(filterByID))

//     // console.log(arrByID)


//   };

//   const filterByID = (item)=> {
//       console.log(selectedItem['WT Res'],selectedItem['Res_No'])
//       console.log(item['WT Res'],item['Res_No'])

//     if(item['WT Res'] === selectedItem['WT Res'] && item['Res_No'] === selectedItem['Res_No']){
//         return true;
//     }

//     return false;
//   }

//   useEffect(() => {
      
//     if(selectedItem){

//         setArrById(gptExcelData.filter(filterByID))

    
//     // Your code that depends on the updated state
//         console.log('Updated state:', selectedItem);
//     }
//     // console.log(arrByID)

//   }, [gptExcelData,setArrById,selectedItem]);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      parseExcel(file);
    }
  };

  const parseExcel = async (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
    //   const data = new Uint8Array(e.target.result);
       const data = e.target.result
    //   const workbook = XLSX.read(data, { type: 'array' });
      const workbook = XLSX.read(data, { type: 'binary' });
    //   const workbook = XLSX.read(data);
    // console.log(workbook)
      // Assuming the first sheet is the one you want to parse
      const sheetName = workbook.SheetNames[0]; 
    //   const rows  = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
      const rows = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName], { header: 1 });
    

    //   console.log('Excel Parsed:', rows );
    //   console.log(typeof(convertToJson(rows)))
    setGptExcelData(convertToJson(rows));
    //   const newjson = JSON.stringify(excelData, null, 2)
    //   console.log(newjson)
    //   console.log(gptExcelData)

      
    };

    reader.readAsArrayBuffer(file);
    
  };

  const  convertToJson = (csv)=> {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      obj['id']=i
      

      result.push(obj);
    }

    //return result; //JavaScript object
    // return JSON.stringify(result); //JSON
    return result; //JSON
  }

  useEffect(() => {
    if (gptExcelData) {
        // console.log(gptExcelData)
      displayValues(gptExcelData);
    //   console.log(uniqueObjects)
    }
  }, [gptExcelData
  ]);

  const displayValues = (data) => {

    // console.log('--------');
    // console.log(typeof(data));
    const uniqueValues = [...new Set(data.map((obj) => {
        // console.log(obj)
        var newobj = {
            'gpt_prompt': obj['gpt_prompt'],
            'gpt_response': obj['gpt_response'],
            'index':obj['index'],
            'type':obj['type'],
            'atom':obj['atom'],
            'gt':obj['gt'],
            'pred':obj['pred'],
            'id':obj['id']
        }
        return newobj
    }
    ))
    ];
    console.log(uniqueValues)
    setUniqueObjects( [...new Map(uniqueValues.map(obj => [JSON.stringify(obj), obj])).values()]);

  };



  return (
    <div>
        <p> Please upload your Gpt response file</p>
      <input type="file" accept=".xls, .xlsx,.csv" onChange={handleFileUpload}  />
      {/* <input type="file" accept=".xls, .xlsx,.csv" onChange={handleFileUpload} /> */}
      {/* {uniqueObjects && (
        <div>
          <h2>Protein Sequence</h2>
          {/* <h1> {typeof(uniqueObjects)}</h1> */}
          {/* <div  style={{ display: 'flex', flexWrap: 'wrap' }} >{uniqueObjects.map((item,key)=>
          {
              count++
              return(<p key={item['Res_No']} style={{ marginRight: '2px', marginBottom: '10px', cursor: 'pointer' }} onClick={ () => handleItemClick(item)}>
                {(count%10==0)?<div>{item['Res_No']}</div>:<div>{  }</div>}
                <div style={{  border: '1px solid #ccc' ,marginRight: '2px', marginBottom: '10px',backgroundColor:"green" }}>{item['WT Res']}</div>
            </p>)
          })
          }</div> */}
        {/* </div> */}
          
      {/* )} } */}
    </div>
  );
};

export default GptResponse;
