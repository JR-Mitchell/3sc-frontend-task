//Interface for setting the sidebar state
interface sidebarSetAction {
    type: "SIDEBAR_SET",
    payload: {
        bar: "menu-bar" | "drag-bar",
        value: boolean
    }
}

//Interface for toggling the sidebar state
interface sidebarToggleAction {
    type: "SIDEBAR_TOGGLE",
    payload: {
        bar: "menu-bar" | "drag-bar",
    }
}

//Reducer for the toggle state of the sidebar.
const sidebarReducer = (state: string=" menu-bar-open", action: sidebarSetAction | sidebarToggleAction) => {
    if (action.type !== "SIDEBAR_SET" && action.type !== "SIDEBAR_TOGGLE") {return state;}
    const classModifier = " " + action.payload.bar + "-open";
    const indexOf = state.indexOf(classModifier);
    if (indexOf === -1 && (action.type === "SIDEBAR_TOGGLE" || action.payload.value)) {
        return state + classModifier;
    } else if (indexOf !== -1 && (action.type === "SIDEBAR_TOGGLE" || !action.payload.value)) {
        return state.replace(classModifier,"");
    }
}

type SidebarStateInterface = string;

export default sidebarReducer;
export type { SidebarStateInterface };
