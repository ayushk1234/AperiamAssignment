// import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import BarGraph from './BarGraph';
import {zoomIn} from './MolecularViewer'

const ExcelFileParser = () => {
  const [excelData, setExcelData] = useState(null);
  const [uniqueObjects,setUniqueObjects]=useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [arrByID, setArrById] = useState(null);
  var findProb=''
                var higherProbMut=''
//   var arrByID=null;

  var count = 0;
  const handleItemClick =  (item) => {

   console.log(item)
    setSelectedItem(item);
    zoomIn(item)
    // console.log(selectedItem)
    // setArrById(excelData.filter(filterByID))

    // console.log(arrByID)


  };

  // export const zoomIn 

  const filterByID = (item)=> {
    //   console.log(selectedItem['WT Res'],selectedItem['Res_No'])
    //   console.log(item['WT Res'],item['Res_No'])

    if(item['WT Res'] === selectedItem['WT Res'] && item['Res_No'] === selectedItem['Res_No']){
        return true;
    }

    return false;
  }

  useEffect(() => {
      
    if(selectedItem){

        setArrById(excelData.filter(filterByID))

    
    // Your code that depends on the updated state
        // console.log('Updated state:', selectedItem);
    }
    // console.log(arrByID)

  }, [excelData,setArrById,selectedItem]);


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
      setExcelData(convertToJson(rows));
    //   const newjson = JSON.stringify(excelData, null, 2)
    //   console.log(newjson)
    //   console.log(excelData)

      
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
    if (excelData) {
        // console.log(excelData)
      displayValues(excelData);
    }
  }, [excelData]);

  const displayValues = (data) => {



    // const [proteinchain,setProteinChain]=useState()
   

    // const distinctAges = getDistinctValues(data, 'age');
    // console.log('--------');
    // console.log(typeof(data));
    const uniqueValues = [...new Set(data.map((obj) => {
        // console.log(obj)
        var newobj = {
            'WT Res': obj['WT Res'],
            'Res_No': obj['Res_No']
        }
        return newobj
    }
    ))
    ];
    setUniqueObjects( [...new Map(uniqueValues.map(obj => [JSON.stringify(obj), obj])).values()]);
  };





  return (

    <div>
        <p > Please upload your Enet  file</p>
      <input type="file" accept=".xls, .xlsx,.csv" onChange={handleFileUpload}  />
      {/* <input type="file" accept=".xls, .xlsx,.csv" onChange={handleFileUpload} /> */}

      <div >
      {uniqueObjects && (
        <div >
          <h3>Protein Sequence</h3>
          <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' , display: 'flex'}}>
          {/* <h1> {typeof(uniqueObjects)}</h1> */}
          <div  style={{ display: 'flex', flexWrap: 'wrap' , flex: '3',margin:'2px'}} >{uniqueObjects.map((item,key)=>
          {
              count++
            //   console.log(item)
              const getBackgroundColor = () => {


                // excelData.map((item,key)=>{})
                // var findProb=''
                // var higherProbMut=''
                const findsameProb =   excelData.filter((e,key)=>{
                    
                    if(item['WT Res'] === e['WT Res'] && item['Res_No'] === e['Res_No'] ){
                        if(e['WT Res'] == e['Mut Res']){
                            findProb =   parseFloat(e['Prob_Mut'])
                            console.log(findProb)
                        }
                        
                        
                        return true

                }

                // console.log(findsameProb)
            })
            // var findProb = ''
            const highestProb =findsameProb.filter((currentItem,key ) => {
                if( currentItem['WT Res'] != currentItem['Mut Res'])
                {
                    if(currentItem['Prob_Mut'] > findProb)
                      {
                          return true
                      }
                    }
              });
              return  highestProb.length>0 ? 'green' : '#fd5c63';

              };
              return(<p key={item['Res_No']} style={{ marginRight: '2px', marginBottom: '5px', cursor: 'pointer',display:'fix' }} onClick={ () => handleItemClick(item)}>
                {(count%10==0)?<div style={{fontSize:'12px'}}>{item['Res_No']}</div>: null}
                <div style={{  border: '1px solid #ccc' ,marginRight: '2px',borderRadius: '50%',textAlign: 'center',marginBottom: '5px',fontSize: '14px', paddingRight:'2px', paddingLeft:'2px',backgroundColor:  getBackgroundColor()}}>{item['WT Res']}</div>
            </p>)
          })
          }</div>

        
      

      {/* Side panel with bar chart */}
      {arrByID  && (
          <div style={{ border: '1px solid #ccc',padding: '10px',flex:4 }}>
        <div style={{ marginLeft: '10px', border: '1px solid #ccc', padding: '10px' }}>
       <BarGraph arr={arrByID} findProb={findProb}/>
          {/* Render your bar chart based on selectedItem */}
          <h4>{selectedItem['WT Res']}</h4>
          {/* Add your bar chart components here */}
            </div>
          <div style={{display:'flex', flexWrap: 'wrap' ,marginLeft: '10px'}}>
            <div>Explanation</div>
                {arrByID.map((item,key)=>{

                // return (<p key={item['id']} style={{  border: '1px solid #ccc' ,borderRadius: '20%', marginBottom: '5px', cursor: 'pointer',display:'fix' }} onClick={ () => handleItemClick(item)}>{item['Gpt_response']}</p>)
                const gptResponse = item['Gpt_response'];

                // Only render if gptResponse is present
                if (gptResponse !== undefined && gptResponse !== null && gptResponse !== '') {
                  return (
                    <p key={item['id']} style={{backgroundColor : 'rgba(99, 255, 132, 0.6)',width: '200px', height: '80px',margin:'10px', border: '1px solid #ccc', borderRadius: '5%', marginBottom: '5px', cursor: 'pointer', display: 'wrap',textAlign:'left',padding:'2px' }}>
                     {item['Mutation']} {gptResponse}
                    </p>
                  );
                }
              
                return null;
          })}</div>
        </div>
      )}

      
      </div>
    </div>
          
        
      )}
      </div>
    </div>
  );
};

export default ExcelFileParser;
