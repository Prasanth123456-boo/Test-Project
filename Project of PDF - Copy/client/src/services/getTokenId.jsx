import jwt_decode from "jwt-decode";
export const  getID=async()=>{
    const token =localStorage.getItem("accessToken")
    const decoded = jwt_decode(token);
    
    console.log(decoded);
    return decoded.id;
}
// export const  getIsAdmin=async()=>{
//     const token =localStorage.getItem("accessToken")
//     const decoded = jwt_decode(token);
    
//     return decoded.isAdmin;
// }