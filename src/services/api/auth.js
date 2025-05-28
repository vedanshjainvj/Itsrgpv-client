import Instance from "../axios";

export const checkUserProfile  = async(id)=>{
 try {
   const response = await Instance.get(`/user/get-user-by-user-id?userId=${id}`);
   return response;
 } catch (error) {
    throw error;
 }
}

export const createNewStudentAccount  = async(data)=>{
 try {
   const response = await Instance.post(`/user/add-user`,data);
   return response;
 } catch (error) {
    throw error;
 }
}