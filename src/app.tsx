import React from "react";
import Desktop from "./components/desktop/Desktop.component";
import { useDispatch } from "react-redux";
import { OpenWindow } from "./actions/windowsActions";
import files2 from "./models/fileStructure2";

function App() {
    const dispatch = useDispatch();
    dispatch(OpenWindow(files2.find((x) => x.title === "Portfolio")!));
    return <Desktop />;
}

export default App;
