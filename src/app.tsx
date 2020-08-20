import React, { useState } from "react";
import Desktop from "./components/desktop/Desktop.component";
import { useDispatch, useSelector } from "react-redux";
import { OpenWindow } from "./actions/windowsActions";
import SystemInitializer from "./components/system/windowsLoading.component";
import { RootState } from "./reducers";
import File from "./models/File";

function App() {
    return <SystemInitializer />;
}

export default App;
