export default (str:string) => {

    return str.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "")
}