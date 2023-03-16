import { useHookstate } from "@hookstate/core";
import { globalSettingsState } from "./state";

export default function(){
    const state = useHookstate(globalSettingsState)
    return{
        get homeHeaderBgColor(){
            return state.get().homeHeaderBgColor;
        },
        set homeHeaderBgColor(value){
            state.set({homeHeaderBgColor:value})
        },
        get promised(){
            return state.get().promised;
        }
    }
}