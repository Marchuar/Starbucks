import * as React from "react";

export interface UserProps {
    token?: string,
    mainUserName?: string,
    setToken?: React.Dispatch<React.SetStateAction<string>>,
    setMainUserName?: React.Dispatch<React.SetStateAction<string>>,
    mode?: string,
}