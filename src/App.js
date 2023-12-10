import React from 'react';
// import './style.css';
// import Molstar from 'molstar-react';
import MolecularViewer from './MolecularViewer';
import ProteinViewer from './MolViewer';
import ExcelFileParser from './FileRead'
import GptResponse from './GptResponse';
// import MolstarViewer from './MolstarViewer';
// import { ProteinStructureViewer } from 'molstar-react';
import BarGraph from './BarGraph';
import DropdownMenu from './DropdownMenu';
// import 


export const App = () => {
  return (
    <div>
      <h2>Aperiam Assignment</h2>
      {/* <DropdownMenu /> */}
      {/* <DropdownMenu /> */}
      <ExcelFileParser/>
      {/* <MolecularViewer /> */}
      {/* <ProteinViewer/> */}
      
    </div>
   
  );
};

export default App;
