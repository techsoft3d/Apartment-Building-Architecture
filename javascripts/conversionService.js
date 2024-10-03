var arboleda = "1c8c285f-f5da-4ec2-9ea0-172ba5eda740"

async function startViewer() {
        var viewer;

        let sessioninfo = await caasClient.getStreamingSession();
        await caasClient.enableStreamAccess(sessioninfo.sessionid, [arboleda]);
        
        viewer = new Communicator.WebViewer({
                containerId: "viewer-container",
                endpointUri: sessioninfo.endpointUri,
                model: "arboleda",
                enginePath: `https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@20${versionNumer}`,
                rendererType: 0
        });

        viewer.start();

        return viewer;

}

async function fetchVersionNumber() {
  let data = await caasClient.getHCVersion();
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