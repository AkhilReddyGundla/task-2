import * as zod from 'zod';

const checkDetails = zod.object({
    email : zod.string().email(),
    password : zod.string().min(5)
})

export default function userDetailsChecker(userDetails){
    const {success} = checkDetails.safeParse(userDetails)
    if(success){
        return 1;
    }else{
        return 0;
    }
}