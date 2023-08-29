var arboleda = "09edee8d-77e2-4356-84b1-5539ab6ca378"

async function startViewer() {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        var viewer;

        let res = await fetch(conversionServiceURI + '/api/streamingSession');
        var data = await res.json();
        var endpointUriBeginning = 'ws://';

        if(conversionServiceURI.substring(0, 5).includes("https")){
                endpointUriBeginning = 'wss://'
        }

        await fetch(conversionServiceURI + '/api/enableStreamAccess/' + data.sessionid, { method: 'put', headers: { 'items': JSON.stringify([arboleda]) } });

        viewer = new Communicator.WebViewer({
                containerId: "viewer-container",
                endpointUri: endpointUriBeginning + data.serverurl + ":" + data.port + '?token=' + data.sessionid,
                model: "arboleda",
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer",
                rendererType: 0
        });

        viewer.start();

        return viewer;

}

async function fetchVersionNumber() {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        let res = await fetch(conversionServiceURI + '/api/hcVersion');
        var data = await res.json();
        versionNumer = data;
        
        return data

}



async function initializeViewer() {
        viewer = await startViewer()
        viewer.setCallbacks({
          sceneReady: function () {
            viewer.getSelectionManager().setHighlightNodeSelection(false);
            viewer.getSelectionManager().setHighlightLineElementSelection(false);
            viewer.getSelectionManager().setHighlightFaceElementSelection(false);
            viewer.getSelectionManager().setSelectParentIfSelected(false);
            viewer.getView().setAmbientOcclusionEnabled(true);
            viewer.getView().setAmbientOcclusionRadius(0.02);
            viewer.getView().setBackfacesVisible(true);
            viewer.setClientTimeout(60, 60);
            var newCam = viewer.getView().getCamera();
            newCam.setWidth(65000);
            newCam.setHeight(65000);
            newCam.setPosition(new Communicator.Point3(-53469, -23219, 30264));
            newCam.setTarget(new Communicator.Point3(-636, -1873, 18152));
            newCam.setUp(
              new Communicator.Point3(
                0.19277308590766995,
                0.07788537845601243,
                0.9781474352940858
              )
            );
            viewer.getView().setCamera(newCam);
            viewer.getView().setDrawMode(Communicator.DrawMode.Shaded);
    
            var op = viewer.operatorManager.getOperator(Communicator.OperatorId.Navigate)
            op.setOrbitFallbackMode(Communicator.OrbitFallbackMode.CameraTarget)
    
            menuToggle()
          },
          modelStructureReady: function () {
            initDemo();
            getFloors(3);
          },
        });
    
        window.onresize = function () {
          viewer.resizeCanvas();
        };
}