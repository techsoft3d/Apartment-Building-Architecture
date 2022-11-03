var arboleda = "09edee8d-77e2-4356-84b1-5539ab6ca378"

async function startViewer() {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        var viewer;

        let res = await fetch(conversionServiceURI + '/api/streamingSession');
        var data = await res.json();

        await fetch(conversionServiceURI + '/api/enableStreamAccess/' + data.sessionid, { method: 'put', headers: { 'items': JSON.stringify([arboleda]) } });

        viewer = new Communicator.WebViewer({
                containerId: "viewer-container",
                endpointUri: 'wss://' + data.serverurl + ":" + data.port + '?token=' + data.sessionid,
                model: "arboleda",
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@2022.2",
                rendererType: 0
        });

        viewer.start();

        return viewer;

}