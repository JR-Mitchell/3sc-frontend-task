function toggleSidebar(barname:"drag-bar" | "menu-bar") {
    return {
        type: "SIDEBAR_TOGGLE",
        payload: {
            bar: barname
        }
    }
};

function setSidebarState(barname:"drag-bar" | "menu-bar",value:boolean) {
    return {
        type: "SIDEBAR_SET",
        payload: {
            bar: barname,
            value: value
        }
    }
};

export { toggleSidebar, setSidebarState };
