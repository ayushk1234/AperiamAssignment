import React from 'react';
// import './style.css';
// import Molstar from 'molstar-react';
import MolecularViewer from './MolecularViewer';
import ExcelFileParser from './FileRead'
import GptResponse from './GptResponse';
// import MolstarViewer from './MolstarViewer';
// import { ProteinStructureViewer } from 'molstar-react';
import BarGraph from './BarGraph';
import DropdownMenu from './DropdownMenu';


export const App = () => {
  return (
    <div>
      <h1>Aperiam Assignment</h1>
      {/* <DropdownMenu /> */}
      {/* <DropdownMenu /> */}
      {/* <ProteinStructureViewer
        pdbId="1btl" // Replace with the PDB ID of the protein structure you want to visualize
        focusOn="polymer"
      /> */}

      {/* <GptResponse/> */}
      <ExcelFileParser/>
      
      {/* <BarGraph /> */}
      
      {/* <{    }/> */}

      {/* <MolecularViewer /> */}
      {/* <MolstarViewer /> */}
    </div>
    // <div>
    //   <Molstar pdbId="1LOL" />
    // </div>
  );
};

export default App;
