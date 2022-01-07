
export const getChatID = (
  primaryUser:string | undefined, 
  secondaryUser:string | undefined
)=>{     
  return ( primaryUser && 
      secondaryUser && 
      (primaryUser < secondaryUser ? 
        primaryUser+'_'+secondaryUser  : 
        secondaryUser+'_'+primaryUser)) 
      || '';   
};