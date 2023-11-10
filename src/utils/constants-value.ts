export const themeSite = {
    dark: 'dracula',
    light: 'garden',
}

export const themeList = ["dracula", "night", "garden", "light"]

interface IToastTypes {
    [key: string]: string
}
export const toastTypes:IToastTypes = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
}