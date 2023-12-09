import React, {
    useEffect,useState
} from 'react';


import * as NGL from 'ngl';



const MolecularViewer = () => {
    const [getStage, setGetStage] = useState(null);


    useEffect(() => {
        // Load NGL library dynamically
        // const stage = new NGL.Stage('viewport');

        // Load molecular structure
        // stage.loadFile('rcsb://1btl').then((component) => {

        // const script = document.createElement('script');
        // script.src = 'https://unpkg.com/ngl@2.2.1/dist/ngl.js';
        // script.async = true;
        // document.head.appendChild(script);

        // script.onload = () => {
        //     // NGL library loaded, now create the viewer
        //     const stage = new window.NGL.Stage('viewport');
        //     // stage.loadFile('../1btl.pdb', { defaultRepresentation: true });
        //     // stage.loadFile('rcsb://1btl').then(function (o) {

        //     stage.loadFile('rcsb://1btl').then(function (o) {
        //         o.addRepresentation('cartoon', {
        //             colorScheme: 'bfactor'
        //         });
        //         o.autoView();
        //     });
        // };

        

    // const initializeViewer = async () => {

    //     try{
    //   // Initialize the NGL viewer
    //   const stage = new NGL.Stage('viewport');


 

    //   console.log(stage)

     

    //   // Load the protein structure from a .pdb file
    //   const pdbFilePath = 'path/to/your/protein.pdb'; // Update the path to your .pdb file
    //   const component = await stage.loadFile('rcsb://1btl' )
    // //   .then( function( comp ){
    // //        comp.addRepresentation( "ball+stick", { multipleBond: true } )});

      
    // //       comp.addRepresentations('cartoon', {

    //   // Add the component to the stage
    //   stage.addComponent(component);

    //   component.addRepresentation('cartoon', {
    //     colorScheme: 'bfactor'
    //   });
    //   // Auto-fit the view
    //   stage.autoView();
    //   setGetStage(stage);
    //     }
    //     catch(error){
    //         console.error(error)
    //     }
    // };

    

    // initializeViewer();




        const stage = new NGL.Stage('newport');
        // console.log(stage)C:\Users\aaka\Downloads\newCodebases\my-ngl-project\1btl.pdb
        // C:\Users\aaka\Downloads\newCodebases\my-ngl-project\src\MolecularViewer.js
        const pdbFilePath = '../1btl.pdb'; // Update the path to your .pdb file
        stage.loadFile( 'rcsb://1btl' ).then( function( comp ){
            // stage.loadFile( "http://files.rcsb.org/download/1crn.cif" ).then( function( comp ){
            console.log(comp)
        //   comp.addRepresentation( "ball+stick", { multipleBond: true } );
          comp.addRepresentation('cartoon', {
                        colorScheme: 'bfactor'
                    });
                    comp.autoView();

                    setGetStage(comp)
      } );

    // const stage = new NGL.Stage('viewport');
    // const component =  stage.loadFile('rcsb://1btl' )
    //   .then( function( comp ){
    //        comp.addRepresentation( "ball+stick", { multipleBond: true } )});

      
    //       comp.addRepresentations('cartoon', {
    //     console.log(component)
    //   // Add the component to the stage
    //   if(component){
    //   stage.addComponent(component);

    // //   component.addRepresentation('cartoon', {
    // //     colorScheme: 'bfactor'
    // //   });
    //   // Auto-fit the view
    //   stage.autoView();
    //   setGetStage(stage);

    }, []);


    const handleZoom = (position=1) => {
        console.log(getStage)

        if (getStage) {
            
                // Get the atom based on the index
                const atom = getStage.viewer;
                var atomProxy = getStage.structure.getAtomProxy(26)
                console.log(atomProxy.qualifiedName())
                // console.log(atom)
                // Zoom to the atom's position
                // getStage.zoomTo(atom, 1000); // Adjust the duration as needed
              
            // Zoom in to the specified position
            var sn = getStage.getZoom();
            console.log(sn) // Adjust the duration as needed
          }
      };




    // const initializeViewer =  () => {

    //     try{
    //         const stage = new NGL.Stage('viewport');


    //   stage.loadFile( 'rcsb://1btl' ).then( function( comp ){
    //         // stage.loadFile( "http://files.rcsb.org/download/1crn.cif" ).then( function( comp ){
    //         console.log(comp)
    //     //   comp.addRepresentation( "ball+stick", { multipleBond: true } );
    //       comp.addRepresentation('cartoon', {
    //                     colorScheme: 'bfactor'
    //                 });
    //                 comp.autoView();
    //   } );

    //   console.log('--------------')
    //   console.log(stage)

     

    //   // Load the protein structure from a .pdb file
    // //   const pdbFilePath = 'path/to/your/protein.pdb'; // Update the path to your .pdb file
    // //   const component = await stage.loadFile('rcsb://1btl' )
  
    // //   console.log(component)
    // //   stage.addComponent(component);

    // //   component.addRepresentation('cartoon', {
    // //     colorScheme: 'bfactor'
    // //   });
    // //   // Auto-fit the view
    // //   component.autoView();
    // //   setGetStage(stage);
    //     }
    //     catch(error){
    //         console.error(error)
    //     }
    // };

    
     

    return (
    <div >
        <button onClick={()=>handleZoom()}>clickss</button>
   
        <div id = "newport"  style={{height:'400px',width:'600px' ,overflow: 'auto'}} >

        
    
    </div>
    </div>)
};

export default MolecularViewer;