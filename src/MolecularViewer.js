import React, {
    useEffect
} from 'react';


// import NGL from 'ngl';

// const MolecularViewer = () => {
//   useEffect(() => {
//     // Create NGL stage
//     const stage = new NGL.Stage('ngl-container');

//     // Load molecular structure
//     stage.loadFile('rcsb://1btl').then((component) => {
//       // Auto view the structure
//       stage.autoView();

//       // Handle any additional customization or interactions here
//     });

//     // Cleanup when the component unmounts
//     return () => {
//       stage.dispose();
//     };
//   }, []);

//   return <div id="ngl-container" style={{ width: '100%', height: '500px' }} />;
// };

const MolecularViewer = () => {
    useEffect(() => {
        // Load NGL library dynamically
        // const stage = new NGL.Stage('viewport');

        // Load molecular structure
        // stage.loadFile('rcsb://1btl').then((component) => {

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/ngl@2.2.1/dist/ngl.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            // NGL library loaded, now create the viewer
            const stage = new window.NGL.Stage('viewport');
            // stage.loadFile('rcsb://1btl', { defaultRepresentation: true });

            stage.loadFile('rcsb://1btl').then(function (o) {
                o.addRepresentation('cartoon', {
                    colorScheme: 'bfactor'
                });
                o.autoView();
            });
        };

        // stage.loadFile('rcsb://1crn').then(function (o) {
        //   o.addRepresentation('ball+stick', { colorScheme: 'bfactor' });
        //   o.autoView();
        // });

        // Cleanup when the component unmounts
        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return <div id = "viewport"
    style = {
        {
            width: '400px',
            height: '300px'
        }
    }
    />;
};

export default MolecularViewer;