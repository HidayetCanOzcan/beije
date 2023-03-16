import { hookstate } from "@hookstate/core";

export const globalSettingsState = hookstate(()=>{
    return { 
        homeHeaderBgColor: 'transparent',
        promised:false
    }
})