export const themeSite = {
    dark: 'dracula',
    light: 'garden',
}

export const themeList = ["dracula", "night", "garden", "light"]

interface IToastTypes {
    [key: string]: string
}
export const toastTypes:IToastTypes = {
    success: "btn btn-success",
    error: "btn btn-error",
    info: "btn btn-info",
    warning: "btn btn-warning",
}