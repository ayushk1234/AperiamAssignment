import React, {
    useEffect,
    useState,useRef
} from 'react';

import * as NGL from 'ngl';

const ProteinViewer = ({
    selectedItem
}) => {
    //   const [representationToAdd, setRepresentationToAdd] = useState(null);
    //   const [representations, setRepresentations] = useState(selectedItem);
    const [stage, setStage] = useState(null);
    const stageRef = useRef(null);

    // console.log(selectedItem)

    useEffect(() => {
        // Setup to load data from rawgit
        // NGL.DatasourceRegistry.add(
        //     'data',
        //     new NGL.StaticDatasource('//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/')
        // );

        if (!stageRef.current) {
            // Create the Stage only if it hasn't been created yet
            const newStage = new NGL.Stage('viewport');
            setStage(newStage);
            stageRef.current = true;
            // console.log(newStage)
      
            // Event listener for resizing
            window.addEventListener('resize', function (event) {
              newStage.handleResize();
            });
          } else {
            // Use the existing Stage instance
            const existingStage = stage;
            // console.log(existingStage)
            // existingStage.removeAllComponents(); // Clear previous components if needed
      
            // Load new content or representations based on the selectedItem
            if (selectedItem) {
                loadFileAndCreateDefaultRepresentations(existingStage, selectedItem);
            }
          }


    }, [selectedItem]); // Include representations as a dependency to trigger updates when it changes


    const loadFileAndCreateDefaultRepresentations = async (newStage, selectedItem) => {
        try {


            newStage.eachRepresentation(function (r) {
                // console.log(r)
                r.dispose();
            });

            const structureComponent = await newStage.loadFile('rcsb://1btl.mmtf');

            structureComponent.addRepresentation('cartoon', {
                colorScheme: 'bfactor'
            });
            if (selectedItem && selectedItem['Res_No']) {
          
                structureComponent.addRepresentation('axes', {
                    sele: selectedItem['Res_No'],
                    showAxes: false,
                    showBox: true,
                    radius: 0.2,
                });
                structureComponent.addRepresentation('ball+stick', {
                    sele: selectedItem['Res_No']
                });
                structureComponent.addRepresentation('ball+stick', {
                    sele: selectedItem['Res_No']
                });
            }
        
            newStage.autoView();

            // Rotate using principal axes
            const principalAxes = structureComponent.structure.getPrincipalAxes();
            // newStage.animationControls.rotate(principalAxes.getRotationQuaternion(), 1000);

        
            // var spacefillRepr = structureComponent.addRepresentation("ball+stick", { sele: "NONE" })
            // newStage.viewerControls.zoom(2)
            if (selectedItem) {
                const position = new NGL.Vector3(
                    -16, // Replace with the actual X coordinate
                    -23, // Replace with the actual Y coordinate
                  -15, )
                // const atomIndex = selectedItem['Res_No']; // Replace with the actual atom index
                const duration = 5000; // Duration of the animation in milliseconds
                // console.log(new NGL.Selection(`_${atomIndex}`))
                // Zoom to the specified atom index
                // newStage.viewerControls.zoom(new NGL.Selection(`${atomIndex}`), duration);
                newStage.animationControls.zoomMove(position,2.5, duration);
                // newStage.animationControls.pau(position,1, duration);
              }
            // newStage.zoom(new NGL.Selection(`#${atomIndex}`), duration);
            function getCenterArray () {
                var position = new NGL.Vector3()
                // console.log(newStage)
                // console.log(structureComponent)
                // console.log(structureComponent.parameters)
                // console.log(newStage.viewer)
                // console.log(newStage.autoView)
                // console.log('position')
                console.log(position)
                position.copy(newStage.viewerControls.position)
                console.log( newStage.animationControls.zoom)
                // console.log(position.copy(newStage.viewerControls.position))

                // console.log(newStage.viewerControls.zoom(30))
                // newStage.viewerControls.zoom(30)
                console.log('newStage.viewerControls')
                console.log(newStage.viewerControls.position)
                // console.log(position.negate())
                return position.negate()
              }

            // var sphereBuffer = new NGL.SphereBuffer({
            //     position: new Float32Array(getCenterArray().toArray()),
            //     color: new Float32Array([ 1, 0.5, 0 ]),
            //     radius: new Float32Array([10])
            //   })
            //   structureComponent.addBufferRepresentation(sphereBuffer, { opacity: 0.5 })
            // var prevSele = ""
            // var prevPos = new NGL.Vector3(Infinity, Infinity, Infinity)
            // newStage.viewerControls.signals.changed.add(function () {
            //   var pos = getCenterArray()
            //   if (pos.distanceTo(prevPos) > 0.1) {
            //     sphereBuffer.setAttributes({ "position": pos.toArray() })
            //     prevPos = pos
            //     var sele = structureComponent.structure.getAtomSetWithinPoint(pos,10).toSeleString()
            //     if (sele !== prevSele) {
            //       spacefillRepr.setSelection(sele)
            //       prevSele = sele
            //     }
            //   }
            // })
            // newStage.autoView();
        } catch (error) {
            console.error('Error loading file:', error);
        }
    };

    return ( 
        selectedItem && <div >
            {/* <div id={`viewport-${selectedItem ? selectedItem['Res_No'] : 'default'}`} style = {{ width: '500px',height: '300px',padding:'10px' , overflow:'hidden'}} > </div> */}
            <div id="viewport" style = {{ width: '500px',height: '500px',padding:'10px' , margin :'10px',overflow:'auto'}} > </div>


        </div>
    );
};

export default ProteinViewer;